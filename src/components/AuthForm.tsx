import React, { FC } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styled from "../application/theme"
import Logo from "./Logo"
import Spacer from "./styled/Spacer"
import { Platform } from "react-native"

const AuthForm: FC = ({ children }) => {
  return (
    <StyledWrapper>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid
        extraHeight={Platform.OS === "android" ? 200 : 0}
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
