import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { EmptyItemsProps } from "./types"

const EmptyItems = ({title, to, buttonText}: EmptyItemsProps) => {
  const router = useRouter()
    return (
        <>
        <h3 className="font-title text-center mb-[32px]">
          {title}
        </h3>
        <Button
          onClick={() => router.push(to)}
          className="uppercase font-description p-[8px] text-center w-full]"
        >
          <PlusCircle className="mr-[8px]" size={24} /> {buttonText}
        </Button>
      </>
    )
}

export default EmptyItems