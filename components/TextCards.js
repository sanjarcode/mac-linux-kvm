import TextCard from "./TextCard";

export default function TextCards({ store = [] }) {
  return (
    <div>
      {store.length === 0 && <h4>Nothing here!</h4>}
      {store.length > 0 && (
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {store.map(({ time, text }) => (
            <TextCard time={time} text={text} />
          ))}
        </div>
      )}
    </div>
  );
}
