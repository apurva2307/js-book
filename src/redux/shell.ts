export type ShellType = "code" | "text";
export interface Shell {
  id: string;
  type: ShellType;
  content: string;
}
