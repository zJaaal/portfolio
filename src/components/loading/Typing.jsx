import ReactTypingEffect from "react-typing-effect";
import "../../styles/loading/Typing.css";

const Typing = () => {
  return (
    <ReactTypingEffect
      text={"console.log('Hello World!');"}
      cursorClassName={"typing-cursor"}
      typingDelay={300}
      eraseDelay={300}
      displayTextRenderer={(text) => {
        const object = text.split(".")[0];
        const dot = text.split("console")[1]?.split("")[0];
        const method = text.split(".")[1];
        return (
          <h3 className="code">
            <span style={{ color: "#8c3d67" }}>{object}</span>
            <span style={{ color: "#54b6d8" }}>{dot}</span>
            <span style={{ color: "#54b6d8" }}>
              {method?.split("").map((char, i) => {
                if (char === "(" || char === ")")
                  return (
                    <span key={i} style={{ color: "#8c3d67" }}>
                      {char}
                    </span>
                  );
                else if ("'Hello World!'".includes(char) && i > 3)
                  return (
                    <span key={i} style={{ color: "#88b168" }}>
                      {char}
                    </span>
                  );
                else return char;
              })}
            </span>
          </h3>
        );
      }}
    />
  );
};

export default Typing;
