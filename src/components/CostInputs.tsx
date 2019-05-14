import React, { memo } from "react"
import { CostInput } from "../lib/connector"
import styled from "../application/theme"

import { decimalCount } from "../lib/helpers"
import Input from "./Input"
import Select from "./Select"

interface CostInputsProps {
  formState: CostInput
  isEditing: boolean
  setFormState: (val: { [key: string]: any }) => void
}

function CostInputs({ formState, setFormState }: CostInputsProps) {
  return (
    <StyledInputs>
      <StyledInputWrapper>
        <Input
          label="Name"
          placeholder="Beers"
          value={formState.name}
          onChangeText={name => setFormState({ name })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          prefix="€"
          label="Amount"
          placeholder="0.00"
          keyboardType="numeric"
          value={formState.amount === 0 ? "" : formState.amount.toString()}
          onChangeText={val => {
            const amount = +val
            if (amount < 0) return
            if (decimalCount(amount) > 2) return
            setFormState({ amount })
          }}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          label="Category"
          value={formState.category}
          onChange={category => setFormState({ category })}
          options={[
            { value: "food", label: "Food" },
            { value: "drinks", label: "Drinks" },
            { value: "home", label: "Home Supplies" },
            { value: "work", label: "Work Supplies" },
            { value: "rent", label: "Rent" },
            { value: "travel", label: "Travel" },
            { value: "utilities", label: "Utilities" },
            { value: "other", label: "Other" },
          ]}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          label="Date"
          value={formState.date}
          onChangeText={date => setFormState({ date })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          label="Recurring"
          value={formState.recurring}
          onChange={recurring => setFormState({ recurring })}
          options={[
            { value: "one-off", label: "One off" },
            { value: "month", label: "Monthly" },
            { value: "week", label: "Weekly" },
          ]}
        />
      </StyledInputWrapper>
    </StyledInputs>
  )
}

export default memo(CostInputs)

const StyledInputs = styled.View`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 0;
`

const StyledInputWrapper = styled.View`
  width: 100%;
  margin: ${p => p.theme.paddingL} 0;
  padding-right: ${p => p.theme.paddingL};
`
