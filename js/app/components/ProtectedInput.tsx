import EditableInput from "./EditableInput";

export default function ProtectedInput({
  text,
  editable,
  onUpdate,
  multiline = false,
}: {
  text: string;
  editable: boolean;
  onUpdate: (text: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      {editable ? (
        <EditableInput text={text} onUpdate={onUpdate} multiline={multiline} />
      ) : (
        <pre>{text}</pre>
      )}
    </div>
  );
}