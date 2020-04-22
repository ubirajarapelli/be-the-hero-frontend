import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import Api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './style.css'

const Profile = () => {

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')
  const history = useHistory()

  const getProfile = () => {
    Api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }

  const handleIncident = async (id) => {
    try {
      await Api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar, tente novamente')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    history.push('/')
  }

  const [incidents, setIncidents] = useState([])
  useEffect(getProfile, [ongId])

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Logo Be The hero"/>
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout}>
          <FiPower size={22} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        { incidents.map( incident => (
          <li key={incident.id}>
            <strong>Caso</strong>
            <p>{incident.title}</p>
            <strong>Descrição</strong>
            <p>{incident.description}</p>
            <strong>Valor</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
            <button onClick={() => handleIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8ab3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
