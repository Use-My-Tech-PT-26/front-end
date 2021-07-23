import React from 'react'
import * as yup from 'yup'
import axios from 'axios'

const schema = yup.object().shape({
    username: yup.string().required('username is required').min('name must be at least 6 characters'),
    password: yup.string().required('password is required').min('name must be at least 6 characters'),
})

export default function Home (props) {
    const { values,  }
}