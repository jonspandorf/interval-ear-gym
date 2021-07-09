import { useEffect, useState } from "react"
import PitchDetector from '../components/pitchDetector'
import { Notation } from 'react-abc';
import { Interval } from '@tonaljs/tonal'





const IntervalChallenge = () => {

    const [direction, setDirection] = useState('');
    const [interval, setInterval] = useState('');
    const [givenPitch, setGivenPitch] = useState('A4');
    const [firstInt, setFirstInt] = useState(false);
    const [notation, setNotation] = useState(`X:1\nM:C\nL:1/4\n${givenPitch}|\n`)
    const [isCorrect, setIsCorrect] = useState(null);
    const [target, setTarget] = useState('');
    const [pitchToCompare, setPitchToCompare] = useState('');
    const [challengeFinished, setChallengeFinished] = useState(false);

    const setNewTargetPitch = (pitch) => {
      if (pitch === target) setGivenPitch(pitch);
      else console.log('mistake, try again!', pitch, target)
    }

    const intervals = [
        'm2', 'M2', 'm3', 'M3', 'P4', 'A4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7'
    ]

    const directions = ['up', 'down']


    const assignInterval = () => {

        const randomIntervalNumber = Math.floor(Math.random() * 12)
        const randomDirection = Math.floor(Math.random() * 2)

        setInterval(intervals[randomIntervalNumber]);
        setDirection(directions[randomDirection]);
    }

    function identifyInt (userPitch) {

        if (Interval.distance(pitchToCompare, userPitch) === interval) {
            console.log(pitchToCompare, userPitch)
           console.log('correct')
           if (target === userPitch) setChallengeFinished(true)
        }

      }

    return(
        <>
        <div>
            <h3>Sing the following pitch: </h3>
            <div>{direction} {interval}</div>
        </div>
        <button onClick={assignInterval}>Assign new interval</button>
        <Notation 
            notation={notation}
        />
            <PitchDetector challengeFinished={challengeFinished} pitchToCompare={pitchToCompare} identifyInt={identifyInt}/>
        </>
    )
}

export default IntervalChallenge