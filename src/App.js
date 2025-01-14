import "./App.scss";
import Header from "./Header";
import TypingInput from "./TypingInput";

function App() {
  return (
    <>
      <Header />
      <div className="background">
        <TypingInput />
        <p className="text">
          <span className="keyboard-text"> Tab </span> +
          <span className="keyboard-text"> Enter </span> - 재시작
        </p>
        <p className="text">
          <span className="keyboard-text"> Tab </span> +
          <span className="keyboard-text"> Tab </span> +
          <span className="keyboard-text"> Enter </span> - 글 변경
        </p>
      </div>
    </>
  );
}

export default App;
