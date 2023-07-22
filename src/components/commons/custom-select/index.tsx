import { TAX_REGIME } from "@/lib/constants/catalogs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CustomSelectProps } from "./types";

const CustomSelect = ( {options, onChange, value }: CustomSelectProps) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <Input

          value={
            value ? options.find((item) => item.value === value)?.name : ""
          }
        />
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput className="w-full" placeholder="Clave" />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>

            {options.map((item) => (
              <CommandItem
                key={item.name}
                onSelect={(currentValue) => {
                  setIsOpenPopover(false);
                  onChange(currentValue);
                }}
                value={item.value as string}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomSelect;
