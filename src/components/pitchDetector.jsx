import { useEffect, useState } from "react"
import * as ml5 from 'ml5';
import { Interval, Midi } from '@tonaljs/tonal'
import { freq } from "@tonaljs/note";


const PitchDetector = ({ identifyInt }) => {

    // const [audioContext, setAudioContext] = useState(new AudioContext())
    let audioContext;
    let newStream;
    let mic;
    let pitch;
    const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'
    const [note, setNote] = useState(0)
    const [noteName, setNoteName] = useState('');
    const [listening, setListening] = useState(false)
    const [stream, setStream] = useState(null)

    const setup = async () => {
        audioContext  = new AudioContext();
        newStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        setStream(newStream)
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

    function gotPitch(error, frequency) {
          if (frequency) {
              console.log(Math.floor(frequency))
              const currentNote = Midi.midiToNoteName(frequency + 20)
              identifyInt(currentNote);
              setNoteName(currentNote)
          } 
          pitch.getPitch(gotPitch)
      }


    return (
        <>
        <h1>This will be a pitch detector </h1>
        {/* <button onClick={startPitch}>Detect pitch</button> */}
        <div>The note is {noteName}</div>
        <button onClick={handleClick}>Detect</button>
        </>
    )
}

export default PitchDetector