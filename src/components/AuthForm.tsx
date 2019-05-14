import React, { ReactNode } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "../application/theme"

interface AuthFormProps {
  children: ReactNode
}
function AuthForm({ children }: AuthFormProps) {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ height: "100%" }}
    >
      <StyledAuthForm>{children}</StyledAuthForm>
    </KeyboardAwareScrollView>
  )
}

export default AuthForm

const StyledAuthForm = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: ${p => p.theme.paddingXL};
  padding-top: 80px;
  padding-bottom: 80px;
`
