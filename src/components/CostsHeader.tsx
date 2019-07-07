import React, { useState, useEffect } from "react"
import styled, { darken } from "../application/theme"
import { useTheme } from "../lib/hooks/useAppContext"
import Column from "./styled/Column"
import Text from "../components/styled/Text"

interface CostsHeaderProps {
  onSubmit: (search: string) => void
  search: string
}

function CostsHeader({ onSubmit, search }: CostsHeaderProps) {
  const { theme } = useTheme()
  const [inputSearch, setSearch] = useState(search)
  const [focus, setFocus] = useState<boolean>(false)

  useEffect(() => {
    setSearch(search)
  }, [search])

  const handleSubmit = () => onSubmit(inputSearch)

  const handleClearSearch = () => {
    onSubmit("")
    setSearch("")
  }

  return (
    <StyledCostsHeader>
      <StyledInputWrap focused={focus}>
        <StyledInput
          placeholder="Search costs"
          value={inputSearch}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          placeholderTextColor={theme.colorLabel}
          onChangeText={setSearch}
          onSubmitEditing={handleSubmit}
        />
        {!!search && (
          <StyledCancel onPress={handleClearSearch}>
            <StyledCancelText>Cancel</StyledCancelText>
          </StyledCancel>
        )}
      </StyledInputWrap>

      <StyledTableHeader>
        <Column flex={10}>
          <StyledLabel>Name</StyledLabel>
        </Column>
        <Column flex={5}>
          <StyledLabel>Amount</StyledLabel>
        </Column>
        <Column flex={5}>
          <StyledLabel>Payer</StyledLabel>
        </Column>
        <Column flex={4}>
          <StyledLabel>Date</StyledLabel>
        </Column>
      </StyledTableHeader>
    </StyledCostsHeader>
  )
}

export default CostsHeader

const StyledCostsHeader = styled.View`
  padding-bottom: ${p => p.theme.paddingS};
`

const StyledInputWrap = styled.View<{ focused: boolean }>`
  width: 100%;
  background-color: ${p => p.theme.colorBackground};
  border-radius: ${p => p.theme.borderRadius};
  border-width: 2px;
  border-color: ${p =>
    p.focused ? darken(0.05, p.theme.colorBackground) : "white"};
  ${p => p.theme.flexBetween};
`

const StyledInput = styled.TextInput`
  border: 0;
  flex-grow: 1;
  color: ${p => p.theme.colorText};
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textM};
  font-family: "Verdana";
`

const StyledCancel = styled.TouchableOpacity`
  padding: 0 ${p => p.theme.paddingM};
`

const StyledCancelText = styled.Text`
  color: ${p => p.theme.colorLabel};
`

const StyledTableHeader = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingM};
  margin: ${p => p.theme.paddingM} 0;
  ${p => p.theme.flexCenter};
`

const StyledLabel = styled(Text)`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
`
