import React, { memo } from "react"
import { ShareInput, UserFragment } from "../../lib/connector"
import styled from "../../application/theme"
import { decimalCount } from "../../lib/helpers"

import Input from "../Input"
import Avatar from "../Avatar"
import Switch from "../Switch"
import Radio from "../Radio"
import Column from "../styled/Column"
import Center from "../styled/Center"
import { Keyboard } from "react-native"

interface ParticipantProps {
  user: UserFragment
  isPayer: boolean
  shares: ShareInput[]
  setFormState: (val: { [key: string]: any }) => void
}

function Participant({
  user,
  isPayer,
  shares,
  setFormState,
}: ParticipantProps) {
  const userShare = shares.find(s => s.userId === user.id)

  const toggleParticipant = (userId: string) => {
    if (userShare) {
      if (shares.length === 1) return
      const newCostShares = shares.filter(s => s.userId !== userId)
      setFormState({
        costShares: newCostShares,
      })
    } else {
      // Add user back to split
      const newCostShare = {
        userId,
        amount: "",
      }
      const newShares = [...shares, newCostShare]
      setFormState({
        costShares: newShares,
      })
    }
  }

  const handleCostShareUpdate = (val: string) => {
    try {
      let amount = val
      if (amount[0] === "€") amount = val.split("€")[1]
      amount = amount.replace(",", ".")
      if (decimalCount(+amount) > 2) return
      setFormState({
        equalSplit: false,
        costShares: shares.map(s => {
          if (s.userId !== user.id) return s
          return {
            userId: user.id,
            amount,
          }
        }),
      })
    } catch (error) {
      return
    }
  }

  return (
    <StyledParticipant>
      <Column flex={4}>
        <Center>
          <Switch
            value={!!userShare}
            onValueChange={() => toggleParticipant(user.id)}
          />
          <StyledAvatarWrapper
            onPress={() => toggleParticipant(user.id)}
            on={!!userShare}
          >
            <Avatar user={user} size={50} />
          </StyledAvatarWrapper>
        </Center>
      </Column>
      <Column flex={3} style={{ alignItems: "center" }}>
        <Input
          placeholder="€0.00"
          keyboardType="numeric"
          onChangeText={handleCostShareUpdate}
          onBlur={() => Keyboard.dismiss()}
          returnKeyLabel="Next"
          returnKeyType="done"
          value={
            userShare && userShare.amount
              ? `€${userShare.amount.toString()}`
              : ""
          }
          style={{
            textAlign: "center",
            borderWidth: 0,
            opacity: userShare ? 1 : 0.4,
          }}
        />
      </Column>
      <Column flex={2} style={{ alignItems: "center" }}>
        <Radio
          checked={isPayer}
          onPress={() => setFormState({ payerId: user.id })}
        />
      </Column>
    </StyledParticipant>
  )
}

export default memo(Participant)

const StyledParticipant = styled.View`
  width: 100%;

  margin-bottom: ${p => p.theme.paddingL};
  ${p => p.theme.flexBetween};
`

const StyledAvatarWrapper = styled.TouchableOpacity<{ on: boolean }>`
  padding-left: ${p => p.theme.paddingM};
  opacity: ${p => (p.on ? 1 : 0.4)};
`
