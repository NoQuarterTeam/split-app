import React, { FC } from "react"
import styled from "../../application/theme"

interface CenterProps {
  style?: any
}

const Center: FC<CenterProps> = ({ children, style }) => {
  return <StyledCenter style={style}>{children}</StyledCenter>
}

export default Center

const StyledCenter = styled.View`
  ${p => p.theme.flexCenter};
`
