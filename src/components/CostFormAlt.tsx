import React, { useState, useLayoutEffect } from "react"
import dayjs from "dayjs"
import styled from "../application/theme"
import { useAppState } from "../lib/hooks/useAppContext"
import useFormState from "../lib/hooks/useFormState"
import { CostInput, GetCostQuery } from "../lib/connector"
import { round, sumBy, splitTheBill, sleep, decimalCount } from "../lib/helpers"
import InputSlide from "./InputSlide"
import Select from "./Select"
import {
  Picker,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
} from "react-native"
import Header from "./styled/Header"

interface CostFormProps {
  onFormSubmit: (data: CostInput) => Promise<any>
  cost?: GetCostQuery["getCost"]
  onCostDelete?: () => void
}

function CostForm({ cost, onFormSubmit, onCostDelete }: CostFormProps) {
  const [step, setStep] = useState("Name")
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

  const handleSubmit = async () => {
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
  switch (step) {
    case "Name":
      return (
        <InputSlide title="Name" onNext={() => setStep("Amount")}>
          <StyledInput
            placeholder="Beers"
            value={formState.name}
            autoFocus={true}
            returnKeyLabel="Next"
            returnKeyType="next"
            onSubmitEditing={() => setStep("Amount")}
            onChangeText={name => setFormState({ name })}
          />
        </InputSlide>
      )
    case "Amount":
      return (
        <InputSlide
          title="Amount"
          onNext={() => setStep("Category")}
          onBack={() => setStep("Name")}
        >
          <StyledInput
            placeholder="€15.45"
            keyboardType="numeric"
            autoFocus={true}
            value={formState.amount ? `€${formState.amount.toString()}` : ""}
            returnKeyLabel="Next"
            returnKeyType="next"
            onChangeText={val => {
              let amount = val
              if (amount[0] === "€") amount = val.split("€")[1]
              if (decimalCount(+amount) > 2) return
              setFormState({ amount })
            }}
          />
        </InputSlide>
      )
    case "Category":
      return (
        <InputSlide
          title="Category"
          onNext={() => setStep("Date")}
          onBack={() => setStep("Amount")}
        >
          <Picker
            selectedValue={formState.category}
            onValueChange={category => setFormState({ category })}
          >
            {[
              { value: "food", label: "Food" },
              { value: "drinks", label: "Drinks" },
              { value: "home", label: "Home Supplies" },
              { value: "work", label: "Work Supplies" },
              { value: "rent", label: "Rent" },
              { value: "travel", label: "Travel" },
              { value: "utilities", label: "Utilities" },
              { value: "other", label: "Other" },
            ].map(item => (
              <Picker.Item
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </Picker>
        </InputSlide>
      )
    case "Date":
      return (
        <InputSlide
          title="Date"
          onNext={() => setStep("Recurring")}
          onBack={() => setStep("Category")}
        >
          {Platform.OS === "ios" ? (
            <DatePickerIOS
              onDateChange={date =>
                setFormState({ date: dayjs(date).format("YYYY-MM-DD") })
              }
              mode="date"
              date={dayjs(formState.date).toDate()}
            />
          ) : (
            <Header>{dayjs(formState.date).format("YYYY-MM-DD")}</Header>
          )}
        </InputSlide>
      )
    case "Recurring":
      return (
        <InputSlide
          title="Recurring"
          onNext={() => setStep("Recurring")}
          onBack={() => setStep("Date")}
        >
          <Picker
            selectedValue={formState.recurring}
            onValueChange={recurring => setFormState({ recurring })}
          >
            {[
              { value: "one-off", label: "One off" },
              { value: "month", label: "Monthly" },
              { value: "week", label: "Weekly" },
            ].map(item => (
              <Picker.Item
                key={item.value}
                value={item.value}
                label={item.label}
              />
            ))}
          </Picker>
        </InputSlide>
      )
    default:
      throw new Error("no step defined")
  }
}

export default CostForm

const StyledInput = styled.TextInput`
  font-size: ${p => p.theme.textXL};
  text-align: center;
  height: 100%;
  font-family: "Verdana";
`
