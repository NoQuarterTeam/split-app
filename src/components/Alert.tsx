import React, { memo } from "react"
import styled, { lighten } from "../application/theme"
import Text from "./styled/Text"

interface AlertProps {
  text: string
}
function Alert({ text }: AlertProps) {
  return (
    <StyledAlert>
      <StyledAlertText>{text}</StyledAlertText>
    </StyledAlert>
  )
}
export default memo(Alert)

const StyledAlert = styled.View`
  border-radius: ${p => p.theme.borderRadius};
  text-align: center;
  margin: ${p => p.theme.paddingS};
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL};
  background-color: ${p => lighten(0.25, p.theme.colorPrimary)};
`

const StyledAlertText = styled(Text)`
  font-size: ${p => p.theme.textS};
  color: ${p => p.theme.colorPrimary};
`
