import React, { FC, Fragment } from "react"
import { ScrollView, RefreshControl } from "react-native"

import styled from "../application/theme"
import { useAppState } from "../lib/hooks/useAppContext"
import { round, getCurrency } from "../lib/helpers"

import Text from "../components/styled/Text"
import Page from "../components/Page"
import GroupName from "../components/GroupName"
import GroupBalance from "../components/GroupBalance"
import InviteForm from "../components/InviteForm"
import Header from "../components/styled/Header"
import Spacer from "../components/styled/Spacer"

const Balance: FC = () => {
  const { user, group, refetch } = useAppState()
  if (!group) return null

  const handleRefetchBalance = () => refetch()
  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed ${getCurrency(group && group.currency)}${round(
        user.balance * 0.01,
      )}`
    } else {
      return `You owe ${getCurrency(group && group.currency)}${Math.abs(
        round(user.balance * 0.01),
      )}`
    }
  }
  return (
    <Page>
      {group.invites.length === 0 && group.users.length === 1 ? (
        <StyledInviteWrap>
          <Header>Now invite a group mate</Header>
          <Spacer />
          <InviteForm group={group} />
        </StyledInviteWrap>
      ) : (
        <Fragment>
          <StyledHeader>
            <GroupName group={group} />
            <GroupSummary>{getBalanceHeader()}</GroupSummary>
          </StyledHeader>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={handleRefetchBalance}
              />
            }
            contentContainerStyle={{ height: "100%" }}
          >
            <GroupBalance users={group.users} />
          </ScrollView>
        </Fragment>
      )}
    </Page>
  )
}

export default Balance

const StyledHeader = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
`

const GroupSummary = styled(Text)`
  font-size: ${p => p.theme.textM};
  padding-top: ${p => p.theme.paddingM};
  color: ${p => p.theme.colorLabel};
`

const StyledInviteWrap = styled.View`
  height: 80%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingM};
`
