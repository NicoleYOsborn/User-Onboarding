import * as yup from 'yup'

const formSchema = yup.object().shape({
    membername: yup
    .string()
    .min(3, 'The name must be at least three characters long')
    .required('The name is a required field'),
    email: yup
      .string()
      .email()
      .required("Must include email address."),
    password: yup
      .string()
      .min(6, "Passwords must be at least 6 characters long.")
      .required("Password is Required"),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept Terms and Conditions")
      // required isn't required for checkboxes.
  });

  export default formSchema;
  