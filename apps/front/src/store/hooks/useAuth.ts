import { useRouter } from 'next/router'

import { useMobxStores } from '~/store'
import { isClient } from '~/utils/env'

export const useAuth = () => {
  const router = useRouter()
  const { userStore } = useMobxStores()

  if (isClient) {
    if (!userStore.user) {
      router.push('/login')
    }
  }
}
