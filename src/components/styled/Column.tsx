import React, { FC } from "react"
import styled from "../../application/theme"

interface ColumnProps {
  flex: number
  style?: any
}

const Column: FC<ColumnProps> = ({ children, flex = 1, style }) => {
  return (
    <StyledColumn flex={flex} style={style}>
      {children}
    </StyledColumn>
  )
}

export default Column

const StyledColumn = styled.View<{ flex: number }>`
  flex: ${p => p.flex};
  display: flex;
`
