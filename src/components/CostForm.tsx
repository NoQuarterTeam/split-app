import React, { useState, useLayoutEffect, Fragment } from "react"
import dayjs from "dayjs"
import { CostInput, GetCostQuery } from "../lib/connector"

import styled from "../application/theme"
import { splitTheBill, round, sleep, sumBy } from "../lib/helpers"
import useFormState from "../lib/hooks/useFormState"
import { useAppState } from "../lib/hooks/useAppContext"

import CostInputs from "./CostInputs"
import Button from "./Button"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import CostShares from "./CostShares"
// import CostShares from "./CostShares"
// import ErrorBanner from "./ErrorBanner"

interface CostFormProps {
  onFormSubmit: (data: CostInput) => Promise<any>
  cost?: GetCostQuery["getCost"]
  onCostDelete?: () => void
}

function CostForm({ cost, onFormSubmit, onCostDelete }: CostFormProps) {
  const { user, house } = useAppState()
  const { formState, setFormState } = useFormState<CostInput>({
    name: cost ? cost.name : "",
    amount: cost ? round(cost.amount * 0.01) : 0,
    category: cost ? cost.category : "food",
    equalSplit: cost ? cost.equalSplit : true,
    date: cost
      ? dayjs(cost.date).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    recurring: cost ? cost.recurring : "one-off",
    houseId: house.id,
    payerId: cost ? cost.payerId : user.id,
    costShares: cost
      ? cost.shares.map(s => ({
          userId: s.user.id,
          amount: round(s.amount * 0.01),
        }))
      : house.users.map(u => ({ userId: u.id, amount: 0 })),
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [, setError] = useState<string | null>(null)

  const isDifferent =
    round(formState.amount) !== round(sumBy(formState.costShares, "amount"))

  const applyEqualSplit = () => {
    const split = splitTheBill(formState.costShares.length, formState.amount)
    const costShares = formState.costShares.map(({ userId }, i) => ({
      userId,
      amount: split[i],
    }))
    setFormState({ costShares, equalSplit: true })
  }

  useLayoutEffect(() => {
    if (formState.equalSplit) applyEqualSplit()
  }, [formState.amount, formState.costShares.length])

  const handleCostCreate = async () => {
    if (isDifferent) return
    setLoading(true)
    const costData = {
      ...formState,
      date: dayjs(formState.date).format(),
      amount: round(formState.amount * 100),
      costShares: formState.costShares.map(s => ({
        userId: s.userId,
        amount: round(s.amount * 100),
      })),
    }
    onFormSubmit(costData).catch(async () => {
      setError("Oops, something went wrong, we have been notified!")
      await sleep(4000)
      setError(null)
      setLoading(false)
    })
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <StyleFieldsWrapper>
        <CostInputs
          formState={formState}
          setFormState={setFormState}
          isEditing={!!cost && dayjs(cost.date).isBefore(dayjs())}
        />
        <CostShares
          users={house.users}
          formState={formState}
          isDifferent={isDifferent}
          setFormState={setFormState}
          applyEqualSplit={applyEqualSplit}
        />
        <Fragment>
          <Button
            onPress={handleCostCreate}
            disabled={loading}
            loading={loading}
            variant="primary"
            color="pink"
            text="Submit"
          />
          {onCostDelete && (
            <Button
              color="pink"
              variant="tertiary"
              text="Delete cost"
              onPress={onCostDelete}
            />
          )}
        </Fragment>
        {/* {error && <ErrorBanner text={error} />} */}
      </StyleFieldsWrapper>
    </KeyboardAwareScrollView>
  )
}

export default CostForm

const StyleFieldsWrapper = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: ${p => p.theme.paddingL};
`
