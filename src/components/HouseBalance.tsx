import React, { memo } from "react"
import { UserFragment } from "../lib/connector"

import styled, { darken } from "../application/theme"
import { round } from "../lib/helpers"
import { useAppState } from "../lib/hooks/useAppContext"
import Text from "../components/styled/Text"

import Avatar from "./Avatar"

interface HouseBalanceProps {
  users: UserFragment[]
}

function HouseBalance({ users }: HouseBalanceProps) {
  const { house } = useAppState()
  const total = users.sumBy("balance", true)

  return (
    <StyledHouseBalance>
      {users.map(user => {
        return (
          <StyledUserGraph key={user.id}>
            <StyledFlame
              negative={user.balance < 0}
              percentage={round(Math.abs(user.balance) / total) * 100}
            />
            <StyledSpacer />
            <Avatar user={user} />
            <StyledUserBalance>
              {user.balance < 0 && "-"} € {round(Math.abs(user.balance * 0.01))}
            </StyledUserBalance>
          </StyledUserGraph>
        )
      })}
      {house && house.invites.length > 0 && (
        <StyledUserGraph>
          <StyledSpacer />
          <StyledPending>Pending invites</StyledPending>
          <StyledSpacer />
        </StyledUserGraph>
      )}
    </StyledHouseBalance>
  )
}

export default memo(HouseBalance)

const StyledHouseBalance = styled.View`
  width: 100%;
  height: 85%;
  position: relative;
  ${p => p.theme.flexAround};
`

const StyledUserGraph = styled.View`
  position: relative;
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledSpacer = styled(Text)`
  height: 30px;
  line-height: 30px;
`

const StyledUserBalance = styled(StyledSpacer)`
  color: ${p => p.theme.colorText};
`

const StyledPending = styled.View`
  border-radius: 50%;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  height: ${0.9 * 80}px;
  width: ${0.9 * 80}px;

  background-color: ${p => p.theme.colorPink};
  color: ${p => darken(0.2, p.theme.colorPink)};
  font-weight: ${p => p.theme.fontBlack};
  font-size: ${p => p.theme.textS};
  ${p => p.theme.flexCenter};
`

const StyledFlame = styled.View<{ percentage: number; negative: boolean }>`
  position: absolute;
  width: 8px;
  border-radius: 8px;
  background-color: ${p =>
    p.negative ? p.theme.colorPink : p.theme.colorBlue};
  height: ${p => p.percentage * 2}px; /* Max 125px as 50% is the max abs */
  ${p => (p.negative ? "top: 140px" : "bottom: 120px")}
`
