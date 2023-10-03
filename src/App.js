import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import { useEffect, useState } from 'react';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import './App.css';
const drumPadSrc = [
  {
    keyCode: 81,
    text: "Q",
    id: "Heater 1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    text: "W",
    id: "Heater 2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    text: "E",
    id: "Heater 3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    text: "A",
    id: "Heater 4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    text: "S",
    id: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    text: "D",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    text: "Z",
    id: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    text: "X",
    id: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    text: "C",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];
function App() {
  const [activeId, setActiveId] = useState('');
  const [volume, setVolume] = useState (50); //state for volume control
  const [isPowerOn, setPowerOn] = useState(true);
  const [bankSwitch, setBankSwitch] = useState(false); //state for bank switch
  const [activeButton, SetActiveButton] = useState(null);

  useEffect(()=> {
    document.addEventListener('keydown', (keyEvent)=>{
    
      const drumPad = drumPadSrc.find((pad) => pad.text === keyEvent.key.toUpperCase());
      if (drumPad) {
        playAudio(drumPad.text, drumPad.id); 
      }
    });

  },[]);
    const playAudio = (select, id) => {
    const audio = document.getElementById(select.toUpperCase());
      audio.currentTime = 0;
      audio.play().catch((error) => {
        // Handle any errors that occur during audio playback
        console.error(error);
      });      
      setActiveId(id)
      SetActiveButton(id)
      audio.onended = () => {
       SetActiveButton(null);
      }
      setTimeout(() => {
        SetActiveButton(null);
      }, 100);
  }
  //Volume control function 
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    drumPadSrc.forEach((audioVolume) => {
      const audioElement = document.getElementById(audioVolume.text.toUpperCase());
      if (audioElement) {
        audioElement.volume = newValue / 100;
      }
    });
  };
  return (
    <div className="App">
      <div className="container" id="drum-machine">
      <div className="drum-container" id="drum-button">
        {drumPadSrc.map((pad) => (
          <div className={`drum-pad ${activeButton === pad.id ? 'active' : ''}`} key={pad.id} id={pad.src} onClick={() => {playAudio(pad.text, pad.id)}} > {pad.text} 
          <audio className='clip' id={pad.text} src={isPowerOn ? pad.src : "#" } key={pad.id} />
          </div>
        ))}
      </div>
      <div className="drum-control">
      <PowerSettingsNewIcon className= {isPowerOn ? "power-icon" : "power-icon-off"} sx={{
        fontSize: "2rem",
        borderRadius: "20px",
      }} />
        <p className="power">Power</p>
          <Switch className="power-button" checked={isPowerOn} onChange={(event)=> setPowerOn(event.target.checked)} />
        <div className="display-container">
            <p id="display"> {activeId}  </p>
        </div>
        <Slider value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
            min={0}
            max={100}
            valueLabelDisplay="auto" />
        <p className="bank">Bank</p>
        <Switch className="bank-button" checked={bankSwitch} onChange={(event)=> setBankSwitch(event.target.checked)} />  
        <p className='text' style={{color:"red"}} >{bankSwitch ? "No audio source" : "" } </p>
    </div>
    </div>
    </div>
  );
}

export default App;
