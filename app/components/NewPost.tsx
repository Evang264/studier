import { useState } from "react";

import ModalPopup from "./ModalPopup";

export default function NewPost({
  show,
  onClose,
  onFinish,
}: {
  show: boolean;
  onClose: () => void;
  onFinish: (title: string, description: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <ModalPopup show={show} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl">
          Title
        </h2>
        <input
          className="bg-zinc-800 text-white text-xl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3 className="text-xl">
          Description
        </h3>
        <textarea
          className="bg-zinc-800 text-white text-xl"
          value={description}
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-4">
          <button
            onClick={() => onFinish(title, description)}
            className="flex-1 p-4 rounded-md bg-green-600 hover:bg-green-800 text-xl"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="flex-1 p-4 rounded-md bg-red-600 hover:bg-red-800 text-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalPopup>
  );
}
