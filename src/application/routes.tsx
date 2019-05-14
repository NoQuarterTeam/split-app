import React from "react"
import { useRoute } from "../lib/hooks/useAppContext"
import Balance from "../screens/Balance"
import Costs from "../screens/Costs"

function Routes() {
  const { routes } = useRoute()
  switch (routes.currentRoute) {
    case "BALANCE":
      return <Balance />
    case "COSTS":
      return <Costs />
    default:
      return <Balance />
  }
}

export default Routes
