import { ActionType } from "../action-types";
import { ShellType, Shell } from "../shell";

export type Direction = "up" | "down";
export interface MoveShellAction {
  type: ActionType.MOVE_SHELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface DeleteShellAction {
  type: ActionType.DELETE_SHELL;
  payload: string;
}
export interface InsertShellAfterAction {
  type: ActionType.INSERT_SHELL_AFTER;
  payload: {
    id: string | null;
    type: ShellType;
  };
}
export interface UpdateShellAction {
  type: ActionType.UPDATE_SHELL;
  payload: {
    id: string;
    content: string;
  };
}
export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    shellId: string;
  };
}
export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    shellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}
export interface FetchShellsAction {
  type: ActionType.FETCH_SHELLS;
}
export interface FetchShellsCompleteAction {
  type: ActionType.FETCH_SHELLS_COMPLETE;
  payload: Shell[];
}
export interface FetchShellsErrorAction {
  type: ActionType.FETCH_SHELLS_ERROR;
  payload: string;
}
export interface SaveShellsErrorAction {
  type: ActionType.SAVE_SHELLS_ERROR;
  payload: string;
}
export type Action =
  | MoveShellAction
  | DeleteShellAction
  | InsertShellAfterAction
  | UpdateShellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchShellsAction
  | FetchShellsCompleteAction
  | FetchShellsErrorAction
  | SaveShellsErrorAction;
