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
  BiBookOpen,
  BiLayerPlus,
  BiMobile,
  BiGridHorizontal,
  BiChevronRight,
  BiCopyAlt,
  BiX,
  BiChevronDown,
  BiChevronLeft,
  BiPlay,
  BiPause,
  BiPlayCircle,
  BiMovie,
  BiShapePolygon,
  BiPlus,
  BiSpreadsheet,
  BiFileBlank,
  BiLayout,
  BiDotsHorizontalRounded,
  BiMessageRoundedDots,
} from 'react-icons/bi'
import { FaTwitter, FaGithub, FaMoon } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { AiFillCheckCircle, AiFillPlayCircle } from 'react-icons/ai'
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
  checkCircleFilled: AiFillCheckCircle,
  bell: BiBell,
  notification: BiNotification,
  barChart: BiBarChart,
  rocket: BiRocket,
  idCard: BiIdCard,
  help: BiHelpCircle,
  userPlus: BiUserPlus,
  trashAlt: BiTrashAlt,
  gridAlt: BiGridAlt,
  gridHorizontal: BiGridHorizontal,
  task: BiTask,
  bookOpen: BiBookOpen,
  layerPlus: BiLayerPlus,
  mobile: BiMobile,
  chevronRight: BiChevronRight,
  chevronDown: BiChevronDown,
  chevronLeft: BiChevronLeft,
  copyAlt: BiCopyAlt,
  playCircle: AiFillPlayCircle,
  playCircleOutline: BiPlayCircle,
  play: BiPlay,
  pause: BiPause,
  x: BiX,
  movie: BiMovie,
  shapePolygon: BiShapePolygon,
  plus: BiPlus,
  spreadsheet: BiSpreadsheet,
  fileBlank: BiFileBlank,
  layout: BiLayout,
  dotsHorizontalRounded: BiDotsHorizontalRounded,
  mailOutline: HiOutlineMail,
  messageRoundedDots: BiMessageRoundedDots,
} as const

export type IconType = keyof typeof icons

export const Icon: React.FC<Props> = (props) => {
  const icon = icons[props.icon]

  return (
    <ChakraIcon as={icon} color="whiteAlpha" w="1.25em" h="1.25em" {...props} />
  )
}
