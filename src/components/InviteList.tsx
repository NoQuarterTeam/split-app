import React, { memo } from "react"
import { InviteFragment } from "../lib/connector"

import styled from "../application/theme"

import Header from "./styled/Header"
import Spacer from "./styled/Spacer"
import InviteRow from "./InviteRow"
import InviteForm from "./InviteForm"

interface InviteListProps {
  house: { id: string; invites: InviteFragment[] }
}
function InviteList({ house }: InviteListProps) {
  return (
    <StyledInviteList>
      <Header>Invites</Header>
      <InviteForm house={house} />
      <Spacer />
      {house.invites.map(invite => (
        <InviteRow key={invite.id} invite={invite} />
      ))}
    </StyledInviteList>
  )
}

export default memo(InviteList)

const StyledInviteList = styled.View`
  padding: ${p => p.theme.paddingL} 0;
`
