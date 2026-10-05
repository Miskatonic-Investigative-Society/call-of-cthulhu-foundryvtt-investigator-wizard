<h1 align="center">Procedura guidata dell'investigatore per Il Richiamo di Cthulhu 7ª edizione su Foundry VTT</h1>
<p align="center">
  <a href="#utilizzo">Utilizzo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#segnalazioni">Segnalazioni</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licenze">Licenze</a>
</p>

[English](README.md) | Italiano

## Panoramica

Questo pacchetto di contenuti fornisce archetipi, professioni, configurazioni e abilità di base. Con questi materiali già pronti, la procedura guidata di creazione dell'investigatore si completa in pochi passaggi. Funziona con l'[implementazione di Call of Cthulhu 7ª edizione per Foundry Virtual Tabletop](https://github.com/Miskatonic-Investigative-Society/CoC7-FoundryVTT).

Per suggerimenti e commenti ci trovate sul canale `#chaosium` del [server Discord di Foundry](https://discord.gg/foundryvtt).

L'elenco delle modifiche è nel [CHANGELOG](https://github.com/Miskatonic-Investigative-Society/call-of-cthulhu-foundryvtt-investigator-wizard/blob/develop/.github/CHANGELOG.md).

## Utilizzo

Installate il sistema CoC7 in Foundry VTT dalla scheda *Game Systems* (Sistemi di gioco) con questo manifest:
`https://github.com/Miskatonic-Investigative-Society/CoC7-FoundryVTT/releases/latest/download/system.json`

Installate poi il modulo dalla scheda *Add-on Modules* (Moduli aggiuntivi) con questo manifest:
`https://github.com/digennarot/call-of-cthulhu-foundryvtt-investigator-wizard/releases/latest/download/module.json`

È la versione con il compendio in italiano. Ha lo stesso identificativo del modulo originale e, se quello è già installato, lo sostituisce.

Aprite il vostro mondo, andate in *Game Settings* (Impostazioni di gioco) e scegliete *Manage Modules* (Gestisci moduli). Spuntate «Call of Cthulhu - FoundryVTT - Investigator Wizard» e salvate con *Save Module Settings*.

### Compendio in italiano

Il modulo include anche il compendio *Investigator Wizard (Italiano)*, con abilità, professioni, archetipi e configurazioni tradotti. Se Foundry è impostato in italiano, la procedura guidata usa queste voci; per quelle che mancano, per esempio gli oggetti aggiunti da altri moduli, ripiega sull'inglese.

I nomi delle abilità sono gli stessi del compendio Abilità di [call-of-cthulhu-7th-babele-it](https://github.com/digennarot/call-of-cthulhu-7th-babele-it), così una stessa abilità ha un solo nome in tutti e due i moduli. *Combattere*, *Armi da Fuoco* e *Generico* coincidono anche con le traduzioni del sistema CoC7, che riconosce le specializzazioni confrontando il testo. C'è un'eccezione: il file di lingua di *babele-it* chiama «Combattimento» la specializzazione di combattimento, e finché resta così, con quel modulo attivo, il confronto su *Combattere* non riesce. Le abilità che *babele-it* non ha, e i nomi di professioni e archetipi, non sono stati confrontati con i manuali italiani. I rimandi alle pagine restano quelli dei manuali in inglese.

Per correggere una traduzione:

1. scaricate lo `module.zip` della release originale indicata in `package.json` (`upstream.version`) ed estraetelo;
2. convertite il compendio inglese in JSON: `npm run extract -- <cartella estratta>/packs/investigator-wizard build/en-json`;
3. modificate `tools/translate-it/dict.mjs`;
4. rigenerate i sorgenti italiani: `npm run translate -- build/en-json`;
5. fate commit del dizionario insieme a `src/packs/investigator-wizard-it`.

Il compendio compilato non sta nel repository: lo produce la build su GitHub Actions a ogni push, e sul ramo `docs/readme-it` pubblica anche la release della versione indicata in `module.json`. La build si ferma se i sorgenti JSON non corrispondono al dizionario. Per provare il compendio in locale, `npm run pack` lo compila in `packs/investigator-wizard-it`.

## Segnalazioni

Se il modulo non funziona come dovrebbe, aprite una segnalazione qui: https://github.com/Miskatonic-Investigative-Society/call-of-cthulhu-foundryvtt-investigator-wizard/issues

## Licenze

Il supporto a Foundry VTT ricade sotto il [Limited License Agreement for Module Development](https://foundryvtt.com/article/license/).

Il progetto usa alcune risorse grafiche di Game Icons: grazie ai suoi [autori](https://game-icons.net/about.html#authors).

Questo sistema usa marchi e diritti d'autore di proprietà di Chaosium Inc/Moon Design Publications LLC, concessi secondo la [Fan Material Policy di Chaosium Inc](https://www.chaosium.com/fan-material-policy/). Ci è espressamente vietato chiedervi un compenso per l'uso o l'accesso a questi contenuti. Chaosium Inc non pubblica, non sostiene e non approva in modo specifico questo sistema. Per informazioni sui prodotti di Chaosium Inc visitate www.chaosium.com.

Le note di licenza che seguono restano in inglese: fa fede il testo originale.

> Permission is given for users to make derivative use of the work on the Foundry VTT platform. No rights for any commercial use are granted. No part of this work may be reproduced or distributed for use outside of the Foundry VTT platform. All rights are reserved with Chaosium Inc.
>
> Call of Cthulhu (tm) Chaosium, Inc. Used with permission. All rights reserved.
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
