import { useRouter } from 'next/router'

import { useMobxStores } from '~/store'
import { isClient } from '~/utils/env'

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter()
    const { userStore } = useMobxStores()

    if (isClient) {
      if (!userStore.user) {
        router.push('/login')
        return <></>
      }

      /* eslint-disable-next-line react/jsx-props-no-spreading */
      return <WrappedComponent {...props} />
    }

    return <></>
  }
}
