import React, {useState, useEffect } from 'react';
import Form from './Form';
import formSchema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'
import './App.css';

const initialFormValues = {
  membername: "",
  email: "",
  password: "",
  terms: false
  
};
const initialFormErrors = {
  membername: '',
  email: '',
  password: '',
}
const initialMembers=[]


function App() {
  const [members, setMembers] = useState(initialMembers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(true)


  const postNewMember = newMember => {

    axios.post('https://reqres.in/api/users', newMember)
      .then(res => {
        setMembers([res.data, ...members])
        console.log(res.data)
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const onInputChange = e => {
    /* e.persist allows us to use the synthetic event in an async manner.
    We need to be able to use it after the form validation */
    e.persist();
    const name = e.target.name
    const value = e.target.value
    yup
    .reach(formSchema, name)
    //we can then run validate using the value
    .validate(value)
    // if the validation is successful, we can clear the error message
    .then(()=> {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });

    })
    /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      });
    });

  // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
  setFormValues({
    ...formValues,
    [name]: value
  });
};
const onCheckboxChange = evt => {
 console.log(evt.target.value)
  // a) pull the `name` of the checkbox from the event
  const { name } = evt.target
  // b) pull whether `checked` true or false, from the event
  const { checked } = evt.target.value

  // c) set a new state for the whole form
  setFormValues({
    ...formValues,
    // override one thing inside formvalues
    [name]: !checked,  // NOT AN ARRAY
    
  })
}

const onSubmit = evt => {
  evt.preventDefault()

  const newMember = {
    membername: formValues.membername.trim(),
    email: formValues.email.trim(),
    password: formValues.password,
    
  
  }
  console.log(JSON.stringify(newMember))
  postNewMember(newMember)
}

useEffect(() => {
  formSchema.isValid(formValues)
    .then(valid => setDisabled(!valid))
}, [formValues])

  return (
    <div className="App">
      <header>
        <h1>
          My Onboarding App
        </h1>
      </header>
      <Form 
      values={formValues}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      disabled={disabled}
      errors={formErrors}
      onCheckboxChange={onCheckboxChange}/>
      <pre>{JSON.stringify(members, null, 2)}</pre>
    </div>
  );
}

export default App;
