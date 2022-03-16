import "./styles/shell-list.css";
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddShell from "./add-shell";
import ShellListItem from "./shell-list-item";
import { useActions } from "../hooks/use-actions";
import { useParams } from "react-router-dom";

const ShellList: React.FC = () => {
  const { fetchShells } = useActions();
  // @ts-ignore
  const { filename } = useParams();
  const shells = useTypedSelector(({ shells }) => {
    if (shells) {
      const { order, data } = shells;
      return order.map((id) => {
        return data[id];
      });
    } else {
      return [];
    }
  });
  useEffect(() => {
    fetchShells(filename!);
    // eslint-disable-next-line
  }, []);

  const renderedShells = shells.map((shell) => (
    <Fragment key={shell.id}>
      <ShellListItem shell={shell} filename={filename ? filename : ""} />
      <AddShell prevShellId={shell.id} filename={filename ? filename : ""} />
    </Fragment>
  ));
  return (
    <div className="shell-list">
      <AddShell
        forceVisible={shells.length === 0}
        prevShellId={null}
        filename={filename ? filename : ""}
      />
      {renderedShells}
    </div>
  );
};
export default ShellList;
