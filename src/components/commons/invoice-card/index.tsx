import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InvoiceCardProps } from "./types";

const InvoiceCard = ({
  title,
  subtitle,
  description,
  buttonText,
  onClickDetail,
  onClickCancel,
  buttonTextCancel,
}: InvoiceCardProps) => {
  return (
    <Card className="p-[24px] mb-[24px] relative">
      <p className="font-description mb-[8px]">{title}</p>
      <p className="font-caption text-gray-400 mb-[24px]">
        {subtitle} |<span> {description}</span>
      </p>
      <Button className="uppercase w-full mb-[24px]" onClick={() => onClickDetail()}>
        {" "}
        {buttonText}{" "}
      </Button>
      <Button
        variant="outline"
        className="uppercase w-full"
        onClick={() => onClickCancel()}
      >
        {" "}
        {buttonTextCancel}{" "}
      </Button>
    </Card>
  );
};
export default InvoiceCard;
