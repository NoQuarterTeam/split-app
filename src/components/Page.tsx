import React, { FC } from "react"
import styled from "../application/theme"

import BottomBar from "./BottomBar"

const Page: FC = ({ children }) => {
  return (
    <StyledPage>
      <StyledPageContent>{children}</StyledPageContent>
      <BottomBar />
    </StyledPage>
  )
}

export default Page

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
