import React from 'react'
import { GetLayout } from 'src/@types/next'
import { Container } from 'src/pages/Projects'

const Projects: React.VFC & GetLayout = () => {
  return <Container />
}
Projects.getLayout = Container.getLayout

export default Projects
