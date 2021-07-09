import { useEffect, useState } from "react"
import * as ml5 from 'ml5';
import { Interval, Midi } from '@tonaljs/tonal'
import { freq } from "@tonaljs/note";


const PitchDetector = ({ identifyInt, pitchToCompare, challengeFinished }) => {

    // const [audioContext, setAudioContext] = useState(new AudioContext())
    let audioContext;
    let newStream;
    let mic;
    let pitch;
    const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
    const [note, setNote] = useState(0)
    const [noteName, setNoteName] = useState('');
    const [listening, setListening] = useState(false)
    // const [stream, setStream] = useState(null)
    let stream

    const setup = async () => {
        audioContext  = new AudioContext();
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        // setStream(newStream)
        startPitch(audioContext, stream)
    }   

    const handleClick = async () => {
        setListening(true)
         await setup()
    }
    

    const startPitch =  (audioContext, stream) => {
        pitch =  ml5.pitchDetection(
            model_url, 
            audioContext, 
            stream, 
            modelLoaded);
    }

    const modelLoaded = () => {
        console.log('model loaded')

        pitch.getPitch(gotPitch)
    }

    const handleStop = () => {
        stream.getTracks().forEach((track) => {
            console.log(track)
        })
    }

    function gotPitch(error, frequency) {
        // if (challengeFinished) {
        //     stream.getTracks().forEach((track) => {
        //         track.stop();
        //     })
        // }

          if (frequency) {
              console.log(Math.floor(frequency + 35))
              const currentNote = Midi.midiToNoteName(frequency + 20)
              console.log(currentNote)
              identifyInt(currentNote);
              setNoteName(currentNote)
          } 
          pitch.getPitch(gotPitch)

      }


    return (
        <>
        {/* <button onClick={startPitch}>Detect pitch</button> */}
        <div>The note is {noteName}</div>
        <button onClick={handleClick}>Detect</button>
        <button onClick={handleStop}>Stop</button>
        </>
    )
}

export default PitchDetector