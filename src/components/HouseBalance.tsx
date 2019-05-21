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
              smallMargin={users.length > 3}
              percentage={
                users.length === 1 || user.balance === 0 || total === 0
                  ? 0
                  : round(Math.abs(user.balance) / total) * 100
              }
            />
            <StyledSpacer />
            <Avatar user={user} size={users.length > 3 ? 50 : 70} />
            <StyledUserBalance>
              {user.balance < 0 && "-"} € {round(Math.abs(user.balance * 0.01))}
            </StyledUserBalance>
          </StyledUserGraph>
        )
      })}
      {house && house.invites.length > 0 && (
        <StyledUserGraph>
          <StyledSpacer />
          <StyledPending>
            <StyledPendingText>Pending invites</StyledPendingText>
          </StyledPending>
          <StyledSpacer />
        </StyledUserGraph>
      )}
    </StyledHouseBalance>
  )
}

export default memo(HouseBalance)

const StyledHouseBalance = styled.View`
  width: 100%;
  height: 80%;
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
  border-radius: 40px;
  height: 80px;
  width: 80px;
  background-color: ${p => p.theme.colorPrimary};
  ${p => p.theme.flexCenter};
`

const StyledPendingText = styled(Text)`
  text-align: center;
  color: ${p => darken(0.2, p.theme.colorPrimary)};
`

const StyledFlame = styled.View<{
  percentage: number
  negative: boolean
  smallMargin: boolean
}>`
  position: absolute;
  width: 8px;
  border-radius: 8px;
  background-color: ${p =>
    p.negative ? p.theme.colorPrimary : p.theme.colorSecondary};
  height: ${p => p.percentage * 2}px; /* Max 125px as 50% is the max abs */
  ${p =>
    p.negative
      ? p.smallMargin
        ? "top: 110px"
        : "top: 130px"
      : p.smallMargin
      ? "bottom: 90px"
      : "bottom: 110px"}
`
