import React, { Suspense, Fragment } from "react"
import { StatusBar } from "react-native"
import "../lib/prototypes"
import AppProvider from "../components/providers/AppProvider"
import CheckUser from "../components/CheckUser"
import Routes from "./routes"
import BottomBar from "../components/BottomBar"
import CheckHouse from "../components/CheckHouse"

function Application() {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
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
    </Fragment>
  )
}

export default Application
