import React from 'react'
import { GetLayout } from 'src/@types/next'
import { Container } from 'src/pages/MyTasks'

const MyTasks: React.VFC & GetLayout = () => {
  return <Container />
}
MyTasks.getLayout = Container.getLayout

export default MyTasks
