import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [volume, setVolume] = useState(0.5);
  const [typingSound, setTypingSound] = useState("off");
  const [wrongSound, setWrongSound] = useState("off");
  const [backgroundMusic, setBackgroundMusic] = useState("off");

  return (
    <SoundContext.Provider
      value={{
        typingSound,
        setTypingSound,

        wrongSound,
        setWrongSound,

        backgroundMusic,
        setBackgroundMusic,

        volume,
        setVolume,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
