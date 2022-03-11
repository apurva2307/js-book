import MDEditor from "@uiw/react-md-editor";
import "./styles/text-editor.css";
import { useState, useEffect, useRef } from "react";
import { Shell } from "../redux/shell";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  shell: Shell;
  filename: string;
}
const TextEditor: React.FC<TextEditorProps> = ({ shell, filename }) => {
  const [editing, setEditing] = useState(false);
  const { updateShell, saveShells } = useActions();
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);
  return (
    <div
      className="text-editor card"
      ref={ref}
      onClick={() => setEditing(true)}
    >
      {editing && (
        <MDEditor
          value={shell.content}
          onChange={(v) => {
            updateShell(shell.id, v || "");
            saveShells(filename);
          }}
        />
      )}
      {!editing && (
        <div className="card-content">
          <MDEditor.Markdown source={shell.content || "Click to edit"} />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
