import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (shellId: string) => {
  return useTypedSelector((state) => {
    if (state.shells) {
      const { data, order } = state.shells;
      const orderedShells = order.map((id) => data[id]);
      const showFunc = `
          import _React from "react";
          import _ReactDOM from "react-dom";
          const root = document.querySelector("#root");
          var show = (value) => {
            if (typeof value === "object") {
              if (value.$$typeof && value.props) {
                _ReactDOM.render(value, root);
              } else {
                root.innerHTML = JSON.stringify(value);
              }
            } else {
              root.innerHTML = value;
            }
          }
          `;
      const showFuncNoOp = "var show = () => {}";
      const cumCode = [];
      for (let c of orderedShells) {
        if (c.type === "code") {
          if (c.id === shellId) {
            cumCode.push(showFunc);
          } else {
            cumCode.push(showFuncNoOp);
          }
          cumCode.push(c.content);
        }
        if (c.id === shellId) {
          break;
        }
      }
      return cumCode;
    } else {
      return [];
    }
  }).join("\n");
};
