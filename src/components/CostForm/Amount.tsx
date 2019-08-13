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
      returnKeyType="done"
      onSubmitEditing={props.onSubmit}
      onChangeText={val => {
        try {
          let amount = val
          if (amount[0] === "€") amount = amount.split("€")[1]
          if (amount.includes(",")) amount = amount.replace(",", ".")
          if (decimalCount(+amount) > 2) return
          props.onChange(amount)
        } catch (error) {
          return
        }
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
