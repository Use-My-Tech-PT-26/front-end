import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'

const schema = yup.object().shape({
    firstname: yup.string().required('first name is required').min('2 characters'),
    lastname: yup.string().required('last name is required').min('2 characters'),
    male: yup.boolean().oneOf([true, false], ''),
    female: yup.boolean().oneOf([true, false], ''),
    email: yup.string().required('email is required').min('6 characters'),
    phone: yup.string().required('phone is required'),
    address: yup.string().required('address is required'),
    ssn: yup.string().required('ssn is required')
})

export default function Register (){
    const [form, setForm] = useState ({
        firstname: '',
        lastname: '',
        male: false,
        female: false,
        email: '',
        phone: '',
        address: ''
    })

    const [error, setError] = useState({
        firstname: '',
        lastname: '',
        male: '',
        female: '',
        email: '',
        phone: '',
        address: ''
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
            male: form.male,
            female: form.female,
            email: form.email,
            phone: form.phone,
            address: form.address
        }

        axios.post('https://reqres.in/api/users', newUser)
        .then(res => {
            setForm({
                firstname: '',
                lastname: '',
                male: false,
                female: false,
                email: '',
                phone: '',
                address: ''
            })

            setUser({
                firstname: form.firstname,
                lastname: form.lastname,
                male: form.male,
                female: form.female,
                email: form.email,
                phone: form.phone,
                address: form.address
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
                    <Link>Register</Link>
                </div>
            </div>
            <form id='register-form' onSubmit={onSubmit}>
                <div style= {{color: 'red'}}>
                    <div>{error.firstname}</div><div>{error.lastname}</div><div>{error.email}</div><div>{error.phone}</div><div>{error.address}</div><div>{error.ssn}</div>
                </div>
            <div>
            <label>First Name
                <input onChange={onChange} value={form.firstname} name='firstname' type='text' />
            </label>
            <label>Last Name
                <input onChange={onChange} value={form.lastname} name='lastname' type='text' />
            </label>
            <label>Male
                <input onChange={onChange}  name='male' type='checkbox' checked={form.male} />
            </label>
            <label>Female
                <input onChange={onChange} name='female' type='checkbox' checked={form.female} />
            </label>
            <label>Email
                <input onChange={onChange} value={form.email} name='email' type='text' />
            </label>
            <label>Phone
                <input onChange={onChange} value={form.phone} name='phone' type='text' />
            </label>
            <label>Address
                <input onChange={onChange} value={form.address} name='address' type='text' />
            </label>
            <label>SSN
                <input onChange={onChange} value={form.ssn} name='ssn' type='text' />
            </label>
            <div className='form-style-button'>
                <button disabled={disabled} id='register-button'>Submit</button>
            </div>
        </div>
     </form>
    </div>
    )
  
}