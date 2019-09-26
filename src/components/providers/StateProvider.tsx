import React, { Fragment, FC } from "react"
import { useMe, useGetGroup } from "../../lib/graphql"
import { StateProvider as StateContextProvider } from "../../application/context"
import Loading from "../styled/Loading"

const StateProvider: FC = ({ children }) => {
  const { user, userLoading } = useMe()
  const { group, getGroupLoading, refetch } = useGetGroup()

  return (
    <StateContextProvider value={{ user, group, refetch }}>
      {userLoading || getGroupLoading ? (
        <Loading />
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </StateContextProvider>
  )
}

export default StateProvider
