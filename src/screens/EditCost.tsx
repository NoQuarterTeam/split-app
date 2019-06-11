import React from "react"
import { Modal, View } from "react-native"
import {
  useGetCost,
  useEditCost,
  useDestroyCost,
  CostInput,
} from "../lib/connector"

import CostForm from "../components/CostForm"
import { useRoute } from "../lib/hooks/useAppContext"
import Button from "../components/Button"

interface EditCostProps {
  costId: string
  modalOpen: boolean
}

function EditCost({ modalOpen, costId }: EditCostProps) {
  const { setRoute } = useRoute()

  const { cost } = useGetCost(costId)
  if (!cost) setRoute({ type: "modal", modal: null, data: null })
  if (!cost) return null
  const editCost = useEditCost(cost ? cost.houseId : "")
  const destroyCost = useDestroyCost(cost)

  const handleEditCost = async (costData: CostInput) => {
    await editCost({
      variables: {
        costId: cost.id,
        data: costData,
      },
    })
    setRoute({ type: "modal", modal: null, data: null })
  }

  const handleDeleteCost = async () => {
    await destroyCost()
    setRoute({ type: "modal", modal: null, data: null })
  }

  return (
    <Modal animationType="slide" transparent={false} visible={modalOpen}>
      <CostForm
        cost={cost}
        onFormSubmit={handleEditCost}
        onCostDelete={handleDeleteCost}
      />
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

export default EditCost
