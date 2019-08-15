import React from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { useAppState } from "../lib/hooks/useAppContext"
import Page from "../components/Page"
import Button from "../components/Button"
import { useLogout } from "../lib/graphql"
import ProfileForm from "../components/ProfileForm"
import InviteList from "../components/InviteList"
import Spacer from "../components/styled/Spacer"
import ThemeSwitcher from "../components/ThemeSwitcher"

function Settings() {
  const { user, house } = useAppState()
  const [logout] = useLogout()
  return (
    <Page title="Settings" white={true}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProfileForm user={user} />
        <Spacer />
        <InviteList house={house} />
        <Spacer />
        <ThemeSwitcher />
        <Spacer />
        <Button
          variant="text"
          color="tertiary"
          onPress={logout}
          text="Logout"
        />
      </KeyboardAwareScrollView>
    </Page>
  )
}

export default Settings
