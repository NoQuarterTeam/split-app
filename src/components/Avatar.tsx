import React, { memo } from "react"

import styled, { darken } from "../application/theme"

interface AvatarProps {
  user: {
    avatar?: string | null
    firstName: string
    lastName: string
  }
  size?: number
}

function Avatar({ user, size = 80 }: AvatarProps) {
  return user.avatar ? (
    <StyledAvatar
      resizeMode="cover"
      size={size}
      source={{ uri: user.avatar }}
    />
  ) : (
    <StyledAvatarName size={size}>
      <StyledInitials>{user.firstName.split("")[0]}</StyledInitials>
      <StyledInitials>{user.lastName.split("")[0]}</StyledInitials>
    </StyledAvatarName>
  )
}

export default memo(Avatar)

const StyledAvatar = styled.Image<{ size: number }>`
  border-radius: ${p => 0.5 * p.size}px;
  height: ${p => p.size}px;
  width: ${p => p.size}px;
`

const StyledAvatarName = styled.View<{ size: number }>`
  background-color: ${p => p.theme.colorBlue};
  height: ${p => p.size}px;
  width: ${p => p.size}px;
  border-radius: ${p => p.size}px;

  ${p => p.theme.flexCenter};
`

const StyledInitials = styled.Text`
  color: ${p => darken(0.2, p.theme.colorBlue)};
  font-weight: ${p => p.theme.fontBlack};
  font-size: ${p => p.theme.textS};
`
