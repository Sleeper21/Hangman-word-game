import React, { useEffect } from "react";
import Header from "./components/Header";
import Eliminations from "./components/Eliminations";
import WORDS from "../../POOL";
import { getFarewellText } from "../MESSAGES";
import LIVES from "../LIVES";

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
    hiddenWord: [],
    gamesPlayed: 0,
    message: "",
    lastGuessWasCorrect: true
  });

  const correctGuesses = gameStats.correctGuessesState;
  const wrongGuesses = gameStats.wrongGuessesState;

  // Get a word and split it to an array of strings for each letter
  // Run this on loading and when game is over to generate a new word
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[randomNumber].toUpperCase();
    const word = randomWord.split("");

    setGameStats((previous) => ({
      ...previous,
      hiddenWord: word,
    }));
  }, [gameStats.gamesPlayed]);

  // HIDDEN WORD map the word and display a space for each letter
  const currentWord = gameStats.hiddenWord.map((char, index) => (
    <div className="letter-box" key={index}>
      <span>
        { gameStats.correctGuessesState.includes(char) ? char : "" }
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

  const letters = alphabetArray.map((letter, index) => (
    <button
      style={{
        backgroundColor: gameStats.correctGuessesState.includes(letter)
          ? "rgba(16, 169, 91, 1)"
          : gameStats.wrongGuessesState.includes(letter)
          ? "rgba(236, 93, 73, 1)"
          : "rgba(252, 186, 41, 1)",
      }}
      disabled={gameStats.isGameOver ? true : false}
      className="letter-btn"
      onClick={() => handleGuess(event)}
      key={index}
    >
      {letter}
    </button>
  ));

  ////// Functions
  // Check guessed letter
  function handleGuess(event) {
    let pressedLetter = event.target.textContent;

    if (gameStats.hiddenWord.includes(pressedLetter)) {
      correctGuesses.push(pressedLetter);
      setGameStats((prevStats) => ({
        ...prevStats,
        correctGuessesState: correctGuesses,
        lastGuessWasCorrect: true
      }));
    } else {
      wrongGuesses.push(pressedLetter);
      setGameStats((prevStats) => ({
        ...prevStats,
        wrongGuessesState: wrongGuesses,
        lastGuessWasCorrect: false
      }));
    }

    //Disable button
    event.target.disabled = true;
  }

  // Display Farewell message when wrong guess
  useEffect(() => {
    if (gameStats.wrongGuessesState.length > 0){
      let languageLost = LIVES[gameStats.wrongGuessesState.length - 1].text;
    let farewellMessage = getFarewellText(languageLost)
    setGameStats(prev => ({
      ...prev,
      message: farewellMessage
    }))
    }
    
  }, [gameStats.wrongGuessesState.length]) 

  // New Game
  function handleNewGame() {
    setGameStats((prev) => ({
      ...prev,
      isGameOver: false,
      playerWon: false,
      wrongGuessesState: [],
      correctGuessesState: [],
      gamesPlayed: prev.gamesPlayed + 1,
    }));
    //Get new word
  }

  // Check if game is over
  // Use effect to only render this if a guess is made
  // The game should end if the length of the correct guesses = to the word array length -> WIN
  // The game should end if the player runs out of lives and the length of the correct guesses is still < word array length -> Lose
  useEffect(() => {
    const wordIsGuessed =
      gameStats.correctGuessesState.length > 0 &&
      gameStats.hiddenWord.every((letter) =>
        gameStats.correctGuessesState.includes(letter)
      ); // -> True or false . Returns true only if all letter in word are present in the correct guesses array and if there is already something is the correct guesses

    if (wordIsGuessed) {
      setGameStats((prevState) => ({
        ...prevState,
        isGameOver: true,
        playerWon: true,
      }));
    } else if (
      gameStats.wrongGuessesState.length > maxAttempts &&
      !wordIsGuessed
    ) {
      setGameStats((prevState) => ({
        ...prevState,
        isGameOver: true,
        playerWon: false,
      }));
    }
  }, [
    gameStats.wrongGuessesState.length,
    gameStats.correctGuessesState.length,
  ]);

  console.log(gameStats);

  return (
    <>
      <Header
        max={maxAttempts}
        gameIsWon={gameStats.playerWon}
        gameIsOver={gameStats.isGameOver}
        wrongMessage={gameStats.message}
        lastGuessIsCorrect={gameStats.lastGuessWasCorrect}
      />
      <Eliminations wrongNumber={gameStats.wrongGuessesState.length} />

      <div className="word-container">{currentWord}</div>
      <div className="all-letters-container">{letters}</div>
      <button
        className="new-game-btn"
        style={{ display: gameStats.isGameOver ? undefined : "none" }}
        onClick={() => handleNewGame()}
      >
        New Game
      </button>
    </>
  );
}

export default App;
