import React from "react"
import Button from "../components/Button"
import { useAppState, useRoute } from "../lib/hooks/useAppContext"
import CostForm from "../components/CostForm"
import { useCreateCost, CostInput } from "../lib/connector"
import { Modal } from "react-native"

function NewCost({ modalOpen }: { modalOpen: boolean }) {
  const { user } = useAppState()
  const { setRoute } = useRoute()
  if (!user.houseId) setRoute({ type: "modal", modal: null })
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
      <CostForm onFormSubmit={handleCreateCost} />
      <Button
        text="back"
        onPress={() => setRoute({ type: "modal", modal: null })}
      />
    </Modal>
  )
}

export default NewCost
