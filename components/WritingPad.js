import { useEffect, useState } from "react";
import TextCards from "./TextCards";

export default function WritingPad({ initStore = [] }) {
  const [store, setStore] = useState(initStore);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getStore = async () => {
    setLoading(true);

    const resp = await fetch("/api/store");

    const { currentState } = await resp.json();
    setStore(currentState);

    setLoading(false);
  };

  const mutateStore = async () => {
    setLoading(true);

    const resp = await fetch("/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: "RESET" }),
    });

    const { currentState } = await resp.json();
    setStore(currentState);

    setLoading(false);
  };

  useEffect(() => {
    if (!initStore.length) getStore();
  }, []);

  const refreshHandler = (event) => {
    getStore();
    event.preventDefault();
  };

  const clearHandler = (event) => {
    event.preventDefault();
    mutateStore();
  };

  return (
    <div
      style={{
        backgroundColor: "#FADB6F",
        margin: "50px",
        padding: "50px",
        paddingTop: "5px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>WritingPad</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          height: "30px",
        }}
      >
        <button onClick={refreshHandler}>Refresh</button>
        <button onClick={clearHandler}>Clear</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: "32px",
        }}
      >
        <div style={{ border: "1px solid red", width: "50%" }}>b</div>
        <div style={{ border: "1px solid red", width: "50%" }}>
          {loading && "Loading..."}
          {!loading && error && "Error"}
          {!loading && !error && <TextCards store={store} />}
        </div>
      </div>
    </div>
  );
}
