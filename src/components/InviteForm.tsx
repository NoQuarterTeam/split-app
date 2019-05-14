import React, { memo, useState } from "react"
import { useCreateInvite, HouseFragment } from "../lib/connector"

import styled from "../application/theme"

import Input from "./Input"
import Button from "./Button"
import Text from "./styled/Text"
import Header from "./styled/Header"
import Spacer from "./styled/Spacer"

interface InviteFormProps {
  house: HouseFragment
}
function InviteForm({ house }: InviteFormProps) {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const createInvite = useCreateInvite()

  const handleCreateInvite = () => {
    setLoading(true)
    createInvite({
      variables: { data: { email, houseId: house.id } },
    }).catch(() => {
      setLoading(false)
      setError("error sending invite")
    })
  }

  return (
    <StyledForm>
      <StyledHeader>Invite someone to join</StyledHeader>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="jimsebe@gmail.com"
        label="House mate"
      />
      <Spacer />
      <Button
        full={true}
        onPress={handleCreateInvite}
        loading={loading}
        text="Send invite"
      />
      {error ? <StyledError>{error}</StyledError> : null}
    </StyledForm>
  )
}

export default memo(InviteForm)

const StyledForm = styled.View`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingM};
`

const StyledHeader = styled(Header)`
  margin-bottom: ${p => p.theme.paddingXL};
`

const StyledError = styled(Text)`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
