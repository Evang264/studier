import { useState } from "react";
import { FaCheck, FaPencil, FaXmark } from "react-icons/fa6";

export default function EditableInput({
  onUpdate: onEnter,
  text = "",
  multiline = false,
}: {
  onUpdate: (text: string) => void;
  text: string;
  multiline: boolean;
}) {
  const [value, setValue] = useState(text);
  const [lastSavedValue, setLastSavedValue] = useState(text);
  const [editable, setEditable] = useState(false);

  const InputComponent = multiline ? "textarea" : "input";
  const TextComponent = multiline? "pre" : "text";

  return (
    <div className="flex flex-row">
      {editable ? (
        <InputComponent
          className="bg-black text-white"
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      ) : (
        <pre>{value}</pre>
      )}

      {!editable ? (
        <button className="icon-button" onClick={() => setEditable(!editable)}>
          <FaPencil />
        </button>
      ) : (
        <div className="flex flex-row">
          <button>
            <FaCheck onClick={() => {
              onEnter(value);
              setLastSavedValue(value);
              setEditable(false);
            }} />
          </button>
          <button>
            <FaXmark onClick={() => {
              setValue(lastSavedValue);
              setEditable(false);
            }} />
          </button>
        </div>
      )}
    </div>
  );
}
