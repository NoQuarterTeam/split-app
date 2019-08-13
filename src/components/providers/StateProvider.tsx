import React, { Fragment, FC } from "react"
import { useMe, useGetHouse } from "../../lib/graphql"
import { StateProvider as StateContextProvider } from "../../application/context"
import Loading from "../styled/Loading"

const StateProvider: FC = ({ children }) => {
  const { user, userLoading } = useMe()
  const { house, getHouseLoading, refetch } = useGetHouse()

  return (
    <StateContextProvider value={{ user, house, refetch }}>
      {userLoading || getHouseLoading ? (
        <Loading />
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </StateContextProvider>
  )
}

export default StateProvider
