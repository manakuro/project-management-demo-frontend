import React from 'react'
import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react'
import {
  BiHome,
  BiSun,
  BiMenu,
  BiCompass,
  BiCodeAlt,
  BiCheckCircle,
  BiBell,
  BiNotification,
  BiBarChart,
  BiRocket,
  BiIdCard,
  BiHelpCircle,
  BiUserPlus,
  BiTrashAlt,
  BiGridAlt,
  BiTask,
} from 'react-icons/bi'
import { FaTwitter, FaGithub, FaMoon } from 'react-icons/fa'
import { Medium } from './icons'

type Props = IconProps & {
  icon: IconType
}

const icons = {
  home: BiHome,
  twitter: FaTwitter,
  github: FaGithub,
  medium: Medium,
  moon: FaMoon,
  sun: BiSun,
  menu: BiMenu,
  compass: BiCompass,
  codeAlt: BiCodeAlt,
  checkCircle: BiCheckCircle,
  bell: BiBell,
  notification: BiNotification,
  barChart: BiBarChart,
  rocket: BiRocket,
  idCard: BiIdCard,
  help: BiHelpCircle,
  userPlus: BiUserPlus,
  trashAlt: BiTrashAlt,
  gridAlt: BiGridAlt,
  task: BiTask,
} as const

export type IconType = keyof typeof icons

export const Icon: React.FC<Props> = (props) => {
  const icon = icons[props.icon]

  return (
    <ChakraIcon as={icon} color="whiteAlpha" w="1.25em" h="1.25em" {...props} />
  )
}
