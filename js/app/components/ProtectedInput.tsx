import EditableInput from "./EditableInput";

export default function ProtectedInput({
  text,
  editable,
  onUpdate,
  className = "",
  multiline = false,
}: {
  text: string;
  editable: boolean;
  onUpdate: (text: string) => void;
  className?: string,
  multiline?: boolean;
}) {
  return (
    <div>
      {editable ? (
        <EditableInput text={text} onUpdate={onUpdate} multiline={multiline} />
      ) : (
        <pre className={className}>{text}</pre>
      )}
    </div>
  );
}