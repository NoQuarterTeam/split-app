import React from "react"
import { MeQuery, GetGroupQuery } from "../lib/graphql"
import { ThemeInterface, theme } from "./theme"

// App State

export interface StateContext {
  user: MeQuery["me"]
  group: GetGroupQuery["group"]
  refetch: () => void
}

export const StateContext = React.createContext<StateContext>({
  user: null,
  group: null,
  refetch: () => {},
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

export type Routes =
  | "LOGIN"
  | "REGISTER"
  | "FORGOT_PASSWORD"
  | "BALANCE"
  | "COSTS"
  | "SETTINGS"
export type Modals = "NEW_COST" | "EDIT_COST" | null

export interface RouteContext {
  setRoute: (action: any) => void
  routes: {
    currentRoute: Routes
    modal: Modals
    data: string | null
  }
}

export const RouteContext = React.createContext<RouteContext>({
  setRoute: () => {},
  routes: {
    currentRoute: "BALANCE",
    modal: null,
    data: null,
  },
})

export const RouteProvider = RouteContext.Provider
