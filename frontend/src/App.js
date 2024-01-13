import { useState } from "react";
import './App.css';

function App() {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleFixButtonClick = () => {
    if (audioFile) {
      // Assume you have a server endpoint to handle audio processing
      const serverEndpoint = '/api/process-audio';

      // Create a FormData object to send the audio file to the server
      const formData = new FormData();
      formData.append('audioFile', audioFile);

      // Send a POST request to the server for processing
      fetch(serverEndpoint, {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        // Handle the processed data, you might want to play or download the fixed audio
        console.log('Processing successful:', data);

        // For example, you could download the fixed audio
        downloadFile(data.fixedAudioUrl, 'fixed_audio.mp3');
      })
      .catch(error => {
        console.error('Error processing audio:', error);
      });
    } else {
      alert('Please upload an audio file before fixing.');
    }
  };

  // Helper function to download a file
  const downloadFile = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
    <header className="App-header">
      <h1>QuicKReel Assessment</h1>
      <h4>Made by Akram Khan</h4>
      <img src="https://framerusercontent.com/images/P64KeLPYWqa3hUSC3tAgHKYNnk.png" alt="Logo" />
      
      <div id="Upload-button" className="upload-container">
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        {audioFile && <p>Selected audio file: {audioFile.name}</p>}
      </div>
      
      <button onClick={handleFixButtonClick} className="fix-button">
        Fix Audio
      </button>
    </header>
  </div>
  );
}

export default App;
