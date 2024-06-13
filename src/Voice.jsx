function Voice({ReadingText}){
    const readOutLoud = (text) => {
        if ('speechSynthesis' in window) {
          if (window.speechSynthesis.speaking) {
            return; // Exit if speech synthesis is already in progress
          }
          const speech = new SpeechSynthesisUtterance(text);
          speech.rate = 0.7; // Adjust the speed (range: 0.1 to 10)
          window.speechSynthesis.speak(speech);
        } else {
          alert('Sorry, your browser does not support text to speech!');
    }
    };
readOutLoud(ReadingText)
}

export default Voice;