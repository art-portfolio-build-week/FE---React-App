import React from "react";
import { Redirect } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import styled from "styled-components";
import pt from "prop-types";
import { registerUser } from "../../redux/actions/actionCreators";
import { registerInvalid, registerRequired } from "../../constants";
import loginImage from "../../assets/images/loginImage.jpeg";

// import styling
import {
  Button,
  flexColumn,
  sadBabyBlue,
  navyBlue,
  Image,
} from "../../assets/styling";

const StyledForm = styled(Form)`
  ${flexColumn};
  justify-content: space-around;
  align-items: center;
  width: 30%;
  @media (max-width: 1250px){
    width: 80%
  }
  @media (max-width: 650px){
    width: 100%;
    text-align: center;
  }
  input{
      height: 4rem;
      width: 100%;
      padding: 1rem;
      border:2px solid #979797;
      border-radius: 4px;
  }
  h2{
    margin-top: 2.5rem;
    word-break: keep-all;
    white-space: nowrap;
    line-height: 2;
    align-self: flex-start;
    font-size: 2rem;
    font-family: "lato";
    font-weight: 600;
  @media (max-width: 650px){
    width: 100%;
    text-align: center;
    align-self: center;
  }
  }
  .password{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    div{
      display: flex;
      flex-direction: column;
      width: 48%;
    }
    .error{
      width: 100%;
    }
  }
  textarea{
    height: 8rem;
    width: 100%;
    resize: none;
    padding: 0.5rem;
    border: 0.2rem solid #979797;
    border-radius: 0.2rem;
  }
  button{
    margin-top: 5rem;
    background-color: white;
    color: #171D21;
    border: 3px solid #171D21;
    &:hover{
      transition: 0.2s;
      background-color: ${sadBabyBlue};
      color: ${navyBlue};
    }
  }
`;

const Error = styled.div`
  font-size: 1.8rem;
  font-family: "lato";
  line-height: 1.3;
  color: #C30B0B;
  font-style: italic;
  word-break: keep-all;
  white-space: nowrap;
  align-self: flex-start;
`;

const RegisterDiv = styled.div`
  ${flexColumn};
  padding: 8rem;
  align-items: center;
  @media (max-width: 650px){
    padding: 4rem;
    }
  h1{
    margin-bottom: 1rem;
    font-size: 4.6rem;
    font-family: "lato";
    font-weight: bold;
    @media (max-width: 650px){
      width: 100%;
      text-align: center;
      align-self: center;
    }
  }
  section{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    img{
      margin: 0;
      @media (max-width: 1250px){
        display: none;
      }
    }
  }
`;

function Register(props) {
  const { errors, touched, token } = props;

  if (token) {
    return <Redirect to="/" />;
  }
  return (
    <RegisterDiv>
      <h1>Let us show off your work!</h1>
      <section>
        <Image src={loginImage} alt="" />
        <StyledForm>
          <h2>First Name</h2>
          <Field type="text" name="firstName" placeholder="John" />
          {errors.firstName && <Error>{errors.firstName}</Error>}
          <h2>Last Name</h2>
          <Field type="text" name="lastName" placeholder="Doe" />
          {errors.lastName && <Error>{errors.lastName}</Error>}
          <h2>Email Adress</h2>
          <Field type="text" name="email" placeholder="johndoe@email.com" />
          {errors.email && <Error>{errors.email}</Error>}
          <h2>Date Of Birth</h2>
          <Field type="date" name="dob" min="1903-01-02" max="2006-01-01" />
          {errors.dob && <Error>{errors.dob}</Error>}
          <section className="password">
            <div>
              <h2>Password</h2>
              <Field type="password" name="password" />
            </div>
            <div>
              <h2>Confirm</h2>
              <Field type="password" name="passwordConfirm" />
            </div>
            <div className="error">
              {touched.password
                && errors.password
                && <Error>{errors.password}</Error>}
              {touched.passwordConfirm
                && errors.passwordConfirm
                && <Error>{errors.passwordConfirm}</Error>}
            </div>
          </section>
          <h2>Phone Number</h2>
          <Field type="text" name="phone" />
          {errors.phone && <Error>{errors.phone}</Error>}
          <h2>Short Bio</h2>
          <Field type="text" component="textarea" name="uvp" />
          {errors.uvp && <Error>{errors.uvp}</Error>}
          <Button type="submit">Register</Button>
        </StyledForm>
      </section>
    </RegisterDiv>
  );
}

function mapPropsToValues() {
  return {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    uvp: "",
  };
}

const valSchema = () => (
  Yup.object().shape({
    firstName: Yup.string(registerInvalid.firstName).required(registerRequired.firstName),
    lastName: Yup.string(registerInvalid.lastName).required(registerRequired.lastName),
    email: Yup.string().email(registerInvalid.email).required(registerRequired.email),
    dob: Yup.date(registerInvalid.dob).required(registerRequired.dob),
    password: Yup.string().min(8, registerInvalid.password).required(registerRequired.password),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], registerInvalid.passwordConfirm).required(registerInvalid.passwordConfirm),
    phone: Yup.number(registerInvalid.phone).required(registerRequired.phone),
    uvp: Yup.string(registerInvalid.uvp).required(registerRequired.uvp),
  })
);

const RegisterFormik = withFormik({
  validationSchema: valSchema,
  mapPropsToValues,
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const newUser = {
      username: `${values.firstName} ${values.lastName}`,
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

function mapStateToProps(state) {
  return {
    token: state.authState.token,
  };
}

export default connect(mapStateToProps, { registerUser })(RegisterFormik);

Register.defaultProps = {
  token: null,
  errors: {},
  touched: {},
};

Register.propTypes = {
  token: pt.string,
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
