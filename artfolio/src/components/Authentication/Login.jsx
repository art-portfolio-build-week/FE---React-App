import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import pt from "prop-types";
import { loginUser } from "../../redux/actions/actionCreators";
import { loginURL } from "../../constants";

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
  handleSubmit(values, { props, setSubmitting }) {
    // { resetForm, setErrors, setSubmitting } pass as second arg if server sends back error
    props.loginUser(loginURL, values);
    setSubmitting(false);
  },
})(Login);

export default connect(state => state, { loginUser })(LoginFormik);

Login.defaultProps = {
  errors: {},
  touched: {},
};

Login.propTypes = {
  errors: pt.shape({
    email: pt.string,
    password: pt.string,
  }),
  touched: pt.shape({
    email: pt.bool,
    password: pt.bool,
  }),
};
