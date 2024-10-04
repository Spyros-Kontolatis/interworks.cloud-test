export interface ButtonProps {
  color: "primary" | "secondary";
  outline?: boolean;
  rounded?: boolean;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
}
