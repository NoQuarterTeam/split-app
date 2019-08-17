import React, { FC } from "react"
import styled from "../application/theme"
import currencies from "../lib/data/currencies"

interface Props {
  value: string
  onChange: (currency: string) => void
}

const CurrencyOptions: FC<Props> = props => {
  return (
    <StyledWrapper>
      <StyledLabel>Currency</StyledLabel>
      {Object.entries(currencies).map(([name, symbol]) => {
        return (
          <StyledSymbol
            key={name}
            activeOpacity={0.8}
            onPress={() => props.onChange(name)}
            active={props.value === name}
          >
            <StyledText>
              {symbol} - {name}
            </StyledText>
          </StyledSymbol>
        )
      })}
    </StyledWrapper>
  )
}

export default CurrencyOptions

const StyledWrapper = styled.View``

const StyledLabel = styled.Text`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
  margin-bottom: ${p => p.theme.paddingM};
`

const StyledSymbol = styled.TouchableOpacity<{ active: boolean }>`
  padding: ${p => p.theme.paddingM};
  border: 2px solid ${p => (p.active ? p.theme.colorLabel : "transparent")};
  border-radius: ${p => p.theme.borderRadius};
`

const StyledText = styled.Text`
  color: ${p => p.theme.colorText};
`
