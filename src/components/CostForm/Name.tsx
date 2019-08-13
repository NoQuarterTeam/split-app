import React, { FC } from "react"
import styled from "../../application/theme"

interface Props {
  name: string
  onChange: (name: string) => void
  onSubmit: () => void
}

const Name: FC<Props> = props => {
  return (
    <StyledInput
      placeholder="Beers"
      value={props.name}
      autoFocus={true}
      blurOnSubmit={false}
      returnKeyLabel="Next"
      returnKeyType="next"
      onSubmitEditing={props.onSubmit}
      onChangeText={props.onChange}
    />
  )
}

export default Name

const StyledInput = styled.TextInput`
  font-size: ${p => p.theme.textXL};
  text-align: center;
  height: 200px;
  font-family: "Verdana";
`
