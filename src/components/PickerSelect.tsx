import React, { memo, forwardRef, Ref } from "react"
import { Picker, PickerProps } from "react-native"

import styled, { lighten } from "../application/theme"

interface PickerSelectProps extends PickerProps {
  label?: string
  style?: any
  options: { value: string; label: string }[]
}

function PickerSelect(
  { label, options, style, ...inputProps }: PickerSelectProps,
  ref: Ref<Picker>,
) {
  return (
    <StyledContainer>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      <Picker ref={ref} style={style} {...inputProps}>
        {options.map(option => (
          <Picker.Item
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </Picker>
    </StyledContainer>
  )
}

export default memo(forwardRef(PickerSelect))

const StyledContainer = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingS} 0;
  border-bottom-width: 2px;
  border-color: ${p => lighten(0.25, p.theme.colorPink)};
`

const StyledLabel = styled.Text`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
`
