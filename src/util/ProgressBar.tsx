"use client"
import { AppProgressBar } from 'next-nprogress-bar';

type props = {}

const ProgressBar = (props: props) => {
  return (
    <>
      <AppProgressBar
        height="4px"
        color="#29D"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default ProgressBar
