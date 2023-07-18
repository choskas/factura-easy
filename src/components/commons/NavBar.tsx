"use client"
import { Toggle } from "@radix-ui/react-toggle";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


const NavBar = () => {
  const { setTheme, theme } = useTheme();
  const [clientRender, setClientRender] = useState(false)
  const changeTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

    useEffect(() => {
      setClientRender(true)
    }, [])
    if (!clientRender) return
  return (
    <nav className="fixed h-[64px] flex justify-between w-full px-[24px] py-[22px] bg-black dark:bg-black">
      <p className="font-nav-title text-white dark:text-white">Factureasy</p>
      <Toggle onClick={changeTheme}>
        {theme === "light" ? <MoonIcon color="white" /> : <SunIcon />}
      </Toggle>
    </nav>
  );
};

export default NavBar;
