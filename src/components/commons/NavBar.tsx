"use client";
import { Toggle } from "@radix-ui/react-toggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PersonIcon } from "@radix-ui/react-icons";
import { Card } from "../ui/card";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const session = useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [clientRender, setClientRender] = useState(false);
  const changeTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  useEffect(() => {
    setClientRender(true);
  }, []);
  if (!clientRender) return;
  return (
    <nav className="fixed h-[64px] flex justify-between w-full px-[24px] py-[22px] bg-black dark:bg-black">
      <p
        onClick={() => router.push("/")}
        className="font-nav-title text-white dark:text-white"
      >
        Factureasy
      </p>
      <div className="flex">
        <Toggle onClick={changeTheme}>
          {theme === "light" ? <MoonIcon color="white" /> : <SunIcon />}
        </Toggle>
        {session.data && (
          <Popover>
            <PopoverTrigger asChild className="ml-[12px]">
              <PersonIcon className="cursor-pointer" color="white" width={24} height={24} />
            </PopoverTrigger>
            <PopoverContent className="w-[120px]">
            
                <p onClick={() => signOut()} className="font-caption cursor-pointer">
                  Cerrar sesión
                </p>
      
            </PopoverContent>
          </Popover>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
