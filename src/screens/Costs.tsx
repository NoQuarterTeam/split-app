import React, { FC, useState, Suspense } from "react"
import { useAllCosts } from "../lib/connector"
import { FlatList } from "react-native"

import { useAppState, useRoute } from "../lib/hooks/useAppContext"

import Page from "../components/Page"
import CostItem from "../components/CostItem"
import CostsHeader from "../components/CostsHeader"
import EditCost from "./EditCost"

const Costs: FC = () => {
  const { house } = useAppState()
  if (!house) return null // TODO: Do something with these types of things,
  // e.g. render the house form
  const { routes } = useRoute()
  const [search, setSearch] = useState<string>("")
  const { costs, fetchMore, refresh } = useAllCosts(house.id, search)

  return (
    <Page title="Costs">
      <FlatList
        data={costs}
        showsVerticalScrollIndicator={false}
        onEndReached={() =>
          fetchMore({ search, skip: costs.length, houseId: house.id })
        }
        refreshing={false}
        onRefresh={refresh}
        onEndReachedThreshold={0.8}
        ListHeaderComponent={<CostsHeader onSubmit={setSearch} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => <CostItem cost={item} />}
      />
      <Suspense fallback={null}>
        {routes.modal === "EDIT_COST" && (
          <EditCost costId={routes.data || ""} modalOpen={true} />
        )}
      </Suspense>
    </Page>
  )
}

export default Costs
