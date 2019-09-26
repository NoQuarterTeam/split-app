import React, { FC } from "react"
import styled from "../../application/theme"
import { useTheme } from "../../lib/hooks/useAppContext"

interface Props {
  name: string
  onChange: (name: string) => void
  onSubmit: () => void
}

const Name: FC<Props> = props => {
  const { theme, isDark } = useTheme()
  return (
    <StyledInput
      placeholder="Beers"
      value={props.name}
      autoFocus={true}
      blurOnSubmit={false}
      returnKeyLabel="Next"
      keyboardAppearance={isDark ? "dark" : "light"}
      placeholderTextColor={theme.colorLabel}
      returnKeyType="next"
      onSubmitEditing={props.onSubmit}
      onChangeText={props.onChange}
    />
  )
}

export default Name

const StyledInput = styled.TextInput`
  text-align: center;
  height: 200px;
  font-family: ${p => p.theme.fontFamilyText};
  font-size: ${p => p.theme.textXL};
  color: ${p => p.theme.colorText};
`
