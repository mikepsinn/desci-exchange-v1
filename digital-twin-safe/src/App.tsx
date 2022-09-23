import React, { useCallback } from 'react'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import {Button, Container, DialogTitle} from "@material-ui/core";


const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK()

  const submitTx = useCallback(async () => {
    try {
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: safe.safeAddress,
            value: '0',
            data: '0x',
          },
        ],
      })
      console.log({ safeTxHash })
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash)
      console.log({ safeTx })
    } catch (e) {
      console.error(e)
    }
  }, [safe, sdk])

  return (
    <Container>
      <DialogTitle>Safe: {safe.safeAddress}</DialogTitle>

      <Button color="primary" onClick={submitTx}>
        Click to send a test transaction
      </Button>

    </Container>
  )
}

export default SafeApp
