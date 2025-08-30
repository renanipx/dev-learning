import { useState } from "react";
import Modal from "./Modal";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Portals with TypeScript</h1>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Hello from the modal!</h2>
          <p>This modal is rendered outside of #root 🎉</p>
        </Modal>
      )}
    </div>
  );
}
