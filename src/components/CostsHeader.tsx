import React, { useState } from "react"
import styled from "../application/theme"
import useAppContext from "../lib/hooks/useAppContext"
import Column from "./styled/Column"
import Text from "../components/styled/Text"

interface CostsHeaderProps {
  onSubmit: (search: string) => void
}

function CostsHeader({ onSubmit }: CostsHeaderProps) {
  const { theme } = useAppContext()
  const [search, setSearch] = useState<string>("")
  const [focus, setFocus] = useState<boolean>(false)

  const handleSubmit = () => {
    onSubmit(search)
  }

  const handleClearSearch = () => {
    onSubmit("")
    setSearch("")
  }

  return (
    <StyledCostsHeader>
      <StyledInputWrap style={focus && { ...theme.boxShadow }}>
        <StyledInput
          placeholder="Search costs"
          value={search}
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

const StyledInputWrap = styled.View`
  width: 100%;
  background-color: ${p => p.theme.colorPage};
  border-radius: ${p => p.theme.borderRadius};
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
