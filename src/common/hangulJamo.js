export function splitHangulToJamo(char) {
  const HANGUL_START = 0xac00;
  const HANGUL_END = 0xd7a3;

  const CHO = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const JUNG = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const JONG = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  // 한글 범위 내에 있는 문자일 경우
  if (
    char >= String.fromCharCode(HANGUL_START) &&
    char <= String.fromCharCode(HANGUL_END)
  ) {
    const code = char.charCodeAt(0) - HANGUL_START;
    const cho = Math.floor(code / (21 * 28)); // 초성
    const jung = Math.floor((code % (21 * 28)) / 28); // 중성
    const jong = code % 28; // 종성

    return [CHO[cho], JUNG[jung], JONG[jong]].filter(Boolean); // 종성이 없으면 제외
  }

  // 한글이 아닌 경우 그대로 반환
  return [char];
}

export function countJamo(text) {
  return text
    .split("")
    .reduce((count, char) => count + splitHangulToJamo(char).length, 0);
}
