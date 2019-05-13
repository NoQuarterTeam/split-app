import React, { FC } from "react"
import styled from "../application/theme"

import BottomBar from "./BottomBar"
import Header from "./styled/Header"

type PageProps = {
  title?: string
}

const Page: FC<PageProps> = ({ children, title }) => {
  return (
    <StyledPage>
      <StyledPageContent>
        {title && <StyledTitle>{title}</StyledTitle>}
        {children}
      </StyledPageContent>
      <BottomBar />
    </StyledPage>
  )
}

export default Page

const StyledTitle = styled(Header)`
  padding: ${p => p.theme.paddingL} 0;
  font-size: ${p => p.theme.textXL};
`

const StyledPage = styled.View`
  padding-left: 0;
  display: flex;
  width: 100%;
  height: 100%;
`

const StyledPageContent = styled.View`
  width: 100%;
  min-height: 100%;
  padding: ${p => p.theme.paddingL};
  padding-bottom: 140px;
  background-color: ${p => p.theme.colorBackground};
`
