import {
  Worker,
  Viewer,
  ViewerProps,
  CharacterMap,
} from '@react-pdf-viewer/core'
import React from 'react'
import { Box } from 'src/components/atoms'

import '@react-pdf-viewer/core/lib/styles/index.css'
const packageJson = require('../../../../package.json')
const version = packageJson.dependencies['pdfjs-dist']

const characterMap: CharacterMap = {
  isCompressed: true,
  // The url has to end with "/"
  url: `https://unpkg.com/pdfjs-dist@${version}/cmaps/`,
}

type Props = ViewerProps

export const PdfViewer: React.VFC<Props> = (props) => {
  return (
    <Worker
      workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`}
    >
      <Box w="70%" h="full" className="pdfViewer">
        <Viewer characterMap={characterMap} {...props} />
      </Box>
    </Worker>
  )
}
