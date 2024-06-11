import EditableInput from "./EditableInput";

export default function ProtectedInput({
  prompt,
  text,
  editable,
  onUpdate,
  multiline,
}: {
  prompt: string;
  text: string;
  editable: boolean;
  onUpdate: (text: string) => void;
  multiline: boolean;
}) {
  return (
    <div>
      <text>{prompt}</text>
      {editable ? (
        <EditableInput text={text} onUpdate={onUpdate} multiline={multiline} />
      ) : (
        <pre>{text}</pre>
      )}
    </div>
  );
}