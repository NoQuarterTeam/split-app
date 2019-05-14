import React, { useState, useRef } from "react"
import { GraphQLError } from "graphql"
import { TextInput } from "react-native"
import { useRegister } from "../lib/connector"

import styled from "../application/theme"
import { useRoute } from "../lib/hooks/useAppContext"
import Input from "../components/Input"
import Button from "../components/Button"
import Spacer from "../components/styled/Spacer"
import Logo from "../components/Logo"
import AuthForm from "../components/AuthForm"

function Register() {
  const { setRoute } = useRoute()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const passwordRef = useRef<TextInput>(null)
  const firstNameRef = useRef<TextInput>(null)
  const lastNameRef = useRef<TextInput>(null)

  const register = useRegister()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    setLoading(true)
    if (!email || !password || !firstName || !lastName) return
    register({
      variables: { data: { email, password, firstName, lastName } },
    })
      .then(() => {
        setRoute({ type: "route", route: "BALANCE" })
      })
      .catch((error: GraphQLError) => {
        setLoading(false)
        setError(error.message.split(":")[1])
      })
  }

  return (
    <AuthForm>
      <Logo />
      <Spacer />
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
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Spacer />
      <Input
        ref={passwordRef}
        label="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        placeholder="********"
        returnKeyLabel="next"
        returnKeyType="next"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={() =>
          firstNameRef.current && firstNameRef.current.focus()
        }
      />
      <Spacer />
      <Input
        ref={firstNameRef}
        label="First name"
        placeholder="Jim"
        returnKeyLabel="next"
        returnKeyType="next"
        value={firstName}
        onChangeText={setFirstName}
        onSubmitEditing={() =>
          lastNameRef.current && lastNameRef.current.focus()
        }
      />
      <Spacer />
      <Input
        ref={lastNameRef}
        label="Last name"
        secureTextEntry={true}
        placeholder="Sebe"
        returnKeyLabel="done"
        returnKeyType="done"
        value={lastName}
        onChangeText={setLastName}
        onSubmitEditing={handleSubmit}
      />
      <Spacer />
      <Button
        loading={loading}
        text="Register"
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
        full={true}
        text="Login"
        variant="tertiary"
        color="text"
        onPress={() => setRoute({ type: "route", route: "LOGIN" })}
        disabled={loading}
      />
    </AuthForm>
  )
}

export default Register

const StyledError = styled.View`
  opacity: 0.4;
  width: 100%;
  padding: ${p => p.theme.paddingM};
`

const StyledErrorMessage = styled.Text`
  font-size: ${p => p.theme.textS};
  text-align: right;
  color: ${p => p.theme.colorText};
`
