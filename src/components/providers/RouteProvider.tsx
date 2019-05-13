import React, { FC, Fragment, useState } from "react"
import {
  RouteProvider as RouteContextProvider,
  Routes,
} from "../../application/context"
import { useAppState } from "../../lib/hooks/useAppContext"

const RouteProvider: FC = ({ children }) => {
  const { user } = useAppState()
  const [route, setRoute] = useState<Routes>(user ? "BALANCE" : "LOGIN")
  return (
    <RouteContextProvider value={{ route, setRoute }}>
      <Fragment>{children}</Fragment>
    </RouteContextProvider>
  )
}

export default RouteProvider
