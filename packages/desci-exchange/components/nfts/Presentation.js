import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Info from './Info'
import MediaGrid from './MediaGrid'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  mediaGridHolder: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    color: theme.palette.text.primary,
  },
  fullHeight: {
    height: '100%',
  },
}));

/**
 * @param {{ title: any; description: any; quantity: any; socialMediaUrl: any; publicFiles: any; backgroundImage: any; previewMode: any; lockedFilesForPreview: any; }} props
 */
export default function Presentation(props) {
  const {
    title,
    description,
    quantity,
    socialMediaUrl,
    publicFiles,
    backgroundImage,
    previewMode,
    lockedFilesForPreview,
  } = props
  const classes = useStyles()
  const [locked, setLocked] = useState(true)

  const handleToggleLock = async () => {
    setLocked((prevLocked) => !prevLocked)
  }

  let showingFiles = publicFiles
  if (previewMode && !locked) {
    showingFiles = lockedFilesForPreview
  }

  return (
    <Container maxWidth="lg" className={classes.fullHeight}>
      <Info
        title={title}
        description={description}
        quantity={quantity}
        socialMediaUrl={socialMediaUrl}
        locked={locked}
        handleToggleLock={handleToggleLock}
        previewMode={previewMode}
      />
      <div
        id="mediaGridHolder"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage?.dataUrl})` } : {}}
        className={classes.mediaGridHolder}
      >
        <MediaGrid files={showingFiles} />
      </div>
    </Container>
  )
}
