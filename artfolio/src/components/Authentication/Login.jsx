import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function Login(props) {
  const { errors, touched } = props;
  return (
    <Form>
      <Field type="text" name="email" placeholder="johndoe@email.com" />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="password" name="password" placeholder="1234Love is the most used password" />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <button type="submit">Login</button>
    </Form>
  );
}

const invalid = {
  email: "Please enter a valid email.",
  password: "Your password must atleast be 8 characters long.",
};

const required = {
  email: "An email is required in order to login",
  password: "A password is required in order to login",
};

const LoginFormik = withFormik({
  mapPropsToValues() {
    return {
      email: "",
      password: "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email(invalid.email).required(required.email),
    password: Yup.string().min(8, invalid.password).required(required.password),
  }),
  handleSubmit(values) {
    // { resetForm, setErrors, setSubmitting } pass as second arg if server sends back error
    const user = {
      email: values.email,
      password: values.password,
    };
    console.log(user);
  },
})(Login);

export default LoginFormik;
