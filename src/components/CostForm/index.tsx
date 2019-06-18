import React, { useState, useLayoutEffect } from "react"
import dayjs from "dayjs"
import { useAppState } from "../../lib/hooks/useAppContext"
import useFormState from "../../lib/hooks/useFormState"
import { CostInput, GetCostQuery } from "../../lib/connector"
import { round, splitTheBill, sleep } from "../../lib/helpers"
import InputSlide from "./InputSlide"
import Participants from "./Participants"
import Name from "./Name"
import Amount from "./Amount"
import Options from "./Options"
import Button from "../Button"
import { TouchableOpacity } from "react-native"
import Text from "../styled/Text"
import styled from "../../application/theme"

interface CostFormProps {
  onFormCancel: () => void
  onFormSubmit: (data: CostInput) => Promise<any>
  onCostDelete?: () => void
  cost?: GetCostQuery["getCost"]
}

function CostForm({
  cost,
  onFormSubmit,
  onFormCancel,
  onCostDelete,
}: CostFormProps) {
  const [step, setStep] = useState("Name")
  const [loading, setLoading] = useState(false)

  const [, setError] = useState<string | null>(null)

  const { user, house } = useAppState()

  const { formState, setFormState } = useFormState({
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
      ? cost.shares
          .filter(s => s.amount > 0)
          .map(s => ({
            userId: s.user.id,
            amount: round(s.amount * 0.01),
          }))
      : house.users.map(u => ({ userId: u.id, amount: 0 })),
  })

  const isDifferent =
    round(+formState.amount) !== round(formState.costShares.sumBy("amount"))

  const applyEqualSplit = () => {
    const split = splitTheBill(formState.costShares.length, +formState.amount)
    const costShares = formState.costShares.map(({ userId }, i) => ({
      userId,
      amount: split[i],
    }))
    setFormState({ costShares, equalSplit: true })
  }

  useLayoutEffect(() => {
    if (formState.equalSplit) applyEqualSplit()
  }, [formState.amount, formState.costShares.length])

  const handleSubmit = async () => {
    if (isDifferent) return

    const costShares = house.users.map(u => {
      const userShare = formState.costShares.find(s => s.userId === u.id)
      if (userShare) {
        return {
          userId: userShare.userId,
          amount: round(userShare.amount * 100),
        }
      } else {
        return { userId: u.id, amount: 0 }
      }
    })
    const costData = {
      ...formState,
      costShares,
      date: dayjs(formState.date).format(),
      amount: round(formState.amount * 100),
    }
    setLoading(true)
    onFormSubmit(costData).catch(async () => {
      setLoading(false)
      setError("Oops, something went wrong, we have been notified!")
      await sleep(4000)
      setError(null)
    })
  }

  switch (step) {
    case "Name":
      return (
        <InputSlide
          onCancel={onFormCancel}
          title="Name"
          onNext={() => setStep("Amount")}
          disabled={!formState.name}
        >
          {onCostDelete ? (
            <TouchableOpacity onPress={onCostDelete}>
              <StyledDelete>Delete cost</StyledDelete>
            </TouchableOpacity>
          ) : null}
          <Name
            name={formState.name}
            onSubmit={() => setStep("Amount")}
            onChange={name => setFormState({ name })}
          />
        </InputSlide>
      )
    case "Amount":
      return (
        <InputSlide
          onCancel={onFormCancel}
          title="Amount"
          onBack={() => setStep("Name")}
          onNext={() => setStep("Options")}
          disabled={!formState.amount}
        >
          <Amount
            amount={formState.amount}
            onSubmit={() => setStep("Options")}
            onChange={amount => setFormState({ amount })}
          />
        </InputSlide>
      )
    case "Options":
      return (
        <InputSlide
          onCancel={onFormCancel}
          title="Options"
          onBack={() => setStep("Amount")}
          onNext={() => setStep("Participants")}
        >
          <Options
            onChange={setFormState}
            recurring={formState.recurring}
            date={formState.date}
            category={formState.category}
          />
        </InputSlide>
      )

    case "Participants":
      return (
        <InputSlide
          onCancel={onFormCancel}
          title="Participants"
          onBack={() => setStep("Options")}
        >
          <Participants
            users={house.users}
            formState={formState}
            isDifferent={isDifferent}
            setFormState={setFormState}
            applyEqualSplit={applyEqualSplit}
          />
          <Button
            loading={loading}
            text={onCostDelete ? "Update Cost" : "Create cost"}
            onPress={handleSubmit}
          />
        </InputSlide>
      )
    default:
      throw new Error("no step defined")
  }
}

const StyledDelete = styled(Text)`
  padding: ${p => p.theme.paddingM} 0;
  color: ${p => p.theme.colorPrimary};
`

export default CostForm
