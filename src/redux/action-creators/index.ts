import axios from "axios";
import { Dispatch } from "redux";
import bundler from "../../bundler";
import { ActionType } from "../action-types";
import {
  MoveShellAction,
  UpdateShellAction,
  InsertShellAfterAction,
  DeleteShellAction,
  Direction,
  Action,
} from "../actions";
import { ShellType, Shell } from "../shell";
import { RootState } from "../reducers";

export const updateShell = (id: string, content: string): UpdateShellAction => {
  return {
    type: ActionType.UPDATE_SHELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteShell = (id: string): DeleteShellAction => {
  return {
    type: ActionType.DELETE_SHELL,
    payload: id,
  };
};
export const moveShell = (
  id: string,
  direction: Direction
): MoveShellAction => {
  return {
    type: ActionType.MOVE_SHELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertShellAfter = (
  id: string | null,
  shellType: ShellType
): InsertShellAfterAction => {
  return {
    type: ActionType.INSERT_SHELL_AFTER,
    payload: {
      id,
      type: shellType,
    },
  };
};
export const createBundle = (shellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.BUNDLE_START, payload: { shellId } });
    const result = await bundler(input);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: { shellId, bundle: result },
    });
  };
};
export const fetchShells = (filename: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_SHELLS });
    try {
      const token = localStorage.getItem("jsbook_token");
      const { data }: { data: any } = await axios.get(
        `/shells/${filename}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data.shell.shells);

      dispatch({
        type: ActionType.FETCH_SHELLS_COMPLETE,
        payload: data.shell?.shells,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_SHELLS_COMPLETE,
        payload: err.message,
      });
    }
  };
};
export const saveShells = (filename: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { shells } = getState();
    let fetchedShells: Shell[] = [];
    if (shells) {
      const { order, data } = shells;
      fetchedShells = order.map((id) => {
        return data[id];
      });
    }
    try {
      const token = localStorage.getItem("jsbook_token");
      await axios.post(
        "/shells",
        {
          shells: fetchedShells,
          name: filename,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error: any) {
      dispatch({ type: ActionType.SAVE_SHELLS_ERROR, payload: error.message });
    }
  };
};
