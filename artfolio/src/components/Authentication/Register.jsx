import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import pt from "prop-types";
import { registerUser } from "../../redux/actions/actionCreators";
import { registerInvalid, registerRequired } from "../../constants";

function Register(props) {
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

const instagramRegEx = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const twitterRegEx = /\s([@#][\w_-]{1,15})/;

const RegisterFormik = withFormik({
  mapPropsToValues,
  validationSchema: Yup.object().shape({
    username: Yup.string(registerInvalid.username).min(6).required(registerRequired.username),
    email: Yup.string().email(registerInvalid.email).required(registerRequired.email),
    dob: Yup.date(registerInvalid.dob).required(registerRequired.dob),
    password: Yup.string().min(8, registerInvalid.password).required(registerRequired.password),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], registerInvalid.passwordConfirm).required(registerRequired.passwordConfirm),
    igHandle: Yup.string().matches(instagramRegEx, registerInvalid.igHandle),
    twHandle: Yup.string().matches(twitterRegEx, registerInvalid.twHandle),
  }),
  handleSubmit(values, { props, setSubmitting }) {
    props.registerUser(values);
    setSubmitting(false);
  },
})(Register);

export default connect(state => state, { registerUser })(RegisterFormik);

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
