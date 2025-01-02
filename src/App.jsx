import React, { useEffect } from "react";
import Header from "./components/Header";
import Eliminations from "./components/Eliminations";
import WORDS from "../../POOL";

import { useState } from "react";

const maxAttempts = 8;

/**
 * Project planning:
 *
 * Questions to ask yourself before writing any code:
 *
 * - What are the main containers of elements I need
 *   in this app?
 *
 *  - Header (static)
 *  - sub header / status section (messages along the game interactions)
 *  - Eliminations
 *  - Word
 *  - Letter
 *
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 *
 *  a state for the elimination counter
 *  Know if the game is over or not
 *  another state for the letters revealed
 *
 *
 * - How will the user interact with the app? What
 *   events do I need to handle?
 *
 *  -handle click the letter button -> check the letter and see if the hidden word contains that letter.
 *  -eliminate of the lives remaining
 *  -update word revealed
 *  -appearance of the "new game" button . Probably appears when game is over/won.
 *
 *
 */

function App() {
  const [gameStats, setGameStats] = useState({
    isGameOver: false,
    playerWon: false,
    wrongGuessesState: [],
    correctGuessesState: [],
  });

  const correctGuesses = gameStats.correctGuessesState;
  const wrongGuesses = gameStats.wrongGuessesState;

  // Get a word and split it to an array of strings for each letter
  const word = WORDS[0].toUpperCase().split("");

  // HIDDEN WORD map the word and display a space for each letter
  const currentWord = word.map((char) => (
    <div className="letter-box">
      <span
        style={{
          display: gameStats.correctGuessesState.includes(char) ? null : "none",
        }}        
      >
        {char}
      </span>
    </div>
  ));

  // Letters pad - buttons
  const alphabetArray = [];
  for (let i = 0; i < 26; i++) {
    //Alphabet has 26 letters
    alphabetArray.push(String.fromCharCode(97 + i).toUpperCase());
    //97 is the ASCII code for 'a' , next numbers are the next letters
  }

  const letters = alphabetArray.map((letter) => (
    <button
      style={{
        backgroundColor: gameStats.correctGuessesState.includes(letter)
          ? "rgba(16, 169, 91, 1)"
          : gameStats.wrongGuessesState.includes(letter) ? "rgba(236, 93, 73, 1)" : "rgba(252, 186, 41, 1)"
      }}
      disabled= {gameStats.isGameOver ? true : false}
      className="letter-btn"
      onClick={() => handleGuess(event)}
    >
      {letter}
    </button>
  ));

  ////// Functions

  // Check guessed letter
  function handleGuess(event) {
    let pressedLetter = event.target.textContent;

    if (word.includes(pressedLetter)) {
      correctGuesses.push(pressedLetter);
      setGameStats((prevStats) => ({
        ...prevStats,
        correctGuessesState: correctGuesses,
      }));
    } else {
      wrongGuesses.push(pressedLetter);
      setGameStats((prevStats) => ({
        ...prevStats,
        wrongGuessesState: wrongGuesses,
      }));
    }

    //Disable button
    event.target.disabled = true
  }

  // Check if game is over
    // Use effect to only render this if a guess is made
    // The game should end if the length of the correct guesses = to the word array length -> WIN
    // The game should end if the player runs out of lives and the length of the correct guesses is still < word array length -> Lose
    
    useEffect(() => {
      const wordIsGuessed = word.every(letter => gameStats.correctGuessesState.includes(letter)) // -> True or false . Returns true only if all letter in word are present in the correct guesses array.

      if ( wordIsGuessed ) {
        setGameStats(prevState => ({
          ...prevState,
          isGameOver: true,
          playerWon: true
        }))
      } else if ( gameStats.wrongGuessesState.length > maxAttempts && !wordIsGuessed ) {
        setGameStats(prevState => ({
          ...prevState,
          isGameOver: true,
          playerWon: false
        }))
      }
    }, [gameStats.wrongGuessesState.length, gameStats.correctGuessesState.length]);
     

  console.log(gameStats);

  return (
    <>
      <Header max={maxAttempts}/>
      <Eliminations wrongNumber={gameStats.wrongGuessesState.length}/>

      <div className="word-container">{currentWord}</div>

      <div className="all-letters-container">{letters}</div>
    </>
  );
}

export default App;
