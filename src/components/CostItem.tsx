import React, { memo } from "react"
import dayjs from "dayjs"
import { CostFragment, PayerFragment } from "../lib/graphql"

import styled from "../application/theme"
import { round, capitalize, getCurrency } from "../lib/helpers"
import Text from "../components/styled/Text"

// import IconRepeat from "../assets/images/icon-repeat.svg"
// import IconClock from "../assets/images/icon-clock.svg"

import Column from "./styled/Column"
import Avatar from "./Avatar"
import { useRoute, useAppState } from "../lib/hooks/useAppContext"

interface CostProps {
  cost: CostFragment & PayerFragment
}

function CostItem({ cost }: CostProps) {
  const { house } = useAppState()
  const { setRoute } = useRoute()

  const handleCostPress = () => {
    setRoute({ type: "modal", modal: "EDIT_COST", data: cost.id })
  }
  return (
    <StyledCost onPress={handleCostPress}>
      <Column flex={10}>
        <StyledCostName>{cost.name}</StyledCostName>
        <StyledCostCategory>{capitalize(cost.category)}</StyledCostCategory>
        {/* {cost.recurring !== "one-off" && (
              <ToolTip>
                Recurring cost
                <StyledInfoIcon src={IconRepeat} width={25} />
              </ToolTip>
            )}
            {dayjs(cost.date).isAfter(dayjs().startOf("day")) && (
              <ToolTip>
                Future cost
                <StyledInfoIcon src={IconClock} width={25} />
              </ToolTip>
            )} */}
      </Column>
      <Column flex={5}>
        <StyledValue>
          {getCurrency(house && house.currency)} {round(cost.amount * 0.01)}
        </StyledValue>
      </Column>
      <Column flex={5}>
        <Avatar user={cost.payer} size={40} />
      </Column>
      <Column flex={4}>
        <StyledValue>{dayjs(cost.date).format("DD MMM")}</StyledValue>
      </Column>
    </StyledCost>
  )
}

export default memo(CostItem)

const StyledCost = styled.TouchableOpacity`
  width: 100%;
  padding-right: 0;
  margin-bottom: ${p => p.theme.paddingM};
  border: 2px solid transparent;
  background-color: ${p => p.theme.colorGrey};
  padding: ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexBetween};
`
const StyledValue = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: ${p => p.theme.textS};
`

// const StyledInfoIcon = styled.img`
//   cursor: pointer;
//   padding-left: ${p => p.theme.paddingS};
//   display: grid;
// `

const StyledCostName = styled(Text)`
  font-size: ${p => p.theme.textS};
`
const StyledCostCategory = styled(Text)`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
`
