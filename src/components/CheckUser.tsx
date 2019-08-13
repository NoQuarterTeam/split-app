import React, { FC, Fragment } from "react"

import { useAppState, useRoute } from "../lib/hooks/useAppContext"
import Login from "../screens/Login"
import Register from "../screens/Register"
import ForgotPassword from "../screens/ForgotPassword"

function renderAuthRoutes(route: string) {
  switch (route) {
    case "LOGIN":
      return <Login />
    case "REGISTER":
      return <Register />
    case "FORGOT_PASSWORD":
      return <ForgotPassword />
    default:
      return <Login />
  }
}

const CheckUser: FC = ({ children }) => {
  const { user } = useAppState()
  const { routes } = useRoute()

  return user ? (
    <Fragment>{children}</Fragment>
  ) : (
    renderAuthRoutes(routes.currentRoute)
  )
}

export default CheckUser
