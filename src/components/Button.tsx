import React, { memo } from "react"
import styled, { css, ThemeInterface, lighten } from "../application/theme"
import { capitalize } from "../lib/helpers"

export type Color = "primary" | "secondary" | "tertiary"
export type Variant = "block" | "outline" | "text"

interface ButtonProps {
  onPress: () => void
  text: string
  variant?: Variant
  color?: Color
  loading?: boolean
  disabled?: boolean
  full?: boolean
}

function Button({
  variant = "block",
  color = "primary",
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      loading={loading}
      disabled={loading || disabled}
      {...props}
    >
      <StyledText color={color} variant={variant}>
        {loading ? "Loading" : props.text}
      </StyledText>
    </StyledButton>
  )
}

export default memo(Button)

const blockStyles = (color: string) => css`
  background-color: ${p => p.theme["color" + capitalize(color)]};
`

const outlineStyles = (color: string) => css`
  background-color: transparent;
  border: 2px solid ${p => lighten(0.25, p.theme["color" + capitalize(color)])};
`

const textStyles = () => css`
  background-color: transparent;
`

const getVariantStyles = ({
  color = "primary",
  variant = "block",
}: ThemeInterface & ButtonProps) => {
  switch (variant) {
    case "block":
      return blockStyles(color)
    case "outline":
      return outlineStyles(color)
    case "text":
      return textStyles
    default:
      return blockStyles(color)
  }
}

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  border-radius: ${p => p.theme.borderRadius};
  width: ${p => (!p.full ? "auto" : "100%")};
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  padding: ${p => p.theme.paddingM};
  ${p => getVariantStyles({ ...p, ...p.theme })}
`

const StyledText = styled.Text<{ color: Color; variant: Variant }>`
  letter-spacing: 1px;
  text-align: center;
  font-size: ${p => p.theme.textM};
  color: ${p =>
    p.variant === "block" ? "white" : p.theme["color" + capitalize(p.color)]};
`
