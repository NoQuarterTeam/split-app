import React, { FC } from "react"
import { Switch } from "react-native"
import { useTheme } from "../lib/hooks/useAppContext"
import styled from "../application/theme"
import Header from "./styled/Header"

const ThemeSwitcher: FC = () => {
  const { theme, isDark, toggleTheme } = useTheme()
  return (
    <StyledWrapper>
      <StyledTitle>Dark mode</StyledTitle>
      <Switch
        trackColor={{ true: theme.colorPrimary, false: theme.colorGrey }}
        value={isDark}
        onValueChange={toggleTheme}
      />
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
