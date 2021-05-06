import { useRouter } from 'next/router'

import { useMobxStores } from '~/store'
import { isServer } from '~/utils/isServer'

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
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
}
