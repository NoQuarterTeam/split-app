import React, { FC, memo } from "react"
import { InviteFragment } from "../lib/connector"
import styled from "../application/theme"
import Text from "./styled/Text"
import Button from "./Button"
import { useDestroyInvite } from "../lib/connector"

interface Props {
  invite: InviteFragment
}

const InviteRow: FC<Props> = ({ invite }) => {
  const destroyInvite = useDestroyInvite(invite.id)

  const handleDestroyInvite = () => {
    destroyInvite({
      variables: { inviteId: invite.id },
    })
      .then(async () => {})
      .catch(() => {})
  }

  return (
    <StyledInvite key={invite.id}>
      <Text>{invite.email}</Text>
      <Button
        variant="text"
        color="tertiary"
        onPress={handleDestroyInvite}
        text="Remove"
      />
    </StyledInvite>
  )
}

export default memo(InviteRow)

const StyledInvite = styled.View`
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  background-color: ${p => p.theme.colorBackground};
  border-radius: ${p => p.theme.borderRadius};
  margin-bottom: ${p => p.theme.paddingS};
  ${p => p.theme.flexBetween};
`
