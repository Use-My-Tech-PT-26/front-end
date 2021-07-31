import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const schema = yup.object().shape({
    firstname: yup.string().required('first name is required').min('2 characters'),
    lastname: yup.string().required('last name is required').min('2 characters'),
    user: yup.boolean().oneOf([true, false], ''),
    owner: yup.boolean().oneOf([true, false], ''),
    email: yup.string().required('email is required').min('6 characters'),
    createpassword: yup.string().required('create password is required'),
    verifypassword: yup.string().required('create password is required')
}) 

export default function Register (props){
    const [form, setForm] = useState ({
        firstname: '',
        lastname: '',
        user: false,
        owner: false,
        email: '',
        createpassword: '',
        verifypassword: ''
    })

    const [error, setError] = useState({
        firstname: '',
        lastname: '',
        user: '',
        owner: '',
        email: '',
        createpassword: '',
        verifypassword: ''
    })

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        schema.isValid(form).then(valid => setDisabled(!valid))
    }, [form])
  

    const [setUser] = useState({
        setForm
    })

    const onSubmit = event => {
        event.preventDefault()
        const newUser = {
            fistname: form.firstname,
            lastname: form.lastname,
            user: form.user,
            owner: form.owner,
            email: form.email,
            createpassword: form.createpassword,
            verifypassword: form.verifypassword
        }

        axios.post('https://reqres.in/api/users', newUser)
        .then(res => {
            setForm({
                firstname: '',
                lastname: '',
                user: false,
                owner: false,
                email: '',
                createpassword: '',
                verifypassword: ''
            })

            setUser({
                firstname: form.firstname,
                lastname: form.lastname,
                user: form.user,
                owner: form.owner,
                email: form.email,
                createpassword: form.createpassword,
                verifypassword: form.verifypassword
            })
        })
        .catch(error => {
        })
    }

    const setFormErrors = (name,value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setError({...error, [name]: ''}))
        .catch(error => setError({...error, [name]: error.errors[0]}))
    }

    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        setFormErrors(name, valueToUse)
        setForm({...form, [name]: valueToUse})
    }

    return(
        <div className= 'container'>
            <div className= 'head'>
                <div className='Navigation'>
                    <Link to='/'>Home</Link>
                </div>
            </div>
            <br/>
            <form id='register-form' onSubmit={onSubmit}>
                <div style= {{color: 'red'}}>
                    <div>{error.firstname}</div><div>{error.lastname}</div><div>{error.email}</div><div>{error.phone}</div><div>{error.address}</div><div>{error.ssn}</div>
                </div>
            <div>
            <label>First Name:
                <Input onChange={onChange} value={form.firstname} name='firstname' type='text' />
            </label>
            <br/>
            <label>Last Name:
                <Input onChange={onChange} value={form.lastname} name='lastname' type='text' />
            </label>
            <br/>
            <label>User:
                <Input onChange={onChange}  name='user' type='checkbox' checked={form.user} />
            </label>
            <br/>
            <label>Owner:
                <Input onChange={onChange} name='owner' type='checkbox' checked={form.owner} />
            </label>
            <br/>
            <label>Email:
                <Input onChange={onChange} value={form.email} name='email' type='text' />
            </label>
            <br/>
            <label>Create Password:
                <Input onChange={onChange} value={form.createpassword} name='create password' type='text' />
            </label>
            <br/>
            <label>Verify Password:
                <Input onChange={onChange} value={form.verifypassword} name='verify password' type='text' />
            </label>
            <br/>
            <div className='form-style-button'>
                <Button disabled={disabled} id='register-button'>Submit</Button>
            </div>
        </div>
     </form>
    </div>
    )

}

const Button = styled.button`
padding: 5px;
border-radius: 15px;
margin-top: 15px;
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