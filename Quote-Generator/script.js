'use strict';

const quoteContainer = document.querySelector('#quote-container');
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const btn = document.querySelector('#new-quote');
const twitterBtn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');

const URL = 'https://api.quotable.io/random';

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function completed() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function setContent(data) {
  quote.innerHTML = data.content;
  author.innerHTML = data.author;
}

async function getQuote() {
  loading();
  try {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
    setContent(data);
    completed();
  } catch (err) {
    console.log('ERROR!!!', err);
  }
}

// on load
getQuote();

// on button Click
btn.addEventListener('click', getQuote);

// twitter button
function tweetQuote() {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(tweetURL, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
