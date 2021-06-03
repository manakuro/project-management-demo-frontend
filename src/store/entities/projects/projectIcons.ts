import { IconType } from 'src/shared/icons'

type Icon = {
  id: string
  icon: IconType
}

export const projectIcons: Icon[] = [
  {
    id: '1',
    icon: 'play',
  },

  {
    id: '2',
    icon: 'home',
  },

  {
    id: '3',
    icon: 'moon',
  },

  {
    id: '4',
    icon: 'sun',
  },

  {
    id: '5',
    icon: 'menu',
  },

  {
    id: '6',
    icon: 'codeAlt',
  },

  {
    id: '7',
    icon: 'rocket',
  },

  {
    id: '8',
    icon: 'idCard',
  },

  {
    id: '9',
    icon: 'trashAlt',
  },
  {
    id: '10',
    icon: 'task',
  },
  {
    id: '11',
    icon: 'bell',
  },
  {
    id: '12',
    icon: 'notification',
  },
  {
    id: '13',
    icon: 'barChart',
  },
  {
    id: '14',
    icon: 'bookOpen',
  },
  {
    id: '15',
    icon: 'layerPlus',
  },
  {
    id: '16',
    icon: 'mobile',
  },
  {
    id: '17',
    icon: 'movie',
  },
  {
    id: '18',
    icon: 'shapePolygon',
  },
  {
    id: '19',
    icon: 'spreadsheet',
  },
  {
    id: '20',
    icon: 'layout',
  },
]
export const findProjectIcon = (id: string) =>
  projectIcons.find((p) => p.id === id)!
