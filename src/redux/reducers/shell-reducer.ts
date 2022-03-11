import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Shell } from "../shell";

interface ShellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Shell;
  };
}

const initialState: ShellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: ShellState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SAVE_SHELLS_ERROR:
      state.error = action.payload;
      return state;
    case ActionType.FETCH_SHELLS:
      state.loading = true;
      state.error = null;
      return state;
    case ActionType.FETCH_SHELLS_COMPLETE:
      state.loading = false;
      state.error = null;
      state.order = action.payload.map((shell) => shell.id);
      state.data = action.payload.reduce((acc, shell) => {
        acc[shell.id] = shell;
        return acc;
      }, {} as ShellState["data"]);
      return state;
    case ActionType.FETCH_SHELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;
    case ActionType.UPDATE_SHELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_SHELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionType.MOVE_SHELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    case ActionType.INSERT_SHELL_AFTER:
      const shell: Shell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      state.data[shell.id] = shell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.unshift(shell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, shell.id);
      }

      return state;
    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
