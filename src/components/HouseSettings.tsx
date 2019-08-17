import React, { memo, useState } from "react"
import { useEditHouse, HouseFragment } from "../lib/graphql"

import styled from "../application/theme"

import Input from "./Input"
import Button from "./Button"
import Text from "./styled/Text"
import Spacer from "./styled/Spacer"
import CurrencyOptions from "./CurrencyOptions"
import Header from "./styled/Header"

interface Props {
  house: HouseFragment
}
function HouseSettings({ house }: Props) {
  const [name, setName] = useState<string>(house.name)
  const [currency, setCurrency] = useState<string>(house.currency || "Euro")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [editHouse] = useEditHouse()

  const handleEditHouse = () => {
    if (!name) return
    setLoading(true)
    editHouse({
      variables: { houseId: house.id, data: { name, currency } },
    })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false)
        setError("Error updating house")
      })
  }

  return (
    <StyledForm>
      <Header>House settings</Header>
      <Input
        value={name}
        onChangeText={setName}
        placeholder="201 Columbusplein"
        label="House name"
      />
      <Spacer />
      <CurrencyOptions value={currency} onChange={setCurrency} />
      <Spacer />
      <Button
        disabled={loading}
        onPress={handleEditHouse}
        loading={loading}
        text="Update house"
      />
      {error ? <StyledError>{error}</StyledError> : null}
    </StyledForm>
  )
}

export default memo(HouseSettings)

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
