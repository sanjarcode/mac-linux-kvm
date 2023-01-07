export default function TextCard({ time, text }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
        <time>{new Date(time).toLocaleTimeString()}</time>
        <div>{text}</div>
    </div>
  );
}
