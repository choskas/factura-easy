import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomCardProps } from "./types";
import Link from "next/link";

const CustomCard = ({
  title,
  description,
  number,
  numberDescription,
  linkIcon,
  linkDescription,
  onClickButton,
  iconButton,
  buttonText,
  buttonVariant,
  linkTo,
  buttonTo
}: CustomCardProps) => {
  return (
    <Card className="p-[24px]">
      <p className="font-subtitle mb-[8px] font-bold">{title}</p>
      <p className="font-description">{description}</p>
      <div className="my-[24px] flex flex-col items-center">
        <p className="font-title text-[#077DBF]">{number}</p>
        <p className="font-subtitle">{numberDescription}</p>
      </div>
      <Link href={linkTo}>
      <div className="flex justify-end items-center cursor-pointer mb-[24px]">
        {linkIcon}
        <p className="font-description text-[#077DBF]">{linkDescription}</p>
      </div>
      </Link>
      <Link href={buttonTo}>
      <Button
        onClick={onClickButton}
        variant={buttonVariant ? buttonVariant : "default" }
        className="uppercase font-description p-[8px] text-center w-full"
      >
        {iconButton} {buttonText}
      </Button>
      </Link>
    </Card>
  );
};

export default CustomCard;
