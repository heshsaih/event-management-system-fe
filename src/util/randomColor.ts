const availableLetters = "0123456789ABCDEF".split("");

function addLetterToResult(limit: number): string {
  return availableLetters[Math.round(Math.random() * limit)];
}

export default function getRandomColor(): string {
  let result = `#${addLetterToResult(Math.round(availableLetters.length / 2))}`;

  for (let i = 0; i < 5; i++) {
    result += addLetterToResult(availableLetters.length - 1);
  }

  return result;
}
