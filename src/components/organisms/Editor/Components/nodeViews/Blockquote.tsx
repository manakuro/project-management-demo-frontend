import { Box } from 'src/components/atoms'
import React from 'react'
// import { useReactNodeView } from "./ReactNodeView";

export const Blockquote: React.FC = ({ children }) => {
  // const context = useReactNodeView();
  // console.log(context);
  console.log('Blockquote!')
  return (
    <Box pl={5} borderLeftWidth="5px" borderLeftColor="gray.800">
      {children}
    </Box>
  )
}
