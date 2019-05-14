import React from "react"
import styled from "../application/theme"
import Page from "../components/Page"
import Text from "../components/styled/Text"
import Button from "../components/Button"
import { useLogout } from "../lib/connector"

function Settings() {
  const logout = useLogout()
  const handleLogout = () => logout()
  return (
    <Page title="Settings">
      <StyledText>Hey there</StyledText>
      <Button onPress={handleLogout} text="Logout" />
    </Page>
  )
}

export default Settings

const StyledText = styled(Text)``
