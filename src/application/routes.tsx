import React from "react"
import { useRoute } from "../lib/hooks/useAppContext"
import Balance from "../screens/Balance"
import Costs from "../screens/Costs"
import Settings from "../screens/Settings"

function Routes() {
  const { routes } = useRoute()
  switch (routes.currentRoute) {
    case "BALANCE":
      return <Balance />
    case "COSTS":
      return <Costs />
    case "SETTINGS":
      return <Settings />
    default:
      return <Balance />
  }
}

export default Routes
