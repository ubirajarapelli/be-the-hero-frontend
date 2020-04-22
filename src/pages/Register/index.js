import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import Api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './style.css'

const ufStyle = {
  width: 80
}

const Register = () => {

  const history = useHistory()

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ whatsapp, setWhatsapp ] = useState('')
  const [ city, setCity ] = useState('')
  const [ uf, setUf ] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const response = await Api.post('ongs', data)
      alert(`Seu ID de acesso: ${response.data.id}`)
      history.push('/')

    } catch (err) {
      alert('Erro no cadstro, tente novamente')
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero Logo"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadasto, entre na plataforma e ajude pessoas a encontrarem
          os casos da sua ONG.</p>

          <Link className="link-button" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={ e => setName(e.target.value)}

          />
          <input
            type="email"
            placeholder="e-Mail"
            value={email}
            onChange={ e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={ e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={ e => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={ufStyle}
              value={uf}
              onChange={ e => setUf(e.target.value)}
            />
          </div>
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Register
