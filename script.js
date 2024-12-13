const words = {
    "dayroom": {
        definition: "A room seperated for study sessions during weekdays, movie sessions during weekends and dance practice center during cultural nights",
        example: "Today we have prep time at 4PM in dayroom",
        likes: 23
    },
    "chicken day": {
        definition: "Day of the week where the supper is chicken curry with rice",
        example: "Rameshwar ate 5kg rice on chicken day",
        likes: 19
    },
    "black gate": {
        definition: "Illegal pathway to smuggle food inside school permises",
        example: "The store in front of black gate did monthly business in millions",
        likes: 32
    },
    "sudip momo": {
        definition: "Momo one eats during their broke days",
        example: "Last week sudip's momo had buffalo teeth in it",
        likes: 67
    },
    "raju momo": {
        definition: "Momo one eats during their rich days",
        example: "Raju momo is the goated momo in Naranthan",
        likes: 98
    },
    "first court": {
        definition: "First pitch of the iconic garden pitch trilogy, the best pitch to play on",
        example: "First court is the Santiago Bernabeau of garden pitches",
        likes: 47
    },
    "second court": {
        definition: "Second pitch of the iconic garden pitch trilogy, worst pitch to play on",
        example: "HRT sir threw a banana from his flat window and it landed at second court",
        likes: 82
    }
    ,
    "third court": {
        definition: "Third pitch of the iconic garden pitch trilogy, stadium abusively filled with dhobi clothes left for drying ",
        example: "We should steal some raddish form the fields next to the third court",
        likes: 32
    }
    ,
    "black tank": {
        definition: "A tap outside dining hall with mysteriously 24/7 water supply",
        example: "Avanish saw a ghost outside black tank yesterday",
        likes: 29
    }
    
};

const searchInput = document.getElementById('search');
const suggestions = document.getElementById('suggestions');
const wordDefinition = document.getElementById('word-definition');
const highlightedWords = document.getElementById('highlighted-words');

// Display three random words as highlights
function showHighlights() {
    const wordsArray = Object.keys(words);
    const shuffledWords = shuffleArray(wordsArray); // Shuffle the words
    const selectedWords = shuffledWords.slice(0, 3); // Select the first three words

    highlightedWords.innerHTML = '';
    selectedWords.forEach(word => {
        const wordContainer = document.createElement('div');
        wordContainer.classList.add('highlight');
        wordContainer.innerHTML = `
            <h3>${word}</h3>
            <p><strong>Definition:</strong> ${words[word].definition}</p>
            <p><strong>Example:</strong> ${words[word].example}</p>
            <button class="like-btn" onclick="incrementLikes('${word}')">Like (<span id="likes-${word}">${words[word].likes}</span>)</button>
        `;
        highlightedWords.appendChild(wordContainer);
    });
}

// Shuffle array function to randomize the order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Increment likes for a word
function incrementLikes(word) {
    words[word].likes++;
    document.getElementById(`likes-${word}`).textContent = words[word].likes;
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestions.innerHTML = '';

    if (query) {
        const matches = Object.keys(words).filter(word => word.startsWith(query));

        if (matches.length === 0) {
            wordDefinition.innerHTML = `<p>Your word was not found. Please try another word.</p>`;
        }

        matches.forEach(match => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = match;
            suggestionItem.addEventListener('click', () => {
                displayDefinition(match);
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(suggestionItem);
        });
    } else {
        wordDefinition.innerHTML = '<p>Start typing to search for a word.</p>';
    }
});

function displayDefinition(word) {
    wordDefinition.innerHTML = `
        <div class="definition-card">
            <h2 class="word-title">${word}</h2>
            <p><strong>Definition:</strong> ${words[word].definition}</p>
            <p><strong>Example:</strong> ${words[word].example}</p>
        </div>
    `;
}
// Scroll-to-Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.classList.add('scroll-top');
scrollTopBtn.innerHTML = '↑';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize the highlights on page load
showHighlights();
