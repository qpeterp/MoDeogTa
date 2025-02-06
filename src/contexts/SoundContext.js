import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const [typingSound, setTypingSound] = useState(true); // 기본값: 소리 활성화
  const [volume, setVolume] = useState(10);

  return (
    <SoundContext.Provider
      value={{
        isTypingSoundEnabled: typingSound,
        setIsTypingSoundEnabled: setTypingSound,
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
