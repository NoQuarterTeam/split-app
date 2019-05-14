import React, { memo } from "react"
import SelectInput from "@tele2/react-native-select-input"

import { useTheme } from "../lib/hooks/useAppContext"
import { lighten } from "../application/theme"

interface SelectProps {
  value: string | number
  onChange: (value: string | number) => void
  options: { value: string; label: string }[]
  label?: string
  style?: any
}

function Select(props: SelectProps) {
  const { theme } = useTheme()
  return (
    <SelectInput
      renderArrowIcon={() => null}
      innerContainerStyle={{
        marginBottom: 0,
        paddingVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: lighten(0.25, theme.colorPink),
      }}
      valueContainerStyle={{ paddingVertical: 10 }}
      valueStyle={{
        fontSize: 16,
        fontFamily: "Verdana",
      }}
      labelStyle={{
        color: theme.colorLabel,
        fontSize: 12,
        fontFamily: "Verdana",
      }}
      {...props}
    />
  )
}

export default memo(Select)
