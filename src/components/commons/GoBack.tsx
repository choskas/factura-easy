"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBack = ({to}: {to: string}) => {
    const router = useRouter()
    return(
  <div onClick={() => to ? router.push(to) : router.back()} className="my-[14px] flex items-center cursor-pointer">
    <ArrowLeft className="mr-[8px]" size={14} /> Atras
  </div>
)};

export default GoBack;
