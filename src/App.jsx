import PitchDetector from "./components/pitchDetector";
import IntervalChallenge from './components/IntervalChallenge'
import { useEffect, useState } from "react";

function App() {

  const [prompts, setPrompts] = useState(0);
  const [answers, setAnswers] = useState(null);


  return (
    <div>
      <IntervalChallenge/>
    </div>
  );
}

export default App;
