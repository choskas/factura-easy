export type CustomCardProps = {
  title: string;
  description: string | React.ReactNode;
  number: string | number;
  numberDescription: string;
  linkIcon?: React.ReactElement;
  linkDescription: string;
  onClickButton: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  iconButton?: React.ReactElement;
  buttonText: string;
  buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost"
  linkTo: string
  buttonTo: string
};
