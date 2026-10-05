// Genera i sorgenti JSON del compendio italiano a partire da quelli del compendio inglese.
// Uso: node tools/translate-it/build.mjs <cartella JSON del compendio inglese> [cartella di uscita]
// La cartella di uscita predefinita è src/packs/investigator-wizard-it nella radice del repository.
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import * as D from './dict.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const [srcArg, outArg] = process.argv.slice(2)
if (!srcArg) {
  console.error('Uso: node tools/translate-it/build.mjs <cartella JSON del compendio inglese> [cartella di uscita]')
  process.exit(2)
}
const src = path.resolve(srcArg)
const out = outArg ? path.resolve(outArg) : path.join(root, 'src/packs/investigator-wizard-it')
if (!fs.existsSync(src) || !fs.statSync(src).isDirectory()) {
  console.error('Cartella del compendio inglese non trovata: ' + src)
  process.exit(2)
}

const missing = new Set()
const tr = (map, k, label) => {
  if (!Object.hasOwn(map, k)) { missing.add(label + ': ' + k); return undefined }
  return map[k]
}
const ALNUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const newId = id => [...crypto.createHash('sha256').update(id + ':it').digest()].slice(0, 16).map(b => ALNUM[b % 62]).join('')

const docs = []
for (const f of fs.readdirSync(src).filter(f => f.endsWith('.json')).sort()) {
  const d = JSON.parse(fs.readFileSync(path.join(src, f), 'utf8'))
  const s = d.system
  const orig = d.name
  if (d.type === 'skill') {
    const sp = s.specialization ? tr(D.spec, s.specialization, 'spec') : ''
    const nm = s.skillName === 'Any' ? 'Generico' : tr(D.skill, s.specialization + '|' + s.skillName, 'skill')
    if (sp === undefined || nm === undefined) continue
    s.specialization = sp
    s.skillName = nm
    d.name = sp ? `${sp} (${nm})` : nm
  } else if (d.type === 'setup') {
    const t = tr(D.setup, orig, 'setup')
    if (t === undefined) continue
    d.name = t[0]
  } else if (['occupation', 'archetype'].includes(d.type)) {
    const t = tr(D[d.type], orig, d.type)
    if (t === undefined) continue
    d.name = t
  } else {
    missing.add('tipo sconosciuto: ' + d.type + ' (' + orig + ')')
    continue
  }
  if (s.description?.value) s.description.value = D.description(s.description.value, d.type, orig)
  if (s.personalText) s.personalText = tr(D.personalText, s.personalText, 'personalText') ?? s.personalText
  for (const v of s.monetary?.values || []) {
    if (v.name && !v.name.startsWith('CoC7.')) v.name = tr(D.monetaryName, v.name, 'monetary') ?? v.name
  }
  if (/See the|Default setup/.test(s.description?.value || '')) missing.add('descrizione: ' + orig)
  d.flags.CoC7.cocidFlag.lang = 'it'
  d._id = newId(d._id)
  d._key = '!items!' + d._id
  docs.push(d)
}

if (missing.size) {
  console.error('Traduzioni mancanti, nessun file scritto:\n' + [...missing].join('\n'))
  process.exit(1)
}

// Scrive in una cartella temporanea e la sostituisce solo a lavoro finito.
const tmp = out + '.tmp'
fs.rmSync(tmp, { recursive: true, force: true })
fs.mkdirSync(tmp, { recursive: true })
for (const d of docs) {
  const file = `${d.name.normalize('NFD').replace(/[^A-Za-z0-9]+/g, '_')}_${d._id}.json`
  fs.writeFileSync(path.join(tmp, file), JSON.stringify(d, null, 2) + '\n')
}
fs.rmSync(out, { recursive: true, force: true })
fs.renameSync(tmp, out)
console.log(`${docs.length} voci scritte in ${path.relative(process.cwd(), out) || '.'}`)
