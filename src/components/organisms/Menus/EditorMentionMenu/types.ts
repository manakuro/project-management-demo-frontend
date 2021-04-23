export const MENTION_TYPE = {
  TEAMMATE: 1,
  TASK: 2,
  PROJECT: 3,
  WORKSPACE: 4,
} as const

type BaseMention = {
  id: number
  type: ValueOf<typeof MENTION_TYPE>
  text: string
  href: string
  title: string
}
export type MentionTeammate = BaseMention & {
  subTitle: string
  image: string
}
export type MentionTask = BaseMention & {
  subTitle: string
  idDone: boolean
}
export type MentionProject = BaseMention & {}
export type MentionWorkspace = BaseMention & {}

export type MentionItem =
  | MentionTeammate
  | MentionTask
  | MentionProject
  | MentionWorkspace
