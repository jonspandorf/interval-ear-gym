import PitchDetector from "./components/pitchDetector";
import IntervalChallenge from './components/IntervalChallenge'
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ChallengeForm from "./components/challengeForm";

function App() {

  const [prompts, setPrompts] = useState(0);
  const [answers, setAnswers] = useState(null);


  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={ChallengeForm} />
          <Route exact path='/challenge' component={IntervalChallenge} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
