import React, { FC } from "react"
import styled from "../application/theme"

interface Props {
  checked: boolean
  onPress: () => void
}

const Radio: FC<Props> = props => {
  return (
    <StyledRadio onPress={props.onPress}>
      {props.checked ? <StyledOn /> : null}
    </StyledRadio>
  )
}

export default Radio

const StyledRadio = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 14;
  border: 2px solid ${p => p.theme.colorSecondary};
  ${p => p.theme.flexCenter};
`

const StyledOn = styled.View`
  height: 14px;
  width: 14px;
  background-color: ${p => p.theme.colorSecondary};
  border-radius: 10;
`
