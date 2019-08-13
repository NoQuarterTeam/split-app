import React, { memo } from "react"
import { KeyboardAvoidingView } from "react-native"

import { CostInput, UserFragment } from "../../lib/graphql"

import styled from "../../application/theme"
import { round } from "../../lib/helpers"

import Column from "../styled/Column"
import Alert from "../Alert"
import Participant from "./Participant"
import Button from "../Button"
import Text from "../styled/Text"

interface ParticpantsProps {
  users: UserFragment[]
  isDifferent: boolean
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
  applyEqualSplit: () => void
}
function Particpants({
  users,
  formState,
  isDifferent,
  setFormState,
  applyEqualSplit,
}: ParticpantsProps) {
  const totalParticpantsAmount = formState.costShares.sumBy("amount")
  const amountRemaining = round(formState.amount - totalParticpantsAmount, 2)
  return (
    <KeyboardAvoidingView>
      <StyledWrapper>
        {isDifferent && !formState.equalSplit && (
          <StyledAlertWrapper>
            <Alert text={`Split must equal amount ( € ${amountRemaining} )`} />
          </StyledAlertWrapper>
        )}
        <StyledHeader>
          <Column flex={4}>
            <StyledLabel>Participant</StyledLabel>
          </Column>
          <Column flex={3}>
            <StyledLabel>Split</StyledLabel>
          </Column>
          <Column flex={2}>
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

        {isDifferent && !formState.equalSplit && (
          <Button
            onPress={applyEqualSplit}
            text="Split equally"
            variant="outline"
          />
        )}
      </StyledWrapper>
    </KeyboardAvoidingView>
  )
}

export default memo(Particpants)

const StyledWrapper = styled.View`
  padding-top: 60px;
  padding-bottom: 20px;
`

const StyledHeader = styled.View`
  ${p => p.theme.flexBetween};
  margin-bottom: ${p => p.theme.paddingL};
`

const StyledLabel = styled(Text)`
  text-align: center;
`

const StyledAlertWrapper = styled.View`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  ${p => p.theme.flexCenter};
`
