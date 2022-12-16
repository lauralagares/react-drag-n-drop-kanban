const colors = [
  '#8ef6e4',
  '#9896f1',
  '#d59bf6',
  '#edb1f1',
];

export function pickRandomColor() {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}