import React, { FC } from "react"

import { useTheme } from "../lib/hooks/useAppContext"
import styled from "../application/theme"
import Header from "./styled/Header"
import Switch from "./Switch"

const ThemeSwitcher: FC = () => {
  const { isDark, toggleTheme } = useTheme()
  return (
    <StyledWrapper>
      <StyledTitle>Dark mode</StyledTitle>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </StyledWrapper>
  )
}

export default ThemeSwitcher

const StyledWrapper = styled.View`
  width: 100%;
`

const StyledTitle = styled(Header)`
  margin-bottom: ${p => p.theme.paddingM};
`
