import React, { FC, Fragment } from "react"
import { useAppState } from "../lib/hooks/useAppContext"
import NewHouse from "../screens/NewHouse"

const CheckHouse: FC = ({ children }) => {
  const { user } = useAppState()
  return user.houseId ? <Fragment>{children}</Fragment> : <NewHouse />
}

export default CheckHouse
