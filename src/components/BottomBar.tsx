import React from "react"
import styled from "../application/theme"
import { Image, TouchableOpacity } from "react-native"
import useAppContext from "../lib/hooks/useAppContext"

function BottomBar() {
  const { route, setRoute } = useAppContext()
  return (
    <StyledBottomBar>
      <StyledTab>
        <TouchableOpacity onPress={() => setRoute("BALANCE")}>
          <StyledTabText active={route === "BALANCE"}>Balance</StyledTabText>
        </TouchableOpacity>
      </StyledTab>
      <StyledTab>
        <TouchableOpacity onPress={() => setRoute("NEW_COST")}>
          <Image
            source={require("../assets/images/icon-plus.png")}
            style={{ width: 75, height: 75 }}
          />
        </TouchableOpacity>
      </StyledTab>
      <StyledTab>
        <TouchableOpacity onPress={() => setRoute("COSTS")}>
          <StyledTabText active={route === "COSTS"}>Costs</StyledTabText>
        </TouchableOpacity>
      </StyledTab>
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

const StyledTab = styled.View`
  flex: 1;
  ${p => p.theme.flexCenter};
`

const StyledTabText = styled.Text<{ active: boolean }>`
  color: ${p => (p.active ? p.theme.colorBlue : p.theme.colorText)};
`

export default BottomBar
