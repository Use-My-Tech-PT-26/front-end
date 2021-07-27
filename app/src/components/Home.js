import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'


const schema = yup.object().shape({
    username: yup.string().required('username is required').min('name must be at least 6 characters'),
    password: yup.string().required('password is required').min('name must be at least 6 characters'),
})

export default function Home () {
    const [home, setHome] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState({
        username: '',
        password: ''
    })

    const [setState] = useState({
        setHome
    })

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        schema.isValid(home).then(valid => setDisabled(!valid))
    }, [home])

    const onSubmit = evt => {
        evt.preventDefault()
        const newSignin = {
            username: home.username,
            password: home.password
        }

        axios.post('https://reqres.in/api/users', newSignin)
        .then(res => {
            setHome({
                username: '',
                password: ''
            })

            setState({
                username: home.username,
                password: home.password
            })
        })
        .catch(error => {
        })
    }

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setError({...error, [name]: ''}))
        .catch(error => setError({...error, [name]: error.errors[0]}))
    }

    const onChange = evt => {
        const { name, value, text, type } = evt.target
        const valueToUse = type === 'text' ? text : value
        setFormErrors(name, valueToUse)
        setHome({...home, [name]: valueToUse})
    }

    return(
        <div className='container'>
            <div className='head'>
                <div className='Navigation'>
                    <Link to='Register'>Register</Link>
                </div>
            </div>
            <form id='home-page' onSubmit={onSubmit}>
                <div style={{color: 'red'}}>
                    <div>{error.username}</div><div>{error.password}</div>
                </div>
                <div>
                    <label>Username
                        <input onChange={onChange} value={home.username} name='username' type='text' />
                    </label>
                    <label>Password
                        <input onChange={onChange} value={home.password} name='password' type='text' />
                    </label>
                    <div className='login-style-button'>
                        <button disabled={disabled} id='login-button'>Login</button>
                    </div>
                    <div className='register-style-button'>
                        <button to='Register' id='register-button'>Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}