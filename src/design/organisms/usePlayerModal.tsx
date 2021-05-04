import { useState } from 'react'

import { Modal } from '~/design/atoms'
import { Player } from '~/design/molecules'
import type { IFilm } from '~/store/FilmsStore'

export const usePlayerModal = (film: IFilm) => {
  const [showPlayer, setPlayer] = useState(false)

  const handleOpenPlayer = () => setPlayer(true)

  const handleClosePlayer = () => setPlayer(false)

  const playerModal = showPlayer && (
    <Modal>
      <Player film={film} onClose={handleClosePlayer} />
    </Modal>
  )

  return {
    playerModal,
    handleOpenPlayer,
    handleClosePlayer,
  }
}
