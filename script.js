const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// loading

function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// complete
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show new quote
function newQuote(){
    loading();
    // Pick a random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author name is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else {
        authorText.textContent = quote.author;
    }
    // Check quote length to adjust styling
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
    complete();
}

// Get quote form API
async function  getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

        // if(data.quoteAuthor === '') {
        //     authorText.innerText = 'Unknown';
        // } else {
        //      authorText.innerText = data.quoteAuthor;
        // }

        // if (data.quoteText.length > 120) {
        //     quoteText.classList.add('long-text');
        // } else {
        //     quoteText.classList.remove('long-text');
        // }
        // quoteText.innerText = data.quoteText;
        // // stop loader,show quote
        // complete();
    }catch(error) {
    
    }

    // Tweet quote
    function tweetQuote () {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl, '_blank');
    }

    // // Event Listener
    newQuoteBtn.addEventListener('click', newQuote);
    twitterBtn.addEventListener('click', tweetQuote);

}

// OnLoad
getQuote();
