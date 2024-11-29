# LinkedIn Profil Analyzer: JavaScript Guide

## Introduktion
I denne anden del af guiden ser vi på JavaScript-implementeringen af vores LinkedIn Profil Analyzer. Vi gennemgår hvordan vi håndterer brugerinteraktion, behandler data og opdaterer brugergrænsefladen dynamisk.

## JavaScript Grundstruktur

### DOM Elements
```javascript
const profileInput = document.getElementById('profileInput');
const analyzeButton = document.getElementById('analyzeButton');
const timelineSection = document.getElementById('timelineSection');
const keywordsSection = document.getElementById('keywordsSection');
const suggestionsSection = document.getElementById('suggestionsSection');
```

Disse konstanter giver os nemme referencer til vores HTML elementer, hvilket er mere effektivt end at søge efter dem hver gang.

### Event Listeners
```javascript
analyzeButton.addEventListener('click', analyzeProfile);
```

Dette er vores hovedtrigger for applikationen. Når brugeren klikker på knappen, starter analyseprocessen.

## Hovedfunktioner

### 1. Analyse Funktionen
```javascript
function analyzeProfile() {
    const profileText = profileInput.value;
    if (!profileText) {
        alert('Indtast venligst din profiltekst først');
        return;
    }

    const experiences = extractExperiences(profileText);
    const keywords = analyzeKeywords(profileText);
    const suggestions = generateSuggestions(profileText, keywords);

    displayResults(experiences, keywords, suggestions);
}
```

Denne funktion:
- Tjekker om der er input
- Kalder tre separate analysefunktioner
- Viser resultaterne

### 2. Erfaring Udtrækning
```javascript
function extractExperiences(text) {
    const lines = text.split('\n');
    const experiences = [];
    let currentExperience = {};
    
    const datePattern = /\d{4}[^a-zA-Z]*(\d{4}|Present|Nu)/i;
    
    for (const line of lines) {
        if (datePattern.test(line)) {
            if (currentExperience.period) {
                experiences.push(currentExperience);
            }
            currentExperience = {
                period: line.trim(),
                title: ''
            };
        } else if (currentExperience.period && !currentExperience.title) {
            currentExperience.title = line.trim();
        }
    }
    
    if (currentExperience.period) {
        experiences.push(currentExperience);
    }
    
    return experiences;
}
```

Nøglekoncepter:
- Regulære udtryk (RegEx) for at finde datoer
- Array manipulation
- Objekt struktur for erfaringer

### 3. Nøgleord Analyse
```javascript
function analyzeKeywords(text) {
    const stopWords = [
        'og', 'i', 'jeg', 'det', 'at', 'en', 'den', 'til', 'er', 'som',
        // ... flere stopord
    ];

    const words = text.toLowerCase().split(/\W+/);
    const wordCounts = {};

    for (const word of words) {
        if (word && !stopWords.includes(word)) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    }

    return Object.keys(wordCounts)
        .map(word => ({ word, count: wordCounts[word] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);
}
```

Vigtige koncepter:
- Stopord filtrering
- Ordoptælling
- Array sortering og mapping
- Objektmanipulation

### 4. Generering af Forslag
```javascript
function generateSuggestions(text, keywords) {
    const suggestions = [];
    const textLower = text.toLowerCase();

    // Forskellige checks
    if (text.split(' ').length < 100) {
        suggestions.push('Din profil kunne være mere detaljeret...');
    }

    // Flere checks for forskellige aspekter
    const achievementKeywords = ['præstation', 'resultat', 'opnået', 'succes'];
    if (!achievementKeywords.some(word => textLower.includes(word))) {
        suggestions.push('Tilføj konkrete resultater...');
    }

    return suggestions;
}
```

### 5. Visning af Resultater
```javascript
function displayResults(experiences, keywords, suggestions) {
    // Timeline HTML generering
    const timelineHtml = experiences.map(exp => `
        <div class="timeline-item">
            <div class="period">${exp.period}</div>
            <div class="title">${exp.title}</div>
        </div>
    `).join('');
    
    document.getElementById('timeline').innerHTML = timelineHtml;
    timelineSection.classList.remove('hidden');
    
    // Tilsvarende for keywords og suggestions...
}
```

## Avancerede JavaScript Koncepter

### 1. Template Literals
```javascript
const html = `
    <div class="item">
        ${dynamicContent}
    </div>
`;
```
- Gør det nemmere at skabe HTML strings
- Tillader embedding af variabler
- Mere læsbar kode

### 2. Array Metoder
```javascript
const filtered = array.filter(item => condition);
const mapped = array.map(item => transform(item));
const sorted = array.sort((a, b) => comparison);
```
- Funktionel programmering
- Kædning af operationer
- Læsbar datahåndtering

### 3. Objekt Manipulation
```javascript
const { property } = object; // Destructuring
const newObj = { ...oldObj, newProp: value }; // Spread
```

### 4. Error Handling
```javascript
try {
    // Risikabel operation
} catch (error) {
    console.error('Fejl:', error);
    // Håndter fejlen
}
```

## Bedste Praksis

### 1. Kodeorganisering
- Opdel koden i logiske funktioner
- Hold funktioner små og fokuserede
- Brug beskrivende navne

### 2. Performance
- Undgå unødvendige DOM operationer
- Cache DOM referencer
- Brug effektive algoritmer

### 3. Vedligeholdelse
- Kommenter kompleks logik
- Brug konstanter for magiske værdier
- Hold koden DRY (Don't Repeat Yourself)

## Udvidelsesmuligheder
1. **Data Persistence**
   - Gem analyser i localStorage
   - Eksporter resultater

2. **Avanceret Analyse**
   - Sentiment analyse
   - Mere detaljeret keyword analyse
   - Branchespecifikke anbefalinger

3. **UI Forbedringer**
   - Animation af resultater
   - Interaktiv tidslinje
   - Filtreringsmuligheder

## Konklusion
Dette projekt demonstrerer mange vigtige JavaScript koncepter:
- DOM manipulation
- Event handling
- String processing
- Array og objekt manipulation
- Dynamisk HTML generering

Ved at forstå disse koncepter har du et solidt fundament for at bygge dine egne webapplikationer.