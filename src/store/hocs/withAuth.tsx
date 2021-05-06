import { useRouter } from 'next/router'

import { useMobxStores } from '~/store'
import { isServer } from '~/utils/isServer'

export const withAuth = (WrappedComponent: any) => (props: any) => {
  const router = useRouter()
  const { userStore } = useMobxStores()

  if (!isServer) {
    if (!userStore.user) {
      router.push('/login')
      return null
    }

    /* eslint-disable-next-line react/jsx-props-no-spreading */
    return <WrappedComponent {...props} />
  }

  return null
}
