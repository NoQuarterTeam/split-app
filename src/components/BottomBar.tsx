import React from "react"
import { BlurView } from "expo-blur"
import styled from "../application/theme"
import { Image, Platform, View } from "react-native"
import { useRoute, useAppState, useTheme } from "../lib/hooks/useAppContext"
import Text from "../components/styled/Text"
import NewCost from "../screens/NewCost"
import { isIphoneX } from "../lib/helpers"
import { transparentize } from "polished"

function BottomBar() {
  const { routes, setRoute } = useRoute()
  const { isDark } = useTheme()
  const { house } = useAppState()

  const activeRoute = routes.currentRoute

  const balanceImagePath =
    activeRoute !== "BALANCE"
      ? require("../assets/images/icon-balance.png")
      : isDark
      ? require("../assets/images/icon-balance-light.png")
      : require("../assets/images/icon-balance-dark.png")

  const costsImagePath =
    activeRoute !== "COSTS"
      ? require("../assets/images/icon-costs.png")
      : isDark
      ? require("../assets/images/icon-costs-light.png")
      : require("../assets/images/icon-costs-dark.png")

  const settingsImagePath =
    activeRoute !== "SETTINGS"
      ? require("../assets/images/icon-settings.png")
      : isDark
      ? require("../assets/images/icon-settings-light.png")
      : require("../assets/images/icon-settings-dark.png")
  return (
    <StyledBottomBar
      isIphoneX={isIphoneX()}
      tint={isDark ? "dark" : "default"}
      isDark={isDark}
      intensity={100}
    >
      <StyledTab
        activeOpacity={0.8}
        onPress={() => setRoute({ type: "route", route: "BALANCE" })}
      >
        <Image source={balanceImagePath} style={{ width: 30, height: 30 }} />
        <StyledTabText active={activeRoute === "BALANCE"}>
          Balance
        </StyledTabText>
      </StyledTab>
      {house && (
        <StyledTab
          activeOpacity={0.8}
          onPress={() => setRoute({ type: "route", route: "COSTS" })}
        >
          <Image source={costsImagePath} style={{ width: 30, height: 30 }} />
          <StyledTabText active={activeRoute === "COSTS"}>Costs</StyledTabText>
        </StyledTab>
      )}
      <StyledTab
        activeOpacity={0.8}
        onPress={() => setRoute({ type: "route", route: "SETTINGS" })}
      >
        <Image source={settingsImagePath} style={{ width: 30, height: 30 }} />
        <StyledTabText active={activeRoute === "SETTINGS"}>
          Settings
        </StyledTabText>
      </StyledTab>
      {house && (
        <StyledTab
          activeOpacity={0.8}
          onPress={() => setRoute({ type: "modal", modal: "NEW_COST" })}
        >
          <Image
            source={require("../assets/images/icon-plus.png")}
            style={{ width: 70, height: 70 }}
          />
        </StyledTab>
      )}
      {house && <NewCost modalOpen={routes.modal === "NEW_COST"} />}
    </StyledBottomBar>
  )
}

const StyledBottomBar = styled(Platform.OS === "android" ? View : BlurView)<{
  isIphoneX: boolean
  isDark: boolean
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  flex-direction: row;
  background-color: ${p =>
    Platform.OS === "android"
      ? transparentize(0.1, p.theme.colorPage)
      : "white"};
  ${p => p.theme.flexAround};

  padding-bottom: ${p => (p.isIphoneX ? p.theme.paddingL : 0)};
`

const StyledTab = styled.TouchableOpacity`
  flex: 1;
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledTabText = styled(Text)<{ active: boolean }>`
  color: ${p => (p.active ? p.theme.colorText : p.theme.colorTertiary)};
`

export default BottomBar
