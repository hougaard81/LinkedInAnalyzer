// DOM Elements
const profileInput = document.getElementById('profileInput');
const analyzeButton = document.getElementById('analyzeButton');
const timelineSection = document.getElementById('timelineSection');
const keywordsSection = document.getElementById('keywordsSection');
const suggestionsSection = document.getElementById('suggestionsSection');

// Event Listeners
analyzeButton.addEventListener('click', analyzeProfile);

// Main Analysis Function
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

// Experience Extraction
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

// Keyword Analysis
function analyzeKeywords(text) {
    // Danish stop words
    const stopWords = [
        'og', 'i', 'jeg', 'det', 'at', 'en', 'den', 'til', 'er', 'som',
        'på', 'de', 'med', 'han', 'af', 'for', 'ikke', 'der', 'var',
        'mig', 'sig', 'men', 'et', 'har', 'om', 'vi', 'min', 'havde',
        'ham', 'hun', 'nu', 'over', 'da', 'fra', 'du', 'ud', 'sin',
        'dem', 'os', 'op', 'man', 'hans', 'hvor', 'eller', 'hvad',
        'skal', 'selv', 'her', 'alle', 'vil', 'blev', 'kunne', 'ind',
        'når', 'være', 'dog', 'noget', 'ville', 'jo', 'deres', 'efter',
        'ned', 'skulle', 'denne', 'end', 'dette', 'mit', 'også', 'under',
        'have', 'dig', 'anden', 'hende', 'mine', 'alt', 'meget', 'sit',
        'sine', 'vor', 'mod', 'disse', 'hvis', 'din', 'nogle', 'hos',
        'blive', 'mange', 'ad', 'bliver', 'hendes', 'været', 'thi', 'jer',
        'sådan'
    ];

    const words = text.toLowerCase().split(/\W+/);
    const wordCounts = {};

    for (const word of words) {
        if (word && !stopWords.includes(word)) {
            wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
    }

    const keywords = Object.keys(wordCounts)
        .map(word => ({ word, count: wordCounts[word] }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20); // Get top 20 keywords

    return keywords;
}

// Generate Suggestions
function generateSuggestions(text, keywords) {
    const suggestions = [];
    const textLower = text.toLowerCase();

    // Check profile length
    if (text.split(' ').length < 100) {
        suggestions.push('Din profil kunne være mere detaljeret. Prøv at uddybe dine erfaringer.');
    }

    // Check for links
    if (!text.includes('http')) {
        suggestions.push('Overvej at tilføje links til dine projekter, portfolio eller relevante medier.');
    }

    // Check for achievements
    const achievementKeywords = ['præstation', 'resultat', 'opnået', 'succes', 'bedrift'];
    if (!achievementKeywords.some(word => textLower.includes(word))) {
        suggestions.push('Tilføj konkrete resultater og bedrifter fra dine tidligere roller.');
    }

    // Check keyword diversity
    if (keywords.length < 5) {
        suggestions.push('Prøv at inkludere flere relevante nøgleord i din profil.');
    }

    // Check for education
    const educationKeywords = ['uddannelse', 'universitet', 'bachelor', 'kandidat', 'eksamen', 'skole'];
    if (!educationKeywords.some(word => textLower.includes(word))) {
        suggestions.push('Overvej at tilføje information om din uddannelsesmæssige baggrund.');
    }

    return suggestions;
}

// Display Results
function displayResults(experiences, keywords, suggestions) {
    // Display Timeline
    const timelineHtml = experiences.map(exp => `
        <div class="timeline-item">
            <div class="period">${exp.period}</div>
            <div class="title">${exp.title}</div>
        </div>
    `).join('');
    
    document.getElementById('timeline').innerHTML = timelineHtml;
    timelineSection.classList.remove('hidden');
    
    // Display Keywords
    const keywordsHtml = keywords.map(kw => 
        `<span class="keyword">${kw.word} (${kw.count})</span>`
    ).join('');
    
    document.getElementById('keywords').innerHTML = keywordsHtml;
    keywordsSection.classList.remove('hidden');
    
    // Display Suggestions
    const suggestionsHtml = `
        <ul>
            ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
    `;
    
    document.getElementById('suggestions').innerHTML = suggestionsHtml;
    suggestionsSection.classList.remove('hidden');
}
