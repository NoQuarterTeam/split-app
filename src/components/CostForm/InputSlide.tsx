import React, { FC } from "react"
import Button from "../Button"
import styled from "../../application/theme"
import Header from "../styled/Header"
import Text from "../styled/Text"

interface InputSlideProps {
  title: string
  onNext?: () => void
  onBack?: () => void
}

const InputSlide: FC<InputSlideProps> = ({
  children,
  title,
  onNext,
  onBack,
}) => {
  return (
    <StyledInputSlide>
      <StyledTitle>{title}</StyledTitle>
      <StyledChildren>{children}</StyledChildren>
      {onNext ? <Button onPress={onNext} text="Next" /> : null}
      {onBack ? (
        <StyledBack onPress={onBack}>
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

const StyledTitle = styled(Header)`
  width: 100%;
  font-size: ${p => p.theme.textXL};
`

const StyledChildren = styled.View``

const StyledBack = styled.TouchableOpacity`
  padding: ${p => p.theme.paddingL};
`

const StyledBackText = styled(Text)`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textM};
`
