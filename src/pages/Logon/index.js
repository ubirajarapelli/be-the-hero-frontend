import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import Api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import './style.css'

const Logon = () => {
  const history = useHistory()

  const [ id, setId ] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await Api.post('sessions', { id })

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')

    } catch (err) {
      alert('Erro na tentativa de login')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero Logo"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={ e => setId(e.target.value)}
          />
          <button className="button">Entrar</button>

          <Link className="link-button" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro</Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes"/>
    </div>
  )
}

export default Logon
