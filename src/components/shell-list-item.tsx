import "./styles/shell-list-item.css";
import { Fragment } from "react";
import { Shell } from "../redux/shell";
import CodeShell from "./code-shell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";

interface ShellListProps {
  shell: Shell;
  filename: string;
}

const ShellListItem: React.FC<ShellListProps> = ({ shell, filename }) => {
  let child: JSX.Element;
  if (shell.type === "code") {
    child = (
      <Fragment>
        <div className="action-bar-wrapper">
          <ActionBar id={shell.id} filename={filename} />
        </div>
        <CodeShell shell={shell} filename={filename} />
      </Fragment>
    );
  } else {
    child = (
      <Fragment>
        <TextEditor shell={shell} filename={filename} />
        <ActionBar id={shell.id} filename={filename} />
      </Fragment>
    );
  }
  return <div className="shell-list-item">{child}</div>;
};
export default ShellListItem;
