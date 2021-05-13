import React from 'react'
import { Box } from 'src/components/atoms'
import { Worker, Viewer, ViewerProps } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'

type Props = ViewerProps

export const PdfViewer: React.VFC<Props> = (props) => {
  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js">
      <Box w="80%" h="full" className="pdfViewer">
        <Viewer {...props} />
      </Box>
    </Worker>
  )
}
