import React, { FC, Fragment } from "react"
import { useAppState } from "../lib/hooks/useAppContext"
import NewGroup from "../screens/NewGroup"

const CheckGroup: FC = ({ children }) => {
  const { user } = useAppState()
  return user.groupId ? <Fragment>{children}</Fragment> : <NewGroup />
}

export default CheckGroup
