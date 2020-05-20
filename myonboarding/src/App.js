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
  terms: false,
};
const initialFormErrors = {
  membername: '',
  email: '',
  password: '',
  terms: '',
}
const initialMembers=[]
const initialDisabled = true

function App() {
  const [members, setMembers] = useState(initialMembers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // const getMembers = () => {
  //   // 🔥 STEP 6- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
  //   //    helper to [GET] all friends from `http://localhost:4000/friends`
  //   axios.get('http://localhost:4000/members')
  //     .then(res => {
  //       setMembers(res.data)
  //     })
  //     .catch(err => {
  //       debugger
  //     })
  // }

  const postNewMember = newMember => {
    // 🔥 STEP 7- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://localhost:4000/friends`
    //    and regardless of success or failure, the form should reset
    axios.post('https://reqres.in/api/users', newMember)
      .then(res => {
        setMembers([res.data, ...members])
        // getFriends() // the price of triggering a new 'getFriends`
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

    yup
    .reach(formSchema, e.target.name)
    //we can then run validate using the value
    .validate(e.target.value)
    // if the validation is successful, we can clear the error message
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ""
      });
    })
    /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [e.target.name]: err.errors[0]
      });
    });

  // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
  setFormValues({
    ...formValues,
    [e.target.name]: e.target.value
  });
};
const onCheckboxChange = evt => {
  // 🔥 STEP 8- IMPLEMENT!
  // a) pull the `name` of the checkbox from the event
  const { name } = evt.target
  // b) pull whether `checked` true or false, from the event
  const { checked } = evt.target

  // c) set a new state for the whole form
  setFormValues({
    // copy formvalues
    ...formValues,
    // override one thing inside formvalues
    terms: {
      // copy the current hobbies
      ...formValues.terms,
      // override one of the hobbies
      [name]: checked,  // NOT AN ARRAY
    }
  })
}

const onSubmit = evt => {
  evt.preventDefault()

  const newMember = {
    membername: formValues.membrname.trim(),
    email: formValues.email.trim(),
    password: formValues.password,
    terms: formValues.terms === true,
  
  }
  postNewMember(newMember)
}

useEffect(() => {
  /* We pass the entire state into the entire schema, no need to use reach here. 
  We want to make sure it is all valid before we allow a user to submit
  isValid comes from Yup directly */
  formSchema.isValid(formValues).then(valid => {
    setDisabled(!valid);
  });
}, [formValues]);

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
      onCheckBoxChange={onCheckboxChange}/>
    </div>
  );
}

export default App;
