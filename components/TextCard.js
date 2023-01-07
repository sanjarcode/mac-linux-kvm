export default function TextCard({ time, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <div
        style={{
          maxHeight: "120px",
          overflow: "auto",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        {text}
      </div>
      <time style={{ backgroundColor: "lightgrey", flexShrink: "0" }}>
        <code>
          {`${new Date(time).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })} ${new Date(time).toLocaleString("en-US", {
            year: "2-digit",
            month: "short",
            day: "2-digit",
          })}`}
        </code>
      </time>
    </div>
  );
}
