import React, { memo, useState } from "react"
import { useEditGroup, GroupFragment } from "../lib/graphql"

import styled from "../application/theme"

import Input from "./Input"
import Button from "./Button"
import Text from "./styled/Text"
import Spacer from "./styled/Spacer"
import CurrencyOptions from "./CurrencyOptions"
import Header from "./styled/Header"

interface Props {
  group: GroupFragment
}
function GroupSettings({ group }: Props) {
  const [name, setName] = useState<string>(group.name)
  const [currency, setCurrency] = useState<string>(group.currency || "Euro")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [editGroup] = useEditGroup()

  const handleEditGroup = () => {
    if (!name) return
    setLoading(true)
    editGroup({
      variables: { groupId: group.id, data: { name, currency } },
    })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false)
        setError("Error updating group")
      })
  }

  return (
    <StyledForm>
      <Header>Group settings</Header>
      <Input
        value={name}
        onChangeText={setName}
        placeholder="201 Columbusplein"
        label="Group name"
      />
      <Spacer />
      <CurrencyOptions value={currency} onChange={setCurrency} />
      <Spacer />
      <Button
        disabled={loading}
        onPress={handleEditGroup}
        loading={loading}
        text="Update group"
      />
      {error ? <StyledError>{error}</StyledError> : null}
    </StyledForm>
  )
}

export default memo(GroupSettings)

const StyledForm = styled.View`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingM};
`

const StyledError = styled(Text)`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
`
