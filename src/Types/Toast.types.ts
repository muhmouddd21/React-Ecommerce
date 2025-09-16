export type TToast = {
  id?: string;
  type: "primary" | "success" | "warning" | "danger";
  title?: string | null;
  message: string;
  delayApperance?: boolean;
};