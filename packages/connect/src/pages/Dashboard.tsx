import { ReactElement } from 'react'
import { Box } from '@material-ui/core'
import DigitalTwinDashboard from "../components";
import Inbox from "./Inbox";

const Home = (): ReactElement => {
  return (
    <Inbox>
      <Box pb={3}>
        <DigitalTwinDashboard />
      </Box>
    </Inbox>
  )
}

export default Home
