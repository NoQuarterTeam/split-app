import React, { memo, useState } from "react"
import { useCreateInvite } from "../lib/graphql"

import styled from "../application/theme"

import Input from "./Input"
import Button from "./Button"
import Text from "./styled/Text"
import Spacer from "./styled/Spacer"

interface InviteFormProps {
  group: {
    id: string
  }
}
function InviteForm({ group }: InviteFormProps) {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [createInvite] = useCreateInvite()

  const handleCreateInvite = () => {
    setLoading(true)
    createInvite({
      variables: { data: { email, groupId: group.id } },
    })
      .then(async () => {
        setLoading(false)
        setError("")
        setEmail("")
      })
      .catch(() => {
        setLoading(false)
        setError("error sending invite")
      })
  }

  return (
    <StyledForm>
      <Input
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholder="jimsebe@gmail.com"
        onSubmitEditing={handleCreateInvite}
        returnKeyLabel="done"
        returnKeyType="send"
      />
      <Spacer style={{ marginBottom: 20 }} />
      <Button
        onPress={handleCreateInvite}
        loading={loading}
        disabled={!email}
        text="Send invite"
      />
      {error ? <StyledError>{error}</StyledError> : null}
    </StyledForm>
  )
}

export default memo(InviteForm)

const StyledForm = styled.View`
  width: 100%;
`

const StyledError = styled(Text)`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
