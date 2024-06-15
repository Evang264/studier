import { useState } from "react";
import { FaCheck, FaPencil, FaXmark } from "react-icons/fa6";

export default function EditableInput({
  onUpdate: onEnter,
  className = "",
  text = "",
  multiline = false,
}: {
  onUpdate: (text: string) => void;
  className?: string,
  text?: string;
  multiline?: boolean;
}) {
  const [value, setValue] = useState(text);
  const [lastSavedValue, setLastSavedValue] = useState(text);
  const [editable, setEditable] = useState(false);

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className="flex flex-row">
      {editable ? (
        <InputComponent
          className={`bg-black text-white mr-4 w-full ${className}`}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      ) : (
        <pre className={`mr-2 ${className}`}>{value}</pre>
      )}

      {!editable ? (
        <button className="icon-button" onClick={() => setEditable(!editable)}>
          <FaPencil />
        </button>
      ) : (
        <div className="flex flex-row">
          <button>
            <FaCheck color="green" onClick={() => {
              onEnter(value);
              setLastSavedValue(value);
              setEditable(false);
            }} />
          </button>
          <button>
            <FaXmark color="red" onClick={() => {
              setValue(lastSavedValue);
              setEditable(false);
            }} />
          </button>
        </div>
      )}
    </div>
  );
}
