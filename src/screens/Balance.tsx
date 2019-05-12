import React, { FC, Fragment } from "react"
import { Text } from "react-native"

import styled from "../application/theme"
import useAppContext from "../lib/hooks/useAppContext"
import { round } from "../lib/helpers"

import Page from "../components/Page"
import HouseName from "../components/HouseName"
import HouseBalance from "../components/HouseBalance"

const Balance: FC = () => {
  const { user, house } = useAppContext()
  if (!house) return <Text>Create House Form</Text>

  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01)}`
    } else {
      return `You owe €${Math.abs(round(user.balance * 0.01))}`
    }
  }
  return (
    <Page>
      {house.invites.length === 0 && house.users.length === 1 ? (
        <Text>Invite Form</Text>
      ) : (
        <Fragment>
          <StyledHeader>
            <HouseName house={house} />
            <HouseSummary>{getBalanceHeader()}</HouseSummary>
          </StyledHeader>
          <HouseBalance users={house.users} />
        </Fragment>
      )}
    </Page>
  )
}

export default Balance

const StyledHeader = styled.View`
  width: 100%;
  display: flex;
  padding: ${p => p.theme.paddingL};
  margin-top: ${p => p.theme.paddingM};
`

const HouseSummary = styled.Text`
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} 0;
  color: ${p => p.theme.colorLabel};
`
