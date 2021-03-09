import { atom, useRecoilState } from 'recoil'
import { Project } from './type'
import { useCallback } from 'react'
import { COLORS } from 'src/hooks/useColorPicker'

export const state = atom<Project[]>({
  key: 'projectsState',
  default: [
    {
      id: '1',
      name: 'Asana',
      color: {
        id: '10',
        name: 'pink',
        color: 'pink.400',
      },
      icon: {
        id: '1',
      },
    },
  ],
})

export const useProjects = () => {
  const [projects, setProjects] = useRecoilState(state)

  const setColor = useCallback(
    (id: string, colorId: string) => {
      const color = COLORS.find((c) => c.id === colorId)!
      setProjects((prev) => {
        return prev.map((p) => ({
          ...p,
          ...(p.id === id
            ? {
                color: {
                  id: color.id,
                  name: color.name,
                  color: color.base,
                },
              }
            : {}),
        }))
      })
    },
    [setProjects],
  )

  return {
    projects,
    setProjects,
    setColor,
  }
}
