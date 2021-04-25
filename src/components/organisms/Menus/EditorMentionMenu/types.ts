export const MENTION_TYPE = {
  TEAMMATE: 1,
  TASK: 2,
  PROJECT: 3,
  WORKSPACE: 4,
} as const

export type MentionType = ValueOf<typeof MENTION_TYPE>

type BaseMention = {
  id: number
  type: MentionType
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
export type MentionProject = BaseMention & {
  projectId: string
}
export type MentionWorkspace = BaseMention & {}

export type MentionItem =
  | MentionTeammate
  | MentionTask
  | MentionProject
  | MentionWorkspace
