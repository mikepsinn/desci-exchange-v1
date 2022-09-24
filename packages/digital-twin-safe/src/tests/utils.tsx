import { FC, ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk'
import React from 'react'
import {CircularProgress, DialogTitle} from "@material-ui/core";

type Props = {
  children: React.ReactNode
}

const AllTheProviders: FC<Props> = ({ children }) => {
  return (


        <SafeProvider
          loader={
            <>
              <DialogTitle>Waiting for Safe...</DialogTitle>
                <CircularProgress size="md" />
            </>
          }
        >
          {children}
        </SafeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
