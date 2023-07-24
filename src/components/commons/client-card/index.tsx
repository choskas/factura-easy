import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash } from "lucide-react"
import { CustomCardStyledProps } from "./types"

const CustomerCard = ({title, subtitle, description, onDelete, buttonText, onClick}: CustomCardStyledProps) => {
    return (
<Card className="p-[24px] mb-[24px] relative">
    {onDelete && (
   <Trash onClick={() => onDelete()} size={18} className="text-red-400 absolute right-[24px] top-[24px]" />
    )}
       
          <p className="font-description mb-[8px]">{title}</p>
          <p className="font-caption text-gray-400 mb-[24px]">{subtitle} |<span> {description}</span></p>
          <Button variant="outline" className="uppercase w-full" onClick={() => onClick()}>  {buttonText} </Button>
        </Card>
    )
}
export default CustomerCard