import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { ArchivedTaskActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedMyTaskActivityTasks/${str}`

export const initialState = (): ArchivedTaskActivityTask => ({
  id: '',
  archivedTaskActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: archivedTaskActivityTaskState,
  listState: archivedTaskActivityTasksState,
  idsState: archivedTaskActivityTaskIdsState,
} = createState({ key, initialState })

export const taskIdsByArchivedTaskActivityIdState = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByArchivedTaskActivityIdState'),
  get:
    (archivedTaskActivityId: string) =>
    ({ get }) => {
      const archivedTaskActivityTasks = get(archivedTaskActivityTasksState)
      return archivedTaskActivityTasks
        .filter((w) => w.archivedTaskActivityId === archivedTaskActivityId)
        .map((w) => w.taskId)
    },
})
