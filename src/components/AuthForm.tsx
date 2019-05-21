import React, { ReactNode } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "../application/theme"
import Logo from "./Logo"
import Spacer from "./styled/Spacer"

interface AuthFormProps {
  children: ReactNode
}
function AuthForm({ children }: AuthFormProps) {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <StyledAuthForm>
        <Logo />
        <Spacer />
        {children}
      </StyledAuthForm>
    </KeyboardAwareScrollView>
  )
}

export default AuthForm

const StyledAuthForm = styled.View`
  width: 100%;
  /* align-items: center; */
  /* justify-content: center; */
  padding: ${p => p.theme.paddingXL};
  padding-top: 60px;
  padding-bottom: 60px;
`
