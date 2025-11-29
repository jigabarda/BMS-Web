import { useState } from "react";
import { api } from "@/app/lib/api";
import { useNavigate } from "react-router-dom";

export default function NewBroadcast() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    await api.createBroadcast({ title, message });
    navigate("/");
  };

  return (
    <div className="new-broadcast-container">
      <h2>Create Broadcast</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="new-broadcast-input"
      />

      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="new-broadcast-textarea"
      />

      <button onClick={handleCreate}>Save</button>
    </div>
  );
}
