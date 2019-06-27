import React from "react";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import styled from "styled-components";
import pt from "prop-types";
import { registerUser } from "../../redux/actions/actionCreators";
import { registerInvalid, registerRequired } from "../../constants";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  section{
    display: flex;
    justify-content: space-between;
    div{
      display: flex;
      flex-direction: column;
      width: 48%;
    }
  }
`;

function Register(props) {
  const { errors, touched } = props;

  return (
    <StyledForm>
      <h2>First Name</h2>
      <Field type="text" name="fistName" placeholder="John" />

      <h2>Last Name</h2>
      <Field type="text" name="lastName" placeholder="Doe" />

      <h2>Email Adress</h2>
      <Field type="text" name="email" placeholder="johndoe@email.com" />

      <h2>Date Of Birth</h2>
      <Field type="date" name="dob" min="1903-01-02" max="2006-01-01" />
      <section>
        <div>
          <h2>Password</h2>
          <Field type="password" name="password" />
        </div>
        <div>
          <h2>Password Confirmation</h2>
          <Field type="password" name="passwordConfirm" />
        </div>
      </section>
      {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
      <Field type="text" name="phone" />
      <Field type="text" component="textarea" name="uvp" />
      <button type="submit">Register</button>
    </StyledForm>
  );
}

function mapPropsToValues() {
  return {
    fistName: "",
    lastName: "",
    email: "",
    dob: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    uvp: "",
  };
}

const instagramRegEx = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const twitterRegEx = /\s([@#][\w_-]{1,15})/;

const valSchema = async () => (
  Yup.object().shape({
    // username: Yup.string(registerInvalid.username).min(6).required(registerRequired.username),
    email: Yup.string().email(registerInvalid.email).required(registerRequired.email),
    dob: Yup.date(registerInvalid.dob).required(registerRequired.dob),
    password: Yup.string().min(8, registerInvalid.password).required(registerRequired.password),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], registerInvalid.passwordConfirm).required(registerRequired.passwordConfirm),
    igHandle: Yup.string().matches(instagramRegEx, registerInvalid.igHandle),
    twHandle: Yup.string().matches(twitterRegEx, registerInvalid.twHandle),
  })
);

const RegisterFormik = withFormik({
  validationSchema: valSchema,
  mapPropsToValues,
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const newUser = {
      username: `${values.fistName} ${values.lastName}`,
      password: values.password,
      email: values.email,
      dob: values.dob,
      phone: values.phone,
      uvp: values.uvp,
    };
    const errors = await props.registerUser(newUser);
    if (errors) {
      setErrors(errors);
    }
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
