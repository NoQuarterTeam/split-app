import React, { useState, memo } from "react"
import { useEditGroup, GroupFragment } from "../lib/graphql"

import styled from "../application/theme"

interface GroupNameProps {
  group: GroupFragment
}

function GroupName({ group }: GroupNameProps) {
  const [groupName, setGroupName] = useState<string>(group.name)
  const [updateGroup] = useEditGroup()

  const handleGroupUpdate = (e: any) => {
    e.preventDefault()
    if (!groupName) return setGroupName(group.name)
    updateGroup({
      variables: {
        groupId: group.id,
        data: {
          currency: group.currency,
          name: groupName,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editGroup: {
          ...group,
          name: groupName,
        },
      },
    })
  }
  return (
    <StyledInput
      value={groupName}
      blurOnSubmit={true}
      onChangeText={text => setGroupName(text)}
      onSubmitEditing={handleGroupUpdate}
      returnKeyType="done"
    />
  )
}

export default memo(GroupName)

const StyledInput = styled.TextInput`
  width: 100%;
  border: 0;
  padding: 0;
  background-color: transparent;
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textXL};
  font-family: ${p => p.theme.fontFamilyHeader};
  font-weight: ${p => p.theme.fontBold};
`
