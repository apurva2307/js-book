import "./styles/code-shell.css";
import { useEffect } from "react";
import { Shell } from "../redux/shell";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useCumulativeCode } from "../hooks/use-cumulative-code";

interface CodeShellProps {
  shell: Shell;
  filename: string;
}
const CodeShell: React.FC<CodeShellProps> = ({ shell, filename }) => {
  const { updateShell, createBundle, saveShells } = useActions();
  const bundle = useTypedSelector((state) => {
    if (state.bundles) {
      return state.bundles[shell.id];
    }
  });
  const cumulativeCode = useCumulativeCode(shell.id);
  useEffect(() => {
    if (!bundle) {
      createBundle(shell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(shell.id, cumulativeCode);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shell.content, createBundle, shell.id, cumulativeCode]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={shell.content}
            onChange={(value) => {
              updateShell(shell.id, value);
              saveShells(filename);
            }}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};
export default CodeShell;
