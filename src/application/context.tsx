import React from "react"
import { MeQuery, GetHouseQuery } from "../lib/connector"
import { ThemeInterface, theme } from "./theme"

// App State

export interface StateContext {
  user: MeQuery["me"]
  house: GetHouseQuery["house"]
}

export const StateContext = React.createContext<StateContext>({
  user: null,
  house: null,
})

export const StateProvider = StateContext.Provider

// Theme

export interface ThemeContext {
  toggleTheme: () => void
  isDark: boolean
  theme: ThemeInterface
}

export const ThemeContext = React.createContext<ThemeContext>({
  toggleTheme: () => {},
  isDark: false,
  theme: theme(false),
})

export const ThemeProvider = ThemeContext.Provider

// Route

export type Routes = "LOGIN" | "REGISTER" | "BALANCE" | "COSTS" | "NEW_COST"

export interface RouteContext {
  setRoute: (route: Routes) => void
  route: Routes
}

export const RouteContext = React.createContext<RouteContext>({
  setRoute: () => {},
  route: "BALANCE",
})

export const RouteProvider = RouteContext.Provider
