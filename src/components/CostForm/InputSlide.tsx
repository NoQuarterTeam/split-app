import React, { FC } from "react"
import { TouchableOpacity } from "react-native"
import Button from "../Button"
import styled from "../../application/theme"
import Header from "../styled/Header"
import Text from "../styled/Text"

interface InputSlideProps {
  title: string
  onCancel: () => void
  onNext?: () => void
  onBack?: () => void
  disabled?: boolean
}

const InputSlide: FC<InputSlideProps> = props => {
  return (
    <StyledInputSlide>
      <StyledHeader>
        <StyledTitle>{props.title}</StyledTitle>
        <TouchableOpacity onPress={props.onCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </StyledHeader>
      <StyledChildren>{props.children}</StyledChildren>
      {props.onNext ? (
        <Button onPress={props.onNext} text="Next" disabled={props.disabled} />
      ) : null}
      {props.onBack ? (
        <StyledBack onPress={props.onBack}>
          <StyledBackText>Back</StyledBackText>
        </StyledBack>
      ) : null}
    </StyledInputSlide>
  )
}

export default InputSlide

const StyledInputSlide = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${p => p.theme.colorBackground};
  flex-direction: column;
  padding: ${p => p.theme.paddingXL} ${p => p.theme.paddingL};
`

const StyledHeader = styled.View`
  ${p => p.theme.flexBetween};
`
const StyledTitle = styled(Header)`
  font-size: ${p => p.theme.textXL};
`

const StyledChildren = styled.View``

const StyledBack = styled.TouchableOpacity`
  width: 50%;
  margin-top: ${p => p.theme.paddingL};
  padding: ${p => p.theme.paddingS};
`

const StyledBackText = styled(Text)`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textM};
`
