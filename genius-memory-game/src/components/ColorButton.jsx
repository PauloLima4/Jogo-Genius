export default function ColorButton({ color, onClick }) {
  return (
    <button
      id={color}
      className={`color-button ${color}`}
      onClick={() => onClick(color)}
      aria-label={`${color} button`}
    />
  );
}
