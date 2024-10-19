import { useState } from "react";
import "./App.css";

function App() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth] = useState(window.speechSynthesis);
  const [responseText, setResponseText] = useState("");

  const speakText = (text) => {
    if (synth.speaking) {
      // If already speaking, stop the speech
      synth.cancel();
      setIsSpeaking(false);
    } else {
      // If not speaking, start the speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      synth.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const fetchTextFromBackend = async () => {
    try {
      const response = await fetch("http://localhost:5000/getText");
      const data = await response.json();
      setResponseText(data.text);
    } catch (error) {
      console.error("Error fetching the text:", error);
    }
  };

  return (
    <>
      <div>
        <textarea
          value={responseText}
          readOnly
          rows="10"
          cols="50"
          placeholder="Backend response will appear here"
        />
        <br />
        <button onClick={fetchTextFromBackend}>Get Text from Backend</button>
        <br />
        <button onClick={() => speakText(responseText)}>
          {isSpeaking ? "Stop Speech" : "Play Speech"}
        </button>
      </div>
    </>
  );
}

export default App;
