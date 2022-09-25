import { useMemo } from 'react'

import { useRemoteUserVariables } from './useRemoteUserVariables'
import { FETCH_STATUS } from 'src/utils/requests'
import { UserVariable } from "../../../digitalTwinApi";

type UseVariableListReturnType = {
  variableList: UserVariable[]
  isLoading: boolean
}

const useVariableList = (): UseVariableListReturnType => {
  const { remoteUserVariables, status: remoteVariablesFetchStatus } = useRemoteUserVariables()
  const remoteIsLoading = remoteVariablesFetchStatus === FETCH_STATUS.LOADING

  const variableList = useMemo(() => {
    return remoteUserVariables.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  }, [remoteUserVariables])


  return {
    variableList,
    isLoading: remoteIsLoading,
  }
}

export { useVariableList }
