import React, { FC } from "react"
import styled from "../../application/theme"
import { decimalCount } from "../../lib/helpers"

interface Props {
  amount: number
  onChange: (amount: string) => void
  onSubmit: () => void
}

const Amount: FC<Props> = props => {
  return (
    <StyledInput
      placeholder="€15.45"
      keyboardType="numeric"
      blurOnSubmit={false}
      autoFocus={true}
      value={props.amount ? `€${props.amount.toString()}` : ""}
      returnKeyLabel="Next"
      returnKeyType="next"
      onChangeText={val => {
        let amount = val
        if (amount[0] === "€") amount = val.split("€")[1]
        if (decimalCount(+amount) > 2) return
        props.onChange(amount)
      }}
    />
  )
}

export default Amount

const StyledInput = styled.TextInput`
  font-size: ${p => p.theme.textXL};
  text-align: center;
  height: 200px;
  font-family: "Verdana";
`
