import Typography from 'typography'
import paul from 'paul-typography-theme'

const typography = new Typography(paul)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
