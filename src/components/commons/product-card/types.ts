export interface ProductCardProps {
  productKey: string;
  sku: string;
  price?: number;
  description: string;
  onDelete?: () => void;
  buttonText?: string;
  onClick?: () => void;
  isDisabledButton?: boolean
  customComponent?: React.ReactNode
}
