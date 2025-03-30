export function Debug({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        zIndex: 9999,
        maxWidth: "300px",
        maxHeight: "200px",
        overflow: "auto",
      }}
    >
      <pre style={{ margin: 0, fontSize: "12px" }}>
        {JSON.stringify(children, null, 2)}
      </pre>
    </div>
  );
}
