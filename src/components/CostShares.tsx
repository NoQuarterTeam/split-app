import React, { memo } from "react"
import { CostInput, UserFragment } from "../lib/connector"

import styled from "../application/theme"
import { round } from "../lib/helpers"

import Column from "./styled/Column"
import Alert from "./Alert"
import Participant from "./Participant"
import Button from "./Button"
import Text from "./styled/Text"

interface CostSharesProps {
  users: UserFragment[]
  isDifferent: boolean
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
  applyEqualSplit: () => void
}
function CostShares({
  users,
  formState,
  isDifferent,
  setFormState,
  applyEqualSplit,
}: CostSharesProps) {
  const totalCostShares = formState.costShares.sumBy("amount")
  const amountRemaining = round(formState.amount - totalCostShares, 2)
  return (
    <StyledCostShares>
      {isDifferent &&
      !formState.equalSplit && ( // Requires equal split to stop flashing
          <StyledAlertWrapper>
            <Alert
              text={`Split must equal amount ( € ${amountRemaining} remaining )`}
            />
          </StyledAlertWrapper>
        )}
      <StyledHeader>
        <Column flex={4}>
          <StyledLabel>Participants</StyledLabel>
        </Column>
        <Column flex={3}>
          <StyledLabel>Split</StyledLabel>
        </Column>
        <Column flex={1}>
          <StyledLabel>Payer</StyledLabel>
        </Column>
      </StyledHeader>
      {users.map(user => {
        return (
          <Participant
            key={user.id}
            isPayer={user.id === formState.payerId}
            user={user}
            shares={formState.costShares}
            setFormState={setFormState}
          />
        )
      })}

      {(isDifferent || !formState.equalSplit) && (
        <StyledButtonWrapper>
          <Button
            color="pink"
            variant="secondary"
            onPress={applyEqualSplit}
            text="Split equally"
          />
        </StyledButtonWrapper>
      )}
    </StyledCostShares>
  )
}

export default memo(CostShares)

const StyledCostShares = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingL};
  margin: ${p => p.theme.paddingXL} 0;
`

const StyledHeader = styled.View`
  ${p => p.theme.flexBetween};
  margin-bottom: ${p => p.theme.paddingL};
`

const StyledLabel = styled(Text)``

const StyledAlertWrapper = styled.View`
  position: absolute;
  width: 100%;
  left: 0;
  top: -${p => p.theme.paddingXL};
  ${p => p.theme.flexCenter};
`

const StyledButtonWrapper = styled.View`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: -30px;
  ${p => p.theme.flexCenter};
`
