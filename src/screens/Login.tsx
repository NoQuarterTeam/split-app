import React, { useState, useRef } from "react"
import { GraphQLError } from "graphql"
import { TextInput } from "react-native"
import { useLogin } from "../lib/graphql"

import styled from "../application/theme"
import { useRoute } from "../lib/hooks/useAppContext"
import Input from "../components/Input"
import Button from "../components/Button"
import Spacer from "../components/styled/Spacer"
import Text from "../components/styled/Text"
import AuthForm from "../components/AuthForm"

function Login() {
  const { setRoute } = useRoute()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const passwordRef = useRef<TextInput>(null)

  const [login] = useLogin()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    setLoading(true)
    login({
      variables: { data: { email, password } },
    })
      .then(() => {
        setRoute({ type: "route", route: "BALANCE" })
      })
      .catch((loginError: GraphQLError) => {
        console.log(loginError)

        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
  }

  return (
    <AuthForm>
      <Input
        label="Email"
        keyboardType="email-address"
        enablesReturnKeyAutomatically={true}
        blurOnSubmit={false}
        autoCapitalize="none"
        placeholder="jimsebe@gmail.com"
        returnKeyLabel="next"
        returnKeyType="next"
        onSubmitEditing={() =>
          passwordRef.current && passwordRef.current.focus()
        }
        onChangeText={setEmail}
        value={email}
      />
      <Input
        ref={passwordRef}
        label="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        placeholder="********"
        returnKeyLabel="done"
        returnKeyType="done"
        onChangeText={setPassword}
        onSubmitEditing={handleSubmit}
        value={password}
      />
      <Spacer />
      <Button
        loading={loading}
        text="Login"
        full={true}
        onPress={handleSubmit}
        disabled={loading}
      />
      {error ? (
        <StyledError>
          <StyledErrorMessage>{error}</StyledErrorMessage>
        </StyledError>
      ) : null}
      <Spacer />
      <Button
        text="Forgot password?"
        variant="text"
        color="tertiary"
        onPress={() => setRoute({ type: "route", route: "FORGOT_PASSWORD" })}
        disabled={loading}
      />
      <Spacer />

      <Button
        text="Sign up"
        variant="text"
        color="tertiary"
        onPress={() => setRoute({ type: "route", route: "REGISTER" })}
        disabled={loading}
      />
    </AuthForm>
  )
}

export default Login

const StyledError = styled.View`
  opacity: 0.4;
  width: 100%;
  padding: ${p => p.theme.paddingM};
`

const StyledErrorMessage = styled(Text)`
  text-align: right;
`
