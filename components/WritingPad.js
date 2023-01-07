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

  const mutateStore = async (task, text, time) => {
    setLoading(true);

    const resp = await fetch("/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, text, time }),
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
    mutateStore("RESET");
  };

  const [inputText, setInputText] = useState("");

  const addHandler = async (event) => {
    event.preventDefault();
    await mutateStore("APPEND", inputText, new Date());
    setInputText("");
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
        <div
          style={{ border: "2px solid brown", width: "100%", padding: "10px" }}
        >
          <form onSubmit={addHandler}>
            <input
              type="text"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              minLength="1"
              style={{ minWidth: "50%" }}
            />
            <button disabled={!inputText}>Add</button>
          </form>
        </div>
        <div
          style={{
            border: "2px solid brown",
            width: "100%",
            padding: "10px",
            paddingTop: "12px",
          }}
        >
          {!error && !(loading && store.length === 0) && (
            <TextCards store={store} />
          )}
          <>
            {!loading && error && "Error"}
            {loading && "Loading..."}
          </>
        </div>
      </div>
    </div>
  );
}
