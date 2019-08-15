import React, { memo, forwardRef, Ref, useState } from "react"
import { TextInputProps, TextInput } from "react-native"

import styled from "../application/theme"
import { useTheme } from "../lib/hooks/useAppContext"

import Text from "./styled/Text"

interface InputProps extends TextInputProps {
  label?: string
  style?: any
  prefix?: string
}

function Input(
  { label, prefix, style, ...inputProps }: InputProps,
  ref: Ref<TextInput>,
) {
  const { theme, isDark } = useTheme()
  const [focused, setFocused] = useState(false)
  return (
    <StyledContainer focused={focused}>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      {prefix ? <StyledPrefix style={style}>{prefix}</StyledPrefix> : null}
      <StyledInput
        ref={ref}
        hasPrefix={!!prefix}
        placeholderTextColor={theme.colorLabel}
        style={style}
        keyboardAppearance={isDark ? "dark" : "light"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...inputProps}
      />
    </StyledContainer>
  )
}

export default memo(forwardRef(Input))

const StyledContainer = styled.View<{ focused: boolean }>`
  width: 100%;
  position: relative;
  padding: ${p => p.theme.paddingS} 0;
`

const StyledLabel = styled(Text)`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingS};
`

const StyledInput = styled.TextInput<{ hasPrefix?: boolean }>`
  border: 0;
  width: 100%;
  background-color: ${p => p.theme.colorGrey};
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL};
  ${p => p.hasPrefix && "padding-left: 16px"};
  font-family: "Verdana";
`

const StyledPrefix = styled(Text)`
  position: absolute;
  left: 0;
  top: 31px;
  color: ${p => p.theme.colorLabel};
`
