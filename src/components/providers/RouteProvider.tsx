import React, { FC, Fragment, useReducer } from "react"
import { RouteProvider as RouteContextProvider } from "../../application/context"
import { useAppState } from "../../lib/hooks/useAppContext"

const routeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "route":
      return {
        ...state,
        currentRoute: action.route,
      }
    case "modal":
      return {
        ...state,
        modal: action.modal,
        data: action.data,
      }
    default:
      throw new Error("incorrect action type")
  }
}
const RouteProvider: FC = ({ children }) => {
  const { user } = useAppState()
  const [routes, setRoute] = useReducer(routeReducer, {
    currentRoute: user ? "BALANCE" : "LOGIN",
    modal: null,
    data: null,
  })
  return (
    <RouteContextProvider value={{ routes, setRoute }}>
      <Fragment>{children}</Fragment>
    </RouteContextProvider>
  )
}

export default RouteProvider
