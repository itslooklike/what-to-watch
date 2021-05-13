import { useEffect } from 'react'
import NProgress from 'nprogress'
import { useRouter } from 'next/router'

export const useNProgress = () => {
  const router = useRouter()

  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    const handleRouteStart = () => NProgress.start()
    const handleRouteStop = () => NProgress.done()

    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteStop)
    router.events.on('routeChangeError', handleRouteStop)

    return () => {
      router.events.off('routeChangeStart', handleRouteStart)
      router.events.off('routeChangeComplete', handleRouteStop)
      router.events.off('routeChangeError', handleRouteStop)
    }
  }, [])
}
