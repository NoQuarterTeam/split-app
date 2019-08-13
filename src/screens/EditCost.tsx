import React from "react"
import { Modal } from "react-native"
import {
  useGetCost,
  useEditCost,
  useDestroyCost,
  CostInput,
} from "../lib/graphql"

import CostForm from "../components/CostForm"
import { useRoute } from "../lib/hooks/useAppContext"

interface EditCostProps {
  costId: string
  modalOpen: boolean
}

function EditCost({ modalOpen, costId }: EditCostProps) {
  const { setRoute } = useRoute()

  const { cost, loading } = useGetCost(costId)
  const [editCost] = useEditCost(cost ? cost.houseId : "")
  const [destroyCost] = useDestroyCost(cost)

  const handleEditCost = async (costData: CostInput) => {
    if (cost) {
      await editCost({
        variables: {
          costId: cost.id,
          data: costData,
        },
      })
      setRoute({ type: "modal", modal: null, data: null })
    }
  }

  const handleDeleteCost = async () => {
    await destroyCost()
    setRoute({ type: "modal", modal: null, data: null })
  }

  if (!cost && !loading) {
    setRoute({ type: "modal", modal: null, data: null })
    return null
  }
  return (
    <Modal animationType="slide" transparent={false} visible={modalOpen}>
      {cost ? (
        <CostForm
          cost={cost}
          onFormCancel={() =>
            setRoute({ type: "modal", modal: null, data: null })
          }
          onFormSubmit={handleEditCost}
          onCostDelete={handleDeleteCost}
        />
      ) : null}
    </Modal>
  )
}

export default EditCost
