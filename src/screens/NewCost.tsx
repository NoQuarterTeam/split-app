import React from "react"
import { Modal } from "react-native"
import { useAppState, useRoute } from "../lib/hooks/useAppContext"
import CostForm from "../components/CostForm"
import { useCreateCost, CostInput } from "../lib/graphql"
import styled from "../application/theme"

function NewCost({ modalOpen }: { modalOpen: boolean }) {
  const { user } = useAppState()
  const { setRoute } = useRoute()
  const [createCost] = useCreateCost(user.houseId || "")

  const handleCreateCost = async (costData: CostInput) => {
    await createCost({
      variables: {
        data: costData,
      },
    })
    setRoute({ type: "modal", modal: null })
  }
  return (
    <Modal animationType="slide" transparent={true} visible={modalOpen}>
      <StyledWrapper>
        <CostForm
          onFormSubmit={handleCreateCost}
          onFormCancel={() => setRoute({ type: "modal", modal: null })}
        />
      </StyledWrapper>
    </Modal>
  )
}

export default NewCost

const StyledWrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.colorGrey};
`
