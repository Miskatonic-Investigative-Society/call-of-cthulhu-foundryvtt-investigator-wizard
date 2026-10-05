// Uso:
//   node tools/packs.mjs extract <cartella LevelDB> <cartella JSON>   estrae un compendio in JSON
//   node tools/packs.mjs compile [cartella JSON] [cartella LevelDB]   compila il compendio italiano
// Senza argomenti, compile legge src/packs/investigator-wizard-it e scrive packs/investigator-wizard-it.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { compilePack, extractPack } from '@foundryvtt/foundryvtt-cli'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [cmd, a, b] = process.argv.slice(2)

if (cmd === 'extract' && a && b) {
  fs.rmSync(b, { recursive: true, force: true })
  await extractPack(path.resolve(a), path.resolve(b), { log: false })
  console.log(`${fs.readdirSync(b).length} voci estratte in ${b}`)
} else if (cmd === 'compile') {
  const src = a ? path.resolve(a) : path.join(root, 'src/packs/investigator-wizard-it')
  const dest = b ? path.resolve(b) : path.join(root, 'packs/investigator-wizard-it')
  fs.rmSync(dest, { recursive: true, force: true })
  await compilePack(src, dest, { log: false })
  // Il lock e il log di LevelDB non servono nel compendio distribuito.
  for (const f of fs.readdirSync(dest)) if (f === 'LOCK' || f.startsWith('LOG')) fs.rmSync(path.join(dest, f))
  console.log(`${fs.readdirSync(src).length} voci compilate in ${dest}`)
} else {
  console.error('Uso: node tools/packs.mjs extract <LevelDB> <JSON> | compile [JSON] [LevelDB]')
  process.exit(2)
}
