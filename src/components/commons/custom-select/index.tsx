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

const CustomSelect = ({ options, onChange, value }: CustomSelectProps) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [currentOptions, setCurrentOptions] = useState(options);

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
        <Command
          filter={(value, search) => {
            const seek = options.filter((item) => {
              if (item.name.toLowerCase().includes(search)) {
                return item;
              }
            });
            if (seek) {
              setCurrentOptions(seek);
              return 1;
            }
            if (search === ''){
              setCurrentOptions(options)
               return 1}

            return 0;
          }}
        >
          <CommandInput className="w-full" placeholder="" />
          <CommandList>
            <CommandEmpty>Sin resultados.</CommandEmpty>

            {currentOptions.map((item) => (
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
