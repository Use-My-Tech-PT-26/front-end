import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object().shape({
    firstname: yup.string().required('first name is required').min('name must be at least 2 characters'),
    lastname: yup.string().required('last name is required').min('name must be at least 2 characters'),
    email: yup.string().required('email is required').min('email must be at least 6 characters'),
    phone: yup.string().required('phone is required'),
    address: yup.string().required('address is required'),
    ssn: yup.string().required('ssn is required'),
    income: yup.string().required('income is required')
})

export default function Register (props){
    const { values, submit, errors, disabled, form } = props
    
    const onChange = event => {
        const { text, value, name, type } = event.target
        const valueToUse = type === 'text' ? text : value
        setFormErrors(name, valueToUse)
        setForm({ ...Form, [name] : valueToUse })
    }
    
    const onSubmit = event => {
        event.preventDefault()
        submit()
    }
    
    const { form, setForm } = useState([])
    const { formErrors, setFormErrors } = useState(FormErrors)
    const { formValues, setFormValues } = useState(FormValues)
    const { disabled, setDisabled } = useState(true)

    const newFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
        .then(() => setFormErrors({ ...formErrors, [firstname]: '' }))
        .catch(err => setFormErrors({ ...formErrors, [firstname]: errors.errors[0] }))
        setFormValues({ ...formValues, [name]: value })
    }
  

    const newForm = (newForm) => {
        axios.post('https://reqres.in/api/orders', newForm)
        .then(res => {
            setForm([ ...form, res.data ])
            setFormValues(FormValues)
        })
      }
    
      const OnSubmit = event => {
        const newUser = { 
          firstname: formValues.firstname.trim(), 
          lastname: formValues.lastname.trim(), 
          email: formValues.email, 
          phone: formValues.phone, 
          address: formValues.address, 
          ssn: formValues.ssn, 
          income: formValues.income }
    }
    console.log('You are registered!', newUser)
    chooseNewOrder(newUser)
    setFormValues(FormValues)

    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

    return(
        <div className= 'container'>
            <div className= 'head'></div>
            <form id='register-form' onSubmit={onSubmit}>
                <div>{errors.firstname}</div><div>{errors.lastname}</div><div>{errors.email}</div><div>{errors.phone}</div><div>{errors.address}</div><div>{errors.ssn}</div><div>{errors.income}</div>
            </form>
            <div>
            <label>First Name
                <input onChange={onChange} value={values.firstname} name='firstname' type='text' />
            </label>
            <label>Last Name
                <input onChange={onChange} value={values.lastname} name='lastname' type='text' />
            </label>
            <label>Email
                <input onChange={onChange} value={values.email} name='email' type='text' />
            </label>
            <label>Phone
                <input onChange={onChange} value={values.phone} name='phone' type='text' />
            </label>
            <label>Address
                <input onChange={onChange} value={values.address} name='address' type='text' />
            </label>
            <label>SSN
                <input onChange={onChange} value={values.ssn} name='ssn' type='text' />
            </label>
            <label>Income
                <input onChange={onChange} value={values.income} name='income' type='text' /> 
            </label>
            <div className='form-style-button'>
                <button disabled={disabled} id='register-button'>Submit</button>
            </div>
        </div>
        </div>
    )
  
}




