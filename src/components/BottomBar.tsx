import React from "react"
import styled from "../application/theme"
import { Image, TouchableOpacity } from "react-native"
import { useRoute } from "../lib/hooks/useAppContext"
import Text from "../components/styled/Text"
import NewCost from "../screens/NewCost"

function BottomBar() {
  const { routes, setRoute } = useRoute()
  return (
    <StyledBottomBar>
      <StyledTab>
        <TouchableOpacity
          onPress={() => setRoute({ type: "route", route: "BALANCE" })}
        >
          <StyledTabText active={routes.currentRoute === "BALANCE"}>
            Balance
          </StyledTabText>
        </TouchableOpacity>
      </StyledTab>
      <StyledTab>
        <TouchableOpacity
          onPress={() => setRoute({ type: "route", route: "SETTINGS" })}
        >
          <StyledTabText active={routes.currentRoute === "SETTINGS"}>
            Settings
          </StyledTabText>
        </TouchableOpacity>
      </StyledTab>
      <StyledTab>
        <TouchableOpacity
          onPress={() => setRoute({ type: "route", route: "COSTS" })}
        >
          <StyledTabText active={routes.currentRoute === "COSTS"}>
            Costs
          </StyledTabText>
        </TouchableOpacity>
      </StyledTab>
      <StyledTab>
        <TouchableOpacity
          onPress={() => setRoute({ type: "modal", modal: "NEW_COST" })}
        >
          <Image
            source={require("../assets/images/icon-plus.png")}
            style={{ width: 75, height: 75 }}
          />
        </TouchableOpacity>
      </StyledTab>
      <NewCost modalOpen={routes.modal === "NEW_COST"} />
    </StyledBottomBar>
  )
}

const StyledBottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
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
const StyledTab = styled.View`
  flex: 1;
  ${p => p.theme.flexCenter};
`

const StyledTabText = styled(Text)<{ active: boolean }>`
  color: ${p => (p.active ? p.theme.colorBlue : p.theme.colorText)};
`

export default BottomBar
