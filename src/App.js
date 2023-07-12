import { useState } from "react";
import StartMenu from "./components/StartMenu";
import Quiz from "./components/Quiz";
function App() {
  const [isGameStart, setIsGameStart] = useState(false)
  function startGame() {
    setIsGameStart(true)
  }
  return (
    <main>
      {isGameStart ? <Quiz /> : <StartMenu startGame={startGame} />}
    </main>
  );
}

export default App;
