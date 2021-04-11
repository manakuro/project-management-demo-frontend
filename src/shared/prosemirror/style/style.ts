export const proseMirrorStyle = () => ({
  '.ProseMirror ul, .ProseMirror ol': {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: '32px',
  },
  '.ProseMirror li': {
    listStyleType: 'inherit !important',
  },
  '.ProseMirror a': {
    color: 'cyan.400',
    cursor: 'pointer',
    _hover: {
      textDecoration: 'underline !important',
    },
  },
})
