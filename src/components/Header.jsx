export default function Header(props) {
  return (
    <header>
      <h1>Assembly: Endgame</h1>
      <p>
        Guess the word in under {props.max} attempts to keep the programming world safe
        from Assembly!
      </p>

      <div
        className="sub-header-container"
        style={{ backgroundColor: "rgba(16, 169, 91, 1)" }}
      >
        <h2>You Win!</h2>
        <h3>Well done!🎉</h3>
      </div>
    </header>
  );
}
