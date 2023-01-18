// inside script.js
// all of our quotes
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
  'Everything a man says before "but" is horseshit.',
  '"What if I fail?" but darling, what if you fly?',
  'I am a one woman man - one woman at a time.',
  'If you never try, you\'ll never know',
  'Talk is cheap, show me the code!',
  'My mind shine even when my thoughts seem dark. Pistol on my side you don\'t wanna hear that thang talk.',
  'If there is a god, they would have to beg my forgiveness.',
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const typingSpeed = (time, length) => Math.round(length / time);
const typingActions = () => {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;
  
  if(currentWord === typedValue && wordIndex === words.length - 1) {
    const time_in_minutes = (new Date().getTime() - startTime) / 60000;
    const message = `You've successfully finished typing this quote, welldone! Your typing speed was ${typingSpeed(time_in_minutes, words.length)} wpm.`;
    typedValueElement.removeEventListener('input', typingActions);
    const textBoxContent = document.getElementById('typed-value');
    textBoxContent.disabled = true;
    textBoxContent.value = '';
    alert(message);
  } else if(typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    typedValueElement.value = '';
    wordIndex++;
    for(let wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    };
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if(currentWord.startsWith(typedValue)) {
    typedValueElement.className = '';
  } else {
    typedValueElement.className = 'error';
  }
}

document.getElementById('start').addEventListener('click', () => {
  document.getElementById('typed-value').addEventListener('input', typingActions);
  wordIndex = 0; //Restart the index everytime the start button is clicked
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  words = quote.split(' ');
  const spanWords = words.map((word) => `<span>${word+' '}</span>`);
  quoteElement.innerHTML = spanWords.join('');
  quoteElement.childNodes[0].className = 'highlight';
  messageElement.innerText = '';
  typedValueElement.value = '';
  typedValueElement.focus();
  
  startTime = new Date().getTime();
});