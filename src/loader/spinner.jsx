import "./spinner.css";

export default function Spinner({ size = 24, border = 3 }) {
  return (
    <div
      className="loading-spinner"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${border}px`,
      }}
    />
  );
}