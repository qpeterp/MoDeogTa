import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [typingSound, setTypingSound] = useState("off");
  const [volume, setVolume] = useState(3);

  return (
    <SoundContext.Provider
      value={{
        typingSound,
        setTypingSound,
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
