import React from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import Page from "../components/Page"
import Button from "../components/Button"
import { useLogout } from "../lib/connector"
import ProfileForm from "../components/ProfileForm"
import { useAppState } from "../lib/hooks/useAppContext"

function Settings() {
  const { user } = useAppState()
  const logout = useLogout()
  const handleLogout = () => logout()
  return (
    <Page title="Settings" white={true}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160 }}
      >
        <ProfileForm user={user} />
        <Button
          variant="text"
          color="tertiary"
          onPress={handleLogout}
          text="Logout"
        />
      </KeyboardAwareScrollView>
    </Page>
  )
}

export default Settings
