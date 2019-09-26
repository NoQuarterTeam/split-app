import React from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Platform } from "react-native"

import { useAppState } from "../lib/hooks/useAppContext"
import Page from "../components/Page"
import Button from "../components/Button"
import { useLogout } from "../lib/graphql"
import ProfileForm from "../components/ProfileForm"
import InviteList from "../components/InviteList"
import Spacer from "../components/styled/Spacer"
import ThemeSwitcher from "../components/ThemeSwitcher"
import HouseSettings from "../components/HouseSettings"

function Settings() {
  const { user, house } = useAppState()
  const [logout] = useLogout()
  return (
    <Page title="Settings" white={true}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraHeight={Platform.OS === "android" ? 200 : 50}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProfileForm user={user} />
        <Spacer />
        <HouseSettings house={house} />
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
