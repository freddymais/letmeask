import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import illustration from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { database } from '../services/firebase'

export function Home() {
  const history = useHistory()
  const { signInWithGoogle, user } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists!')
      return
    }

    history.push(`/rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Ilustraçao Repostas" />
        <strong>Crie salas de Q&amp;A</strong>
        <p>Tire as duvidas da sua audiencia em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <button className="create-room-button" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}