import React, { useState } from 'react'
import useGlitch from './useGlitch';  
import './App.css'

//Main app body. Checks to see if game is started or if player data is still needed. 
const App = () => {
  const [playerData, setPlayerData] = useState({});
  const [secondPlayerData, setSecondPlayerData] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const handleDeploy = (e) => {
    e.target.disabled = true;
  };
  return (
      <div className='container'>
        {gameStarted &&
         <Init/>
        }
        <>
          {gameStarted === false ?
            <div className='center-desktop'>
              <header onClick={useGlitch}>
                <h1>Welcome to SWUcount</h1>
              </header>
              <p className='explanation'>An app that makes tracking your Star Wars: Unlimited games that much easier.</p>
              <p className='explanation'>Enter player information below.</p>
              <AddPlayerForm
                setPlayeData={setPlayerData}
                setSecondPlayerData={setSecondPlayerData}
                setGameStarted={setGameStarted}/>
            </div>
            :
            <>
              <div id="board">
                <div className={playerData.color} id='player-one'>
                  <div>
                    <h2>{playerData.player}</h2>
                    <HitPoints
                      playerNo={1}
                      playerData={playerData}
                      secondPlayerData={secondPlayerData}
                    />
                    <TakeInitiative/>
                    <div>
                      <button className='inline deploy transition' onClick={handleDeploy}>Deploy Leader</button>
                        {playerData.hp === 25 &&
                          <button className='inline deploy transition' onClick={handleDeploy}>Use Base's Epic Action</button>
                        }
                      </div>
                    </div>
                  </div>
                <div>
                  <Reset/>
                </div>
                <div className={secondPlayerData.color} id='player-two'>
                  <div>
                    <h2>{secondPlayerData.player}</h2>
                    <HitPoints
                      playerNo={2}
                      playerData={playerData}
                      secondPlayerData={secondPlayerData}
                    />
                    <TakeInitiative/>
                    <div>
                      <button className='inline deploy transition' onClick={handleDeploy}>Deploy Leader</button>
                        {secondPlayerData.hp === 25 &&
                          <button className='inline deploy transition' onClick={handleDeploy}>Use Base's Epic Action</button>
                        }
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </>
    </div>
  )
};
export default App

//Displays form and handles inputs
const AddPlayerForm = ({setPlayeData, setSecondPlayerData, setGameStarted}) => {
  const [isP2, setIsP2] = useState(false);
  const handlePlayerForm = (e) => {
    let formName = document.querySelector('form').id;
    let nameInput = document.getElementById('p-name');
    let pName = document.getElementById('p-name').value;
    if (pName !== '') {
    let pColor = document.getElementById('p-color').value;
    let rarity = document.getElementById('p-rare').checked;
    let pHp = rarity === true ? 25 : 30;
      if (formName === 'p1') {
             setPlayeData({
                player: pName,
                color: pColor,
                hp: pHp,
              });
              setIsP2(true);
            } else {
              setSecondPlayerData({
                player: pName,
                color: pColor,
                hp: pHp,
              });
              setGameStarted(true);
            }
            nameInput.setAttribute('aria-invalid', 'false');
    } else {
      nameInput.setAttribute('aria-invalid', 'true');
    }
    return false;
  };
  return (
    <>
    {isP2 ?
    <div className='player-info broken-border'>
        <form id='p2'>
          <h2>Player 2</h2>
            <Formfields/>
        </form>
          <button className='transition' onClick={handlePlayerForm}>Start Game</button>
      </div>
      :
    <div className='player-info'>
      <form id='p1'>
        <h2>Player One</h2>
          <Formfields/>
      </form>
        <button className='transition' onClick={handlePlayerForm}>Next Player</button>
    </div>
    }
    </>
  )
};

//Inputs are stored here to avoid being redundant.
const Formfields = () => {
  return (
    <div>
    <div>
      <label htmlFor='p-name'>Name: </label>
      <input id='p-name' name='p-name' type='text' aria-required='true' aria-errormessage='nameErr' required/>
      <div id='nameErr' className='error-msg'>Please add your name!</div>
    </div>
    <div>
      <label htmlFor='p-color'>Base Color: </label>
      <select id='p-color' name='p-color'>
        <option value='blue'>Blue</option>
        <option value='red'>Red</option>
        <option value='yellow'>Yellow</option>
        <option value='green'>Green</option>
      </select>
    </div>
    <div>
      <label htmlFor='p-rare' className='checkbox-label'>
        Rare (25 HP) base?     
      </label>
      <input type='checkbox' name='p-rare' id='p-rare' value="true"/> 
    </div>
  </div>
  )
};

//This pop-up determines the opening initiative.
const Init = () => {
  const handleFirstInit = () => {
    let selectedPlayer = Math.floor(Math.random() * 2) + 1;
    let pId = selectedPlayer === 1 ? 'player-one' : 'player-two';
    let playerDiv = document.getElementById(pId);
    playerDiv.classList.add('has-init');
    document.querySelector('.overlay').style.display = 'none';
  };
  return (
    <div className='overlay center'>
      <div>
        <h2>Let's randomly determine who gets the initiative for phase one.</h2>
        <button className='transition' onClick={handleFirstInit}>Determine Initiative</button>
      </div>
    </div>
  )
};

//The button that allows the player without the initiative to take it.
const TakeInitiative = () => {
  const takeInit = (e) => {
    let currentInit = document.querySelector('.has-init');
    currentInit.classList.remove('has-init');
    let targ = e.target.parentElement;
    targ.classList.add('has-init');
  };
  return (
    <button className='init-btn transition' onClick={takeInit}>Take Initiative</button>
  )
};

//A component that controls the hit points of each player. 
const HitPoints = ({playerNo, playerData, secondPlayerData}) => {
  const [currentHpOne, setCurrentHpOne] = useState(playerData.hp);
  const [currentHpTwo, setCurrentHpTwo] = useState(secondPlayerData.hp);
  return (
    playerNo === 1 ?
    <>
      {currentHpOne > 0 ?
        <>
          <div>
            <button className='add-sub inline transition' onClick={() => setCurrentHpOne(currentHpOne + 1)} aria-label='Add HP'>+</button>
            <h2 className='inline first' onClick={useGlitch}>HP: {currentHpOne}</h2>
            <button className='add-sub inline transition' onClick={() => setCurrentHpOne(currentHpOne - 1)} aria-label='Subtract HP'>-</button>
          </div>
        </> 
        :
        <h2 className='defeat'>Defeated!</h2>
      }
      <button onClick={() => setCurrentHpOne(playerData.hp)}>Reset HP</button>
    </>
    :
    <>
      {currentHpTwo > 0 ?
        <>
          <div>
            <button className='add-sub inline transition' onClick={() => setCurrentHpTwo(currentHpTwo + 1)} aria-label='Add HP'>+</button>
            <h2 className='inline second' onClick={useGlitch}>HP: {currentHpTwo}</h2>
            <button className='add-sub inline transition' onClick={() => setCurrentHpTwo(currentHpTwo - 1)} aria-label='Subtract HP'>-</button>
          </div>
        </>
        :
        <h2 className='defeat'>Defeated!</h2>
      }
    <button className='transition' onClick={() => setCurrentHpTwo(secondPlayerData.hp)}>Reset HP</button>
    </> 
  )
};

//This allows players to either reset all deploys. 
const Reset = ()  => {
  const resetDeploys = () => {
    let deploys = document.querySelectorAll('.deploy');
    console.log(deploys);
    deploys.forEach((deploy) => {
      deploy.disabled = false;
    });
  };

//A button that takes players back to the player data forms. 
  const newGame = () => {
    location.reload();
  };
  return (
    <div>
      <button className='transition' onClick={resetDeploys}>Reset Deploys</button>
      <button className='transition' onClick={newGame}>New Game</button>
    </div>
  )
};

