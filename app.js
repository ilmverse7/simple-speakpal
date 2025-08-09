const phrase = "hello how are you"; // phrase to match (lowercase, no punctuation)
const startBtn = document.getElementById('start-btn');
const resultP = document.getElementById('result');

startBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Speech Recognition not supported in this browser.');
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  resultP.textContent = 'Listening...';

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript.toLowerCase().replace(/[.,!?]/g, '');
    resultP.textContent = `You said: "${spoken}"`;

    if (spoken === phrase) {
      resultP.textContent += ' ✅ Perfect!';
    } else {
      resultP.textContent += ' ❌ Try again.';
    }
  };

  recognition.onerror = (event) => {
    resultP.textContent = 'Error: ' + event.error;
  };
});
