import LIVES from "../../../LIVES";
import { getFarewellText } from "../../../MESSAGES";

export default function Eliminations(props) {

  let lives = LIVES.map((element, index) => (
    <div
      key={element.text}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {index < props.wrongNumber && (
        <span style={{ position: "absolute" }}>💀</span>
      )}

      <p
        style={{
          backgroundColor: element.backgroundColor,
          color: element.color,
          opacity: index < props.wrongNumber ? "10%" : "100%",
        }}
        className="life"
        key={element.text}
      >
        {element.text}
      </p>
    </div>
  ));

  return (
    <>
      <div className="eliminations-container">{lives}</div>
    </>
  );
}
