import React, { FC, useState } from "react"
import { useAllCosts } from "../lib/connector"

import { useAppState } from "../lib/hooks/useAppContext"

import Page from "../components/Page"
import CostItem from "../components/CostItem"
import { FlatList } from "react-native"
import CostsHeader from "../components/CostsHeader"

const Costs: FC = () => {
  const { house } = useAppState()
  if (!house) return null
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
        renderItem={({ item }) => <CostItem cost={item} />}
      />
    </Page>
  )
}

export default Costs
