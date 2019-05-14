import React from "react"
import styled from "../application/theme"
import { Image } from "react-native"
import { useRoute, useAppState } from "../lib/hooks/useAppContext"
import Text from "../components/styled/Text"
import NewCost from "../screens/NewCost"

function BottomBar() {
  const { routes, setRoute } = useRoute()
  const { house } = useAppState()
  return (
    <StyledBottomBar>
      <StyledTab onPress={() => setRoute({ type: "route", route: "BALANCE" })}>
        <Image
          source={require("../assets/images/icon-balance.png")}
          style={{ width: 30, height: 30 }}
        />
        <StyledTabText active={routes.currentRoute === "BALANCE"}>
          Balance
        </StyledTabText>
      </StyledTab>
      {house && (
        <StyledTab onPress={() => setRoute({ type: "route", route: "COSTS" })}>
          <Image
            source={require("../assets/images/icon-costs.png")}
            style={{ width: 30, height: 30 }}
          />
          <StyledTabText active={routes.currentRoute === "COSTS"}>
            Costs
          </StyledTabText>
        </StyledTab>
      )}
      <StyledTab onPress={() => setRoute({ type: "route", route: "SETTINGS" })}>
        <Image
          source={require("../assets/images/icon-settings.png")}
          style={{ width: 30, height: 30 }}
        />
        <StyledTabText active={routes.currentRoute === "SETTINGS"}>
          Settings
        </StyledTabText>
      </StyledTab>
      {house && (
        <StyledTab
          onPress={() => setRoute({ type: "modal", modal: "NEW_COST" })}
        >
          <Image
            source={require("../assets/images/icon-plus.png")}
            style={{ width: 75, height: 75 }}
          />
        </StyledTab>
      )}
      {house && <NewCost modalOpen={routes.modal === "NEW_COST"} />}
    </StyledBottomBar>
  )
}

const StyledBottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  flex-direction: row;
  background-color: ${p => p.theme.colorBackground};
  ${p => p.theme.flexAround};
`

// const StyledMainButton = styled.View`
//   position: absolute;
//   bottom: 40px;
//   width: 100%;
//   ${p => p.theme.flexCenter};
// `
const StyledTab = styled.TouchableOpacity`
  flex: 1;
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledTabText = styled(Text)<{ active: boolean }>`
  color: ${p => (p.active ? p.theme.colorText : p.theme.colorLabel)};
`

export default BottomBar
