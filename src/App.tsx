import { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ top: '0px', left: '0px' });
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  const waitingGif = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWpobjZ3cmR5Z3F0Ym9pZzR4eHh4eHh4eHh4eHh4eHh4eHh4eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cLS1cfxvGOPVpf9g3y/giphy.gif";

  const handleYes = () => {
    setYesPressed(true);
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 150); // Adjusted margin
    const y = Math.random() * (window.innerHeight - 50);
    setNoButtonPos({ top: `${y}px`, left: `${x}px` });
    setIsHoveringNo(true);
    setNoCount(noCount + 1);
  };

  return (
    <div className="container">
      {yesPressed ? (
        <div className="celebration">
          {/* Changed <img> to <video> for mp4 support */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="main-gif"
          >
            <source src={`${process.env.PUBLIC_URL}/yay.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className="title">HEHE! I knew you'd say yes! ❤️</h1>
          <p className="subtitle">Prepare for the best Valentine's ever!</p>
        </div>
      ) : (
        <div className="ask-container">
          <img src={waitingGif} alt="Waiting..." className="main-gif" />
          <h1 className="title">Will you be my Valentine?</h1>
          
          <div className="button-group">
            <button 
              className="yes-button"
              onClick={handleYes}
              style={{ transform: `scale(${1 + noCount * 0.15})`, zIndex: 100 }}
            >
              YES!
            </button>

            <button 
              className="no-button"
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={isHoveringNo ? { 
                position: 'fixed', 
                top: noButtonPos.top, 
                left: noButtonPos.left,
                transition: '0.1s all ease', // Faster jump
                zIndex: 10
              } : {}}
            >
              {noCount === 0 ? "No" : "Wait, stop!"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;