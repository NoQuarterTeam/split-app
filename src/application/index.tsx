import React, { Suspense } from "react"
import "../lib/prototypes"
import AppProvider from "../components/providers/AppProvider"
import CheckUser from "../components/CheckUser"
import Routes from "./routes"
import BottomBar from "../components/BottomBar"
import CheckGroup from "../components/CheckGroup"

function Application() {
  return (
    <Suspense fallback={null}>
      <AppProvider>
        <CheckUser>
          <CheckGroup>
            <Routes />
            <BottomBar />
          </CheckGroup>
        </CheckUser>
      </AppProvider>
    </Suspense>
  )
}

export default Application
