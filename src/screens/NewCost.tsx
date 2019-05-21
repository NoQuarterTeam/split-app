import React from "react"
import { Modal, View } from "react-native"
import Button from "../components/Button"
import { useAppState, useRoute } from "../lib/hooks/useAppContext"
import CostForm from "../components/CostFormAlt"
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
      <CostForm onFormSubmit={handleCreateCost} />
      <View style={{ position: "absolute", top: 35, right: 15 }}>
        <Button
          text="Cancel"
          variant="text"
          color="tertiary"
          onPress={() => setRoute({ type: "modal", modal: null })}
        />
      </View>
    </Modal>
  )
}

export default NewCost
