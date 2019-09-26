import React, { memo } from "react"
import { InviteFragment } from "../lib/graphql"

import styled from "../application/theme"

import Header from "./styled/Header"
import Spacer from "./styled/Spacer"
import InviteRow from "./InviteRow"
import InviteForm from "./InviteForm"

interface InviteListProps {
  group: { id: string; invites: InviteFragment[] }
}
function InviteList({ group }: InviteListProps) {
  return (
    <StyledInviteList>
      <Header>Invites</Header>
      <InviteForm group={group} />
      <Spacer />
      {group.invites.map(invite => (
        <InviteRow key={invite.id} invite={invite} />
      ))}
    </StyledInviteList>
  )
}

export default memo(InviteList)

const StyledInviteList = styled.View`
  padding: ${p => p.theme.paddingL} 0;
`
