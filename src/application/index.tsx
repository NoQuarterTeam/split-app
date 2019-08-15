import React, { Suspense } from "react"
import "../lib/prototypes"
import AppProvider from "../components/providers/AppProvider"
import CheckUser from "../components/CheckUser"
import Routes from "./routes"
import BottomBar from "../components/BottomBar"
import CheckHouse from "../components/CheckHouse"

function Application() {
  return (
    <Suspense fallback={null}>
      <AppProvider>
        <CheckUser>
          <CheckHouse>
            <Routes />
            <BottomBar />
          </CheckHouse>
        </CheckUser>
      </AppProvider>
    </Suspense>
  )
}

export default Application
