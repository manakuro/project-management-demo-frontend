import React from 'react'
import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react'
import { BiHome, BiPaint, BiSun } from 'react-icons/bi'
import {
  FaTwitter,
  FaGithub,
  FaReact,
  FaVuejs,
  FaCode,
  FaLinkedinIn,
  FaMoon,
} from 'react-icons/fa'
import { VscRuby } from 'react-icons/vsc'
import { Apollo, Golang, Medium, SingleSPA, GCP } from './icons'
import {
  SiJest,
  SiBabel,
  SiSwift,
  SiTypescript,
  SiFirebase,
  SiGraphql,
  SiMaterialUi,
  SiStyledComponents,
  SiNextDotJs,
  SiCircleci,
  SiWebpack,
  SiAboutDotMe,
} from 'react-icons/si'
import { useColorModeValue } from '@chakra-ui/color-mode'

type Props = IconProps & {
  icon: IconType
}

const icons = {
  home: BiHome,
  twitter: FaTwitter,
  github: FaGithub,
  medium: Medium,
  react: FaReact,
  vue: FaVuejs,
  golang: Golang,
  singleSPA: SingleSPA,
  apollo: Apollo,
  jest: SiJest,
  babel: SiBabel,
  swift: SiSwift,
  typescript: SiTypescript,
  firebase: SiFirebase,
  graphql: SiGraphql,
  gcp: GCP,
  styledComponent: SiStyledComponents,
  material: SiMaterialUi,
  nextjs: SiNextDotJs,
  circleci: SiCircleci,
  ruby: VscRuby,
  code: FaCode,
  linkedin: FaLinkedinIn,
  webpack: SiWebpack,
  me: SiAboutDotMe,
  paint: BiPaint,
  moon: FaMoon,
  sun: BiSun,

  // TODO
  wallaby: () => null,
  danger: () => null,
} as const

export type IconType = keyof typeof icons

export const Icon: React.FC<Props> = (props) => {
  const icon = icons[props.icon]
  const color = useColorModeValue('gray.700', 'whiteAlpha')

  return <ChakraIcon as={icon} color={color} {...props} />
}
