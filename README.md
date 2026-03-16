# BrukMeg Appen

<img src="Media/BrukMegLogo.png" width="400">

## Generell informasjon
Dette er en applikasjon som er utviklet under forløpet av bachelor i IT & Informasjonssystemer. 

### Teknologi
- **Backend:** Node.js, Express, PostgreSQL
- **Scraping:** Puppeteer (headless Chrome)
- **Frontend:** React (Vite)

### Funksjonalitet
BrukMeg lar deg søke etter brukte gjenstander på tvers av flere plattformer fra ett sted. 
Søkeresultater hentes direkte fra aktøren og lagres i en lokal database for rask filtrering.

## Kom i gang

### Krav
- Node.js
- PostgreSQL

### Installasjon
```bash
# Installer avhengigheter (Kjøres i terminal fra rotmappe)
cd backend && npm install
cd ../frontend && npm install

# Opprett database i PostgreSQL: "brukmegdb"
# Kjør sql/schema.sql i pgAdmin eller psql

# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm run dev
```

## API-endepunkter (Kun testparametere)
| Endepunkt | Beskrivelse |
|---|---|
| `GET /api/listings/search?q=iphone` | Henter og lagrer annonser fra Finn |
| `GET /api/listings?q=iphone&minPrice=500` | Søk i database med filtre |
| `GET /health` | Sjekk om serveren kjører |

### ⚠️ IMPORTANT NOTICE:

THIS APPLICATION IS STRICTLY MEANT FOR EDUCATIONAL PURPOSES AND SHOULD UNDER NO CIRCUSTANCE BE USED COMMERCIALLY. ⚠️

## Ekstra
Hensikten med BrukMeg Appen er å få en oversikt over, og utføre diverse analyser av volumet av kjøp og salg av klær på tvers av bruktmarkeder i Norge.

BrukMeg Appen er under utvikling, og veien videre (per 03/26) inkluderer:

- Front end UI
- Statistikk for salg og kjøp av klær
- Flere aktører







