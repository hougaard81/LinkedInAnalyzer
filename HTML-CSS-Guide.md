# LinkedIn Profil Analyzer: HTML og CSS Guide

## Introduktion
I denne guide vil vi gennemgå opbygningen af en simpel webapplikation, der kan analysere LinkedIn profiltekster. Vi fokuserer på HTML og CSS i denne første del, hvor vi lærer om strukturering af websider og styling.

## Forudsætninger
- Grundlæggende kendskab til computere
- En teksteditor (VS Code anbefales)
- Interesse for webudvikling

## HTML Strukturen
Lad os starte med at se på vores HTML fil. HTML er websitets fundament og definerer strukturen af vores applikation.

### Grundlæggende Opbygning
```html
<div class="container">
    <h1>LinkedIn Profile Analyzer</h1>
    
    <!-- Input sektion -->
    <textarea id="profileInput"></textarea>
    <button id="analyzeButton">Analyser Profil</button>
    
    <!-- Resultater -->
    <div id="results" class="results">
        <!-- Tidslinje sektion -->
        <div id="timelineSection" class="section hidden">
            <h2>Din Karriere Tidslinje</h2>
            <div id="timeline" class="timeline"></div>
        </div>

        <!-- Nøgleord sektion -->
        <div id="keywordsSection" class="section hidden">
            <h2>Nøgleord i Din Profil</h2>
            <div id="keywords" class="keywords"></div>
        </div>

        <!-- Forbedringsforslag sektion -->
        <div id="suggestionsSection" class="section hidden">
            <h2>Forbedringsforslag</h2>
            <div id="suggestions" class="suggestions"></div>
        </div>
    </div>
</div>
```

### HTML Elementer Forklaret
1. **Container (`<div class="container">`)**
   - Fungerer som hovedbeholder for hele applikationen
   - Giver bedre kontrol over layout og styling

2. **Input Område**
   - `<textarea>`: Hvor brugeren indsætter deres LinkedIn profiltekst
   - `<button>`: Trigger for analysen

3. **Resultatsektioner**
   - Hver sektion har sin egen container med unik ID
   - Klassen `hidden` bruges til at skjule sektioner indtil der er resultater
   - Semantisk struktur med `<h2>` overskrifter for hver sektion

## CSS Styling
Vores CSS er organiseret i logiske sektioner og bruger moderne teknikker for vedligeholdbar kode.

### CSS Variabler
```css
:root {
    --primary-color: #0a66c2;
    --primary-dark: #004182;
    --text-color: #333;
    --background-light: #f3f2ef;
    --background-white: #fff;
    --border-radius: 8px;
    --shadow: 0 2px 8px rgba(0,0,0,0.1);
    --transition: 0.3s ease;
}
```

Disse variabler gør det nemt at:
- Vedligeholde et konsistent farvetema
- Ændre design elementer centralt
- Genanvende værdier gennem stylingen

### Grundlæggende Styling
```css
body {
    font-family: 'Inter', Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--background-light);
    line-height: 1.5;
    color: var(--text-color);
}

.container {
    background: var(--background-white);
    padding: clamp(20px, 5vw, 40px);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}
```

### Responsivt Design
```css
@media (max-width: 600px) {
    body {
        padding: 1rem;
    }
    
    .container {
        padding: 1rem;
    }
    
    .keywords {
        gap: 0.5rem;
    }
    
    .keyword {
        font-size: 0.75rem;
        padding: 0.375rem 0.75rem;
    }
}
```

### Særlige Styling Elementer

#### Timeline Styling
```css
.timeline {
    margin: 2rem 0;
    padding: 1.5rem;
    border-left: 2px solid var(--primary-color);
}

.timeline-item {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
    position: relative;
}

.timeline-item::before {
    content: '';
    width: 12px;
    height: 12px;
    background: var(--primary-color);
    border-radius: 50%;
    position: absolute;
    left: -7px;
    top: 5px;
}
```

#### Nøgleord Styling
```css
.keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 1.5rem 0;
}

.keyword {
    background: #e1ecf4;
    color: var(--primary-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
}
```

## Vigtige CSS Koncepter at Forstå

### 1. Box Model
- `box-sizing: border-box`: Sikrer konsistent størrelse på elementer
- Margin og padding bruges til spacing
- Border-radius for afrundede hjørner

### 2. Flexbox
- Bruges til layout af nøgleord
- Giver responsivt design
- Nem håndtering af mellemrum mellem elementer

### 3. Positionering
- Relativ og absolut positionering i timeline
- Hvordan man skaber visuelle elementer med pseudo-elementer

### 4. Transitions
- Smooth overgange for bedre brugeroplevelse
- Hover effekter
- Animation af UI elementer

## Bedste Praksis
1. **Organisering**
   - Gruppér relateret CSS
   - Brug beskrivende klassenavne
   - Hold stilen konsistent

2. **Vedligeholdelse**
   - Brug CSS variabler
   - Implementér responsive design
   - Kommentér kompleks CSS

3. **Performance**
   - Undgå overspecificerede selektorer
   - Gruppér media queries
   - Optimer transitions

## Næste Skridt
I næste del af guiden vil vi dykke ned i JavaScript-koden, hvor vi ser på:
- DOM manipulation
- Event handling
- Data processering
- Dynamisk opdatering af UI

Dette vil give dig en komplet forståelse af hvordan applikationen fungerer.