import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import pt from "prop-types";
import { loginUser } from "../../redux/actions/actionCreators";
import { requiredLogin, loginInvalid } from "../../constants";

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
function mapPropsToValues() {
  return {
    email: "",
    password: "",
  };
}

const valSchema = async () => (
  Yup.object().shape({
    email: Yup.string().email(loginInvalid.email).required(requiredLogin.email),
    password: Yup.string().min(8, loginInvalid.password).required(requiredLogin.password),
  })
);

const LoginFormik = withFormik({
  mapPropsToValues,
  validationSchema: valSchema,
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const errors = await props.loginUser(values);
    if (errors) {
      setErrors(errors);
    }
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
