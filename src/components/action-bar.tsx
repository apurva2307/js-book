import "./styles/action-bar.css";
import { useActions } from "../hooks/use-actions";
import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";

interface ActionBarProps {
  id: string;
  filename: string;
}
const ActionBar: React.FC<ActionBarProps> = ({ id, filename }) => {
  const { moveShell, deleteShell, saveShells } = useActions();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveShell(id, "up");
          saveShells(filename);
        }}
      >
        <span className="icon">
          <FaArrowUp size={12} />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          moveShell(id, "down");
          saveShells(filename);
        }}
      >
        <span className="icon">
          <FaArrowDown size={12} />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => {
          deleteShell(id);
          saveShells(filename);
        }}
      >
        <span className="icon">
          <FaTimes size={12} />
        </span>
      </button>
    </div>
  );
};
export default ActionBar;
