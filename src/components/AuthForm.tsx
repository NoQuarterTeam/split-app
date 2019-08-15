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
    <StyledWrapper>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <StyledAuthForm>
          <Logo />
          <Spacer />
          {children}
        </StyledAuthForm>
      </KeyboardAwareScrollView>
    </StyledWrapper>
  )
}

export default AuthForm

const StyledWrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.colorPage};
`

const StyledAuthForm = styled.View`
  width: 100%;
  flex: 1;
  padding: 60px ${p => p.theme.paddingXL};
`
