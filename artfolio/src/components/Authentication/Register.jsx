import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import pt from "prop-types";

function Register(props) {
  // eslint-disable-next-line react/prop-types
  const { errors, touched } = props;

  return (
    <Form>
      <h1>Signup to artfolio</h1>
      <Field type="text" name="username" />
      <Field type="text" name="email" />
      <Field type="date" name="dob" min="1903-01-02" max="2006-01-01" />
      <h2>Enter Your password</h2>
      <Field type="password" name="password" />
      <Field type="password" name="passwordConfirm" />
      {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
      <h2>Connect your social media</h2>
      <Field type="text" name="igHandle" />
      {touched.igHandle && errors.igHandle && <p>{errors.igHandle}</p>}
      <Field type="text" name="twHandle" />
      {touched.igHandle && errors.twHandle && <p>{errors.twHandle}</p>}
      <button type="submit">Register</button>
    </Form>
  );
}
function mapPropsToValues() {
  return {
    username: "",
    email: "",
    dob: "",
    password: "",
    passwordConfirm: "",
    igHandle: "",
    twHandle: "",
  };
}

const errInvalid = {
  username: "Please enter a valid name.",
  dob: "Please enter a valid date of birth",
  email: "Please enter a valid email.",
  password: "Your password must atleast be 8 characters long.",
  passwordConfirm: "Your passwords do not match.",
  igHandle: "That is not a valid instagram handle",
  twHandle: "That is not a valid twitter handle",
};

const errRequired = {
  username: "An username is required in order to Register",
  dob: "A date of birth is required in order to Register",
  email: "An email is required in order to signup",
  password: "A password is required in order to signup",
  passwordConfirm: "You need to confirm your password before registering",
};

const instagramRegEx = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const twitterRegEx = /\s([@#][\w_-]{1,15})/;

export default withFormik({
  mapPropsToValues,
  validationSchema: Yup.object().shape({
    username: Yup.string(errInvalid.username).required(errRequired.username),
    email: Yup.string().email(errInvalid.email).required(errRequired.email),
    dob: Yup.date(errInvalid.dob).required(errRequired.dob),
    password: Yup.string().min(8, errInvalid.password).required(errRequired.password),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], errInvalid.passwordConfirm).required(errRequired.passwordConfirm),
    igHandle: Yup.string().matches(instagramRegEx, errInvalid.igHandle),
    twHandle: Yup.string().matches(twitterRegEx, errInvalid.twHandle),
  }),
  handleSubmit(values) {
    console.log(values);
  },
})(Register);

Register.defaultProps = {
  errors: {},
  touched: {},
};

Register.propTypes = {
  errors: pt.shape({
    username: pt.string,
    email: pt.string,
    dob: pt.string,
    password: pt.string,
    passwordConfirm: pt.string,
    igHandle: pt.string,
    twHandle: pt.string,
  }),
  touched: pt.shape({
    username: pt.bool,
    email: pt.bool,
    dob: pt.bool,
    password: pt.bool,
    passwordConfirm: pt.bool,
    igHandle: pt.bool,
    twHandle: pt.bool,
  }),
};
