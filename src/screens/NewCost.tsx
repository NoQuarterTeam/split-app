import React from "react"
import { Modal } from "react-native"
import { useAppState, useRoute } from "../lib/hooks/useAppContext"
import CostForm from "../components/CostForm"
import { useCreateCost, CostInput } from "../lib/connector"

function NewCost({ modalOpen }: { modalOpen: boolean }) {
  const { user } = useAppState()
  const { setRoute } = useRoute()
  const createCost = useCreateCost(user.houseId || "")

  const handleCreateCost = async (costData: CostInput) => {
    await createCost({
      variables: {
        data: costData,
      },
    })
    setRoute({ type: "modal", modal: null })
  }
  return (
    <Modal animationType="slide" transparent={false} visible={modalOpen}>
      <CostForm
        onFormSubmit={handleCreateCost}
        onFormCancel={() => setRoute({ type: "modal", modal: null })}
      />
    </Modal>
  )
}

export default NewCost
