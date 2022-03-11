import { useActions } from "../hooks/use-actions";
import { FaPlus } from "react-icons/fa";
import "./styles/add-shell.css";

interface AddShellProps {
  prevShellId: string | null;
  forceVisible?: boolean;
  filename: string;
}
const AddShell: React.FC<AddShellProps> = ({
  forceVisible,
  prevShellId,
  filename,
}) => {
  const { insertShellAfter, saveShells } = useActions();
  return (
    <div className="add-shell" style={forceVisible ? { opacity: "1" } : {}}>
      <button
        className="button is-rounded is-primary is-small"
        onClick={() => {
          insertShellAfter(prevShellId, "code");
          saveShells(filename);
        }}
      >
        <span className="icon is-small">
          <FaPlus size={11} />
        </span>
        <span>Code</span>
      </button>
      <button
        className="button is-rounded is-primary is-small"
        onClick={() => {
          insertShellAfter(prevShellId, "text");
          saveShells(filename);
        }}
      >
        <span className="icon is-small">
          <FaPlus size={11} />
        </span>
        <span>Text</span>
      </button>
      <div className="divider"></div>
    </div>
  );
};

export default AddShell;
