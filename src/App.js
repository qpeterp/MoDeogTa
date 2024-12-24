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
      </div>
    </>
  );
}

export default App;
