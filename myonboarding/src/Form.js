import React from 'react'

function Form(props) {
    const {
        values,
        onInputChange,
        onSubmit,
        // 🔥🔥🔥 ADDITIONAL PROPS NEEDED 🔥🔥🔥
        disabled,
        errors,
        onCheckboxChange,
      } = props

    return (
      <form className='form-container' onSubmit={onSubmit}>
          
          
          <label htmlFor="memberNameInput">
          Name
          <input id="memberNameInput" value={values.membername} onChange={onInputChange} type="text" name="membername" placeholder="First and Last Name" />
        </label>
        <label htmlFor="emailInput">
          Email
          <input id="emailInput" value={values.email} onChange={onInputChange}type="email" name="email" placeholder="Email" />
        </label>
        <label htmlFor="passwordInput">
          Password
          <input id="passwordInput" value={values.password} onChange={onInputChange} type="password" name="password" placeholder="Password" />
        </label>
        <label htmlFor="termsInput">
          Do you agree to the terms and conditions?
          <input id="termsInput" onChange={onCheckboxChange}  type="checkbox" name="terms" value={values.terms} />
        </label>
        <button disabled={disabled}>Submit!</button>

        <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.membername}</div>
          <div>{errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}</div>
          <div>{errors.password.length > 6 ? (<p className="error">{errors.password}</p>) : null}</div>
          <div>{errors.terms}</div>
        </div>
      </form>
    );
}
 export default Form;