import React, { useState, Fragment } from "react"
import { GraphQLError } from "graphql"

import { useForgotPassword } from "../lib/connector"

import { useRoute } from "../lib/hooks/useAppContext"
import Input from "../components/Input"
import Button from "../components/Button"
import AuthForm from "../components/AuthForm"
import styled from "../application/theme"
import Text from "../components/styled/Text"
import Spacer from "../components/styled/Spacer"

function ForgotPassword() {
  const { setRoute } = useRoute()
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const forgotPassword = useForgotPassword()

  const handleSubmit = () => {
    setLoading(true)
    forgotPassword({
      variables: { email },
    })
      .then(() => {
        setLoading(false)
        setSuccess(true)
      })
      .catch((loginError: GraphQLError) => {
        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
  }
  return (
    <AuthForm>
      {success ? (
        <Fragment>
          <StyledText>We've sent you a link by email!</StyledText>
          <Spacer />
          <Button
            onPress={() => setRoute({ type: "route", route: "LOGIN" })}
            text="Login"
          />
        </Fragment>
      ) : (
        <Fragment>
          <StyledText>
            What is your email? We'll send you a link to reset your password
          </StyledText>
          <Spacer />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="jim@gmail.com"
          />
          <Spacer />
          <Button
            onPress={handleSubmit}
            loading={loading}
            full={true}
            text="Send reset link"
          />
          {error ? <StyledError>{error}</StyledError> : null}
          <Spacer />
          <Button
            variant="text"
            color="tertiary"
            full={true}
            onPress={() => setRoute({ type: "route", route: "LOGIN" })}
            text="Login"
          />
        </Fragment>
      )}
    </AuthForm>
  )
}

export default ForgotPassword

const StyledText = styled(Text)``

const StyledError = styled(Text)`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
`
