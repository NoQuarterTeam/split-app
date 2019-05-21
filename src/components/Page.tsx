import React, { FC } from "react"
import styled from "../application/theme"

import Header from "./styled/Header"

type PageProps = {
  title?: string
  white?: boolean
}

const Page: FC<PageProps> = ({ children, title, white = false }) => {
  return (
    <StyledPage>
      <StyledPageContent isWhite={white}>
        {title && <StyledTitle>{title}</StyledTitle>}
        {children}
      </StyledPageContent>
    </StyledPage>
  )
}

export default Page

const StyledTitle = styled(Header)`
  padding: ${p => p.theme.paddingL} 0;
  font-size: ${p => p.theme.textXL};
`

const StyledPage = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
`

const StyledPageContent = styled.View<{ isWhite: boolean }>`
  width: 100%;
  min-height: 100%;
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL};
  padding-bottom: 80px;
  background-color: white;
`
