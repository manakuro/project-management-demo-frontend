import { useState } from 'react'
import { ProjectPermissionTypes } from './types'

export const useProjectPermission = () => {
  const [status, setStatus] = useState<ProjectPermissionTypes>(1)

  return {
    status,
    setStatus,
  }
}
