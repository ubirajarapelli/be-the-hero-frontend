import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import Api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './style.css'

const Newincident = () => {
  const history = useHistory()
  const ongId = localStorage.getItem('ongId')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const handleNewIncident = async (e) => {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await Api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile')

    } catch(err) {
      alert('Erro ao cadastrar o caso, tente novamente.')
    }
  }

  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero Logo"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="link-button" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text"
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input type="text"
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Newincident
