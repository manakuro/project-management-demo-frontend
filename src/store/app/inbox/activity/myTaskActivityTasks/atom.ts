import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { MyTaskActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/myTaskActivityTasks/${str}`

export const initialState = (): MyTaskActivityTask => ({
  id: '',
  myTaskActivityId: '',
  taskId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: myTaskActivityTaskState,
  listState: myTaskActivityTasksState,
  idsState: myTaskActivityTaskIdsState,
} = createState({ key, initialState })

export const taskIdsByMyTaskActivityIdState = selectorFamily<string[], string>({
  key: key('taskIdsByMyTaskActivityIdState'),
  get:
    (myTaskActivityId: string) =>
    ({ get }) => {
      const myTaskActivityTasks = get(myTaskActivityTasksState)
      return myTaskActivityTasks
        .filter((w) => w.myTaskActivityId === myTaskActivityId)
        .map((w) => w.taskId)
    },
})
