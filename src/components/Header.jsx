export default function Header(props) {
  let statusMessage;
  if (props.gameIsWon) {
    // Player Won
    statusMessage = (
      <div
        className="sub-header-container"
        style={{ backgroundColor: "rgba(16, 169, 91, 1)" }}
      >
        <h2>You Win!</h2>
        <h3>Well done!🎉</h3>
      </div>
    );
  } else if (props.gameIsOver && !props.gameIsWon) {
    // Player lost all attempts
    statusMessage = (
      <div
        className="sub-header-container"
        style={{ backgroundColor: "rgba(186, 42, 42, 1)" }}
      >
        <h2>Game Over!</h2>
        <h3>You lose! Better start learning Assembly 😢</h3>
      </div>
    );
  } else if (props.wrongMessage !== "" && !props.lastGuessIsCorrect){ // Message will only appear of last guess is wrong
    statusMessage = (
      <div
        className="sub-header-container"
        style={{ backgroundColor: "rgba(122, 94, 167, 1)",
          display: "flex",
          justifyContent: "center",
          alignItems:"center",
          height: "59px"
        }}
      >
        <h3>{props.wrongMessage}</h3>
      </div>
    );
  }

  return (
    <header>
      <h1>Assembly: Endgame</h1>
      <p>
        Guess the word in under {props.max} attempts to keep the programming
        world safe from Assembly!
      </p>

      {statusMessage}
    </header>
  );
}
