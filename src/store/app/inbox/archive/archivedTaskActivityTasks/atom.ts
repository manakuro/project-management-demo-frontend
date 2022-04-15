import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { ArchivedTaskActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedMyTaskActivityTasks/${str}`

export const initialState = (): ArchivedTaskActivityTask => ({
  id: '',
  archivedMyTaskActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: archivedMyTaskActivityTaskState,
  listState: archivedMyTaskActivityTasksState,
  idsState: archivedMyTaskActivityTaskIdsState,
} = createState({ key, initialState })

export const taskIdsByArchivedMyTaskActivityIdState = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByArchivedMyTaskActivityIdState'),
  get:
    (archivedMyTaskActivityId: string) =>
    ({ get }) => {
      const archivedMyTaskActivityTasks = get(archivedMyTaskActivityTasksState)
      return archivedMyTaskActivityTasks
        .filter((w) => w.archivedMyTaskActivityId === archivedMyTaskActivityId)
        .map((w) => w.taskId)
    },
})
