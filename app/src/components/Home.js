import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
            <div class='center' className='head'>
                <div className='Navigation'>
                    <Link to='Register'>Register</Link>
                </div>
            </div>
            <br/>
            <form id='home-page' onSubmit={onSubmit}>
                <div style={{color: 'red'}}>
                    <div>{error.username}</div><div>{error.password}</div>
                </div>
                <div>
                    <label>Username:
                        <Input onChange={onChange} value={home.username} name='username' type='text' />
                    </label>
                    <br/>
                    <label>Password:
                        <Input onChange={onChange} value={home.password} name='password' type='text' />
                    </label>
                    <br/>
                    <div className='login-style-button'>
                        <LoginButton disabled={disabled} id='login-button'>Login</LoginButton>
                    </div>
                    <br/>
                    <div className='register-style-button'>
                        <Button id='register-button'>Register</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const LoginButton = styled.button`
padding: 5px;
border-radius: 15px;
margin-top: 10px;
background-color: black;
font-size: 1.5rem;
color: white;
cursor: pointer;
`

const Button = styled.button`
padding: 5px;
border-radius: 15px;
margin-top: 10px;
background-color: black;
font-size: 1.5rem;
color: white;
cursor: pointer;
`

const Input = styled.input.attrs(props => ({
    type: 'text',
    size: props.size || '.5em',
}))`
color: black;
font-size: 1em;
border: 2px solid black;
border-radius: 3px;

margin: ${props => props.size};
padding: ${props => props.size};
`;