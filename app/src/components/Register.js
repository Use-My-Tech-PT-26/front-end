import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("first name is required")
    .min("2 characters"),
  lastname: yup.string().required("last name is required").min("2 characters"),
  user: yup.boolean().oneOf([true, false], ""),
  owner: yup.boolean().oneOf([true, false], ""),
  email: yup.string().required("email is required").min("6 characters"),
  createpassword: yup.string().required("create password is required"),
  verifypassword: yup.string().required("create password is required"),
});

export default function Register(props) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    user: false,
    owner: false,
    email: "",
    createpassword: "",
    verifypassword: "",
  });

  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    user: "",
    owner: "",
    email: "",
    createpassword: "",
    verifypassword: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  const [setUser] = useState({
    setForm,
  });

  // const onSubmit = event => {
  //     event.preventDefault()
  //     const newUser = {
  //         fistname: form.firstname,
  //         lastname: form.lastname,
  //         user: form.user,
  //         owner: form.owner,
  //         email: form.email,
  //         createpassword: form.createpassword,
  //         verifypassword: form.verifypassword
  //     }

  //     axios.post('https://reqres.in/api/users', newUser)
  //     .then(res => {
  //         setForm({
  //             firstname: '',
  //             lastname: '',
  //             user: false,
  //             owner: false,
  //             email: '',
  //             createpassword: '',
  //             verifypassword: ''
  //         })

  //         setUser({
  //             firstname: form.firstname,
  //             lastname: form.lastname,
  //             user: form.user,
  //             owner: form.owner,
  //             email: form.email,
  //             createpassword: form.createpassword,
  //             verifypassword: form.verifypassword
  //         })
  //     })
  //     .catch(error => {
  //     })
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("./register", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => setError(err.response.data.error));
  };

  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setError({ ...error, [name]: "" }))
      .catch((error) => setError({ ...error, [name]: error.errors[0] }));
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  };

  return (
    <div className="container">
      <div className="head">
        <div className="Navigation">
          <Link to="/">Home</Link>
        </div>
      </div>
      <form id="register-form" onSubmit={onSubmit}>
        <div style={{ color: "red" }}>
          <div>{error.firstname}</div>
          <div>{error.lastname}</div>
          <div>{error.email}</div>
          <div>{error.phone}</div>
          <div>{error.address}</div>
          <div>{error.ssn}</div>
        </div>
        <div>
          <label>
            First Name
            <input
              onChange={onChange}
              value={form.firstname}
              name="firstname"
              type="text"
            />
          </label>
          <label>
            Last Name
            <input
              onChange={onChange}
              value={form.lastname}
              name="lastname"
              type="text"
            />
          </label>
          <label>
            User
            <input
              onChange={onChange}
              name="user"
              type="checkbox"
              checked={form.user}
            />
          </label>
          <label>
            Owner
            <input
              onChange={onChange}
              name="owner"
              type="checkbox"
              checked={form.owner}
            />
          </label>
          <label>
            Email
            <input
              onChange={onChange}
              value={form.email}
              name="email"
              type="text"
            />
          </label>
          <label>
            Create Password
            <input
              onChange={onChange}
              value={form.createpassword}
              name="create password"
              type="password"
            />
          </label>
          <label>
            Verify Password
            <input
              onChange={onChange}
              value={form.verifypassword}
              name="verify password"
              type="text"
            />
          </label>
          <div className="form-style-button">
            <Button disabled={disabled} id="register-button">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const Button = styled.button`
  padding: 5px;
  border-radius: 15px;
  margin-top: 15px;
  background-color: black;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;
