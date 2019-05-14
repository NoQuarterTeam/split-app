import React from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import Page from "../components/Page"
import Button from "../components/Button"
import { useLogout } from "../lib/connector"
import ProfileForm from "../components/ProfileForm"
import { useAppState } from "../lib/hooks/useAppContext"
import Spacer from "../components/styled/Spacer"

function Settings() {
  const { user } = useAppState()
  const logout = useLogout()
  const handleLogout = () => logout()
  return (
    <Page title="Settings">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <ProfileForm user={user} />
        <Spacer />
        <Button
          color="text"
          variant="tertiary"
          onPress={handleLogout}
          text="Logout"
        />
      </KeyboardAwareScrollView>
    </Page>
  )
}

export default Settings
