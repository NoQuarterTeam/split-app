import React from "react"
import Button from "../components/Button"
import { useAppState, useRoute } from "../lib/hooks/useAppContext"
import Page from "../components/Page"
import CostForm from "../components/CostForm"
import { useCreateCost, CostInput } from "../lib/connector"

function NewCost() {
  const { user } = useAppState()
  const { setRoute } = useRoute()
  if (!user.houseId) setRoute("BALANCE")
  const createCost = useCreateCost(user.houseId || "")

  const handleCreateCost = async (costData: CostInput) => {
    await createCost({
      variables: {
        data: costData,
      },
    })
    if (window.history.state) {
      setRoute("BALANCE")
    } else {
      setRoute("BALANCE")
    }
  }
  return (
    <Page title="New cost">
      <CostForm onFormSubmit={handleCreateCost} />
      <Button text="back" onPress={() => setRoute("BALANCE")} />
    </Page>
  )
}

export default NewCost
