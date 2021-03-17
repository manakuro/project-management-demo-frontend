import React from 'react'
import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from '@chakra-ui/react'
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
  BiCheck,
  BiSearch,
  BiListPlus,
  BiTime,
} from 'react-icons/bi'
import { FaTwitter, FaGithub, FaMoon } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import {
  AiFillCheckCircle,
  AiFillPlayCircle,
  AiOutlineProject,
} from 'react-icons/ai'
import { Medium } from './icons'
import { forwardRef } from 'src/shared/chakra'

type Props = ChakraIconProps & {
  icon: IconType
  size?: Sizes
}
export type IconProps = Props

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
  check: BiCheck,
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
  search: BiSearch,
  listPlus: BiListPlus,
  outlineProject: AiOutlineProject,
  time: BiTime,
} as const

export type IconType = keyof typeof icons

const sizes = {
  md: {
    w: '1.25em',
    h: '1.25em',
  },
  sm: {
    w: '1.15em',
    h: '1.15em',
  },
  xs: {
    w: '1em',
    h: '1em',
  },
} as const
type Sizes = keyof typeof sizes

export const Icon: React.FC<Props> & { id?: string } = forwardRef<Props, 'svg'>(
  (props, ref) => {
    const { size, icon, ...iconProps } = props
    const iconComponent = icons[icon]
    const sizeStyle = sizes[size ?? 'md']

    return (
      <ChakraIcon
        ref={ref}
        as={iconComponent}
        color="whiteAlpha"
        {...sizeStyle}
        {...iconProps}
      />
    )
  },
)

Icon.id = 'Icon'
