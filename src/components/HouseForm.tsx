import React, { memo, useState } from "react"
import { useCreateHouse } from "../lib/graphql"

import styled from "../application/theme"

import Input from "./Input"
import Button from "./Button"
import Text from "./styled/Text"
import Spacer from "./styled/Spacer"

function HouseForm() {
  const [name, setName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [createHouse] = useCreateHouse()

  const handleCreateHouse = () => {
    setLoading(true)
    createHouse({
      variables: { data: { name } },
    }).catch(() => {
      setLoading(false)
      setError("error creating house")
    })
  }

  return (
    <StyledForm>
      <Input
        value={name}
        onChangeText={setName}
        placeholder="My cool house"
        label="House name"
      />
      <Spacer />
      <Button
        onPress={handleCreateHouse}
        loading={loading}
        text="Create house"
      />
      {error ? <StyledError>{error}</StyledError> : null}
    </StyledForm>
  )
}

export default memo(HouseForm)

const StyledForm = styled.View`
  height: 80%;
  width: 100%;
  margin: 0 auto;
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
