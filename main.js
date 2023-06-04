// Zadanie 1. (50pkt ł ˛acznie) Wykorzystuj ˛ac Node.js (i framework Express) oraz wybrany
// system bazodanowy (np. MongoDB) zbuduj prost ˛a aplikacj˛e webow ˛a , która powinna umoz-˙
// liwiac u ´ zytkownikom tworzenie, czytanie, aktualizacj˛e i usuwanie wspólnych notatek prze- ˙
// chowywanych w bazie danych.
// Zbuduj prosty interfejs w architekturze REST, który obsługuje z ˛adania i odpowiedzi HTTP. ˙
// Twoje REST API powinno udost˛epniac przynajmniej poni ´ zej wylistowane endpointy: ˙
// • GET /note - zwraca list˛e wszystkich notatek
// • GET /note/:id - zwraca pojedyncz ˛a notatk˛e według ID
// • POST /note - tworzy now ˛a notatk˛e
// • PUT /note/:id - aktualizuje notatk˛e według ID
// • DELETE /note/:id - usuwa notatk˛e według ID
// Dodatkowo wykorzystaj JSON Web Tokens (JWT), aby ograniczyc dost˛ep do API. Do bu- ´
// dowy responsywnego interfejsu uzytkownika wykorzystaj poznane dot ˛ad technologie. ˙
// Szczegółowy podział punktów:
// • REST API - 25 punktów
// • Tokeny JWT - 15 punktów
// • Responsywny interfejs uzytkownika - 10 punktów 

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})