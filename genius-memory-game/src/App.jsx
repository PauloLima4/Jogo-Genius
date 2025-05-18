import { useState, useEffect } from "react";
import ColorButton from "./components/ColorButton";
import Scoreboard from "./components/Scoreboard";

const colors = ["red", "green", "blue", "yellow"];

export default function App() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [isUserTurn, setIsUserTurn] = useState(false);

  // Função para dar flash visual no botão
  const flashButton = (color) => {
    const button = document.getElementById(color);
    if (!button) return;
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 600);
  };

  // Executa a sequência (animação + som)
  const playSequence = async () => {
    setIsUserTurn(false);
    for (const color of sequence) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      flashButton(color);
    }
    setIsUserTurn(true);
  };

  // Inicia o jogo
  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setScore(0);
    setIsPlaying(true);
    setIsUserTurn(false);
  };

  // Adiciona próxima cor e toca sequência
  useEffect(() => {
    if (isPlaying && sequence.length === 0) {
      const nextColor = colors[Math.floor(Math.random() * colors.length)];
      setSequence([nextColor]);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (sequence.length > 0) {
      playSequence();
    }
  }, [sequence]);

  // Verifica os cliques do usuário
  useEffect(() => {
    if (!isUserTurn) return;
    const currentIndex = userSequence.length - 1;
    if (userSequence[currentIndex] !== sequence[currentIndex]) {
      alert("Sequencia errado, tente novamente.");
      setIsPlaying(false);
      setIsUserTurn(false);
      setSequence([]);
      setUserSequence([]);
      setScore(0);
      return;
    }

    if (userSequence.length === sequence.length) {
      setScore(sequence.length);
      setUserSequence([]);
      // adiciona próxima cor na sequência após delay
      setTimeout(() => {
        const nextColor = colors[Math.floor(Math.random() * colors.length)];
        setSequence((prev) => [...prev, nextColor]);
        setIsUserTurn(false);
      }, 1000);
    }
  }, [userSequence]);

  // Handle clique do usuário nos botões
  const handleUserClick = (color) => {
    if (!isUserTurn) return;
    flashButton(color);
    setUserSequence((prev) => [...prev, color]);
  };

  return (
    <div className="app">
      <h1>🎮 Jogo Genius</h1>
      <Scoreboard score={score} />
      <div className="button-grid">
        {colors.map((color) => (
          <ColorButton key={color} color={color} onClick={handleUserClick} />
        ))}
      </div>
      <button className="start-btn" onClick={startGame}>
        {isPlaying ? "Novo Jogo" : "Começar"}
      </button>
    </div>
  );
}
