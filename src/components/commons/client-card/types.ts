export interface CustomCardStyledProps {
  title?: string;
  subtitle?: string;
  description?: string;
  onDelete?: () => void;
  buttonText: string
  onClick: () => void;
}
