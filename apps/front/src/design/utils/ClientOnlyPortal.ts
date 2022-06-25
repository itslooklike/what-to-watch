import { useRef, useEffect, useState, FC } from 'react'
import { createPortal } from 'react-dom'

import { portalId } from '~/utils/config'

export const ClientOnlyPortal: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const ref = useRef<ReturnType<typeof document.querySelector>>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(`#${portalId}`)
    setMounted(true)
  }, [])

  if (mounted && ref.current) {
    return createPortal(children, ref.current)
  }

  return null
}
