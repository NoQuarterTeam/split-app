import React, { Suspense } from "react"
import "../lib/prototypes"
import AppProvider from "../components/providers/AppProvider"
import CheckUser from "../components/CheckUser"
import Routes from "./routes"

function Application() {
  return (
    <Suspense fallback={null}>
      <AppProvider>
        <CheckUser>
          <Routes />
        </CheckUser>
      </AppProvider>
    </Suspense>
  )
}

export default Application
