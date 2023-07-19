import { ControllerRenderProps } from "react-hook-form"

export type CustomSelectProps = {options: {name: string, value: string | number}[]
onChange: (currentValue: string) => void
value: string | number
}