import React, { FC } from "react"
import styled from "../application/theme"
import { isIphoneX } from "../lib/helpers"

import Header from "./styled/Header"

type PageProps = {
  title?: string
  white?: boolean
}

const Page: FC<PageProps> = ({ children, title, white = false }) => {
  return (
    <StyledPage isWhite={white} isIphoneX={isIphoneX()}>
      {title && <StyledTitle>{title}</StyledTitle>}
      {children}
    </StyledPage>
  )
}

export default Page

const StyledTitle = styled(Header)`
  padding: ${p => p.theme.paddingL} 0;
  font-size: ${p => p.theme.textXL};
`

const StyledPage = styled.View<{ isWhite: boolean; isIphoneX: boolean }>`
  width: 100%;
  min-height: 100%;
  padding: ${p => p.theme.paddingM} ${p => p.theme.paddingL};
  padding-top: ${p => (p.isIphoneX ? p.theme.paddingXL : p.theme.paddingM)};
  padding-bottom: 80px;
  background-color: ${p => p.theme.colorPage};
`
