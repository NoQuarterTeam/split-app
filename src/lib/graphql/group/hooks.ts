import {
  useGetGroupQuery,
  useCreateGroupMutation,
  MeQuery,
  useEditGroupMutation,
  MeDocument,
  GetGroupDocument,
  MeQueryVariables,
} from "../types"

export function useGetGroup() {
  const { data, error, loading, refetch } = useGetGroupQuery()
  const group = (data && data.group) || null
  return { group, getGroupLoading: loading, getGroupError: error, refetch }
}

export function useCreateGroup() {
  return useCreateGroupMutation({
    update: (cache, { data }) => {
      const getMe = cache.readQuery<MeQuery, MeQueryVariables>({
        query: MeDocument,
      })
      if (data && data.createGroup && getMe) {
        const group = data.createGroup
        cache.writeQuery({
          query: GetGroupDocument,
          data: { group },
        })
        cache.writeQuery({
          query: MeDocument,
          data: { me: { ...getMe.me, groupId: data.createGroup.id } },
        })
      }
    },
  })
}

export function useEditGroup() {
  return useEditGroupMutation()
}
