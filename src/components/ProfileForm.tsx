import React, { memo } from "react"
import { useUpdateUser, UserFragment } from "../lib/connector"

import styled from "../application/theme"

import Input from "./Input"
import Button from "./Button"
import Avatar from "./Avatar"
import Text from "./styled/Text"
import Spacer from "./styled/Spacer"
import useForm from "../lib/hooks/useForm"

interface ProfileFormProps {
  user: UserFragment
}

function ProfileForm({ user }: ProfileFormProps) {
  const [form, dispatch] = useForm({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
  })
  const updateUser = useUpdateUser()

  const handleUpdateUser = () => {
    const data: { [key: string]: string } = {}
    if (form.values.email) data.email = form.values.email
    if (form.values.firstName) data.firstName = form.values.firstName
    if (form.values.lastName) data.lastName = form.values.lastName
    if (form.values.password) data.password = form.values.password

    dispatch({ type: "loading" })
    updateUser({ variables: { data } })
      .then(() => {
        dispatch({ type: "finished" })
      })
      .catch(updateError => {
        dispatch({ type: "error", error: updateError.message.split(":")[1] })
      })
  }

  return (
    <StyledProfileForm>
      <Avatar user={user} />
      <Input
        value={form.values.email}
        onChangeText={email => dispatch({ type: "update", field: { email } })}
        placeholder="jim@noquarter.co"
        label="Email"
      />
      <Input
        value={form.values.firstName}
        onChangeText={firstName =>
          dispatch({ type: "update", field: { firstName } })
        }
        placeholder="jim"
        label="First name"
      />
      <Input
        value={form.values.lastName}
        onChangeText={lastName =>
          dispatch({ type: "update", field: { lastName } })
        }
        placeholder="sebe"
        label="Last name"
      />
      <Input
        secureTextEntry={true}
        value={form.values.password}
        onChangeText={password =>
          dispatch({ type: "update", field: { password } })
        }
        placeholder="********"
        label="New password"
      />
      <Spacer />
      <Button
        full={true}
        disabled={!form.dirty || form.loading}
        onPress={handleUpdateUser}
        loading={form.loading}
        text="Submit"
      />
      {form.error ? <StyledError>{form.error}</StyledError> : null}
    </StyledProfileForm>
  )
}

export default memo(ProfileForm)

const StyledProfileForm = styled.View`
  width: 100%;
  height: 100%;
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledError = styled(Text)`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
