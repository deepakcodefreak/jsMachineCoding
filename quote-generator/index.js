
let quotes = [];

function renderNewQuote({text,author}){
    if(!author){
        document.getElementById('author').innerText = 'Unknown';
    }
    document.getElementById('author').innerText = author;
    document.getElementById('quote').innerText = text;
}

function getNewQuote(){
    return quotes[Math.floor(Math.random() * quotes.length)]
}

async function getQuotes(){
    loading()
    try {
        const res = await fetch('https://jacintodesign.github.io/quotes-api/data/quotes.json');
        quotes = await res.json();
        completeLoading();
        renderNewQuote(getNewQuote())
    } catch (error) {
        completeLoading();
    }
}

function tweetQuote(){
    const text = document.getElementById('quote').innerText
    const twitterURL = `https://twitter.com/intent/tweet?text=${text}`
    window.open(twitterURL,'_blank')
}

function loading(){
    document.getElementById('loader').hidden = false;
    document.getElementById('quote-container').hidden = true;
}

function completeLoading(){
    document.getElementById('loader').hidden = true;
    document.getElementById('quote-container').hidden = false;
}


getQuotes();

document.getElementById('twitter-btn').addEventListener('click',()=>{
    tweetQuote()
})

document.getElementById('new-quote').addEventListener('click',()=>{
    const quote = getNewQuote();
    renderNewQuote(quote)
})