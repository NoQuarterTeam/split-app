import React, { FC } from "react"
import { Switch as RNSwitch, Platform } from "react-native"
import { useTheme } from "../lib/hooks/useAppContext"

interface Props {
  onValueChange: () => void
  value: boolean
}

const Switch: FC<Props> = props => {
  const { theme } = useTheme()

  return (
    <RNSwitch
      value={props.value}
      trackColor={{ true: theme.colorPrimary, false: theme.colorLabel }}
      thumbColor={Platform.OS === "android" ? "white" : "default"}
      onValueChange={props.onValueChange}
    />
  )
}

export default Switch
