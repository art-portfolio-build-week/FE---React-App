import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import pt from "prop-types";
import { loginUser } from "../../redux/actions/actionCreators";
import { requiredLogin, loginInvalid } from "../../constants";
import loginImage from "../../assets/images/loginImage.jpeg";
import { Button, flexColumn, Image } from "../../assets/styling";

const LoginContainer = styled.div`
  ${flexColumn};
  padding: 8rem;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 950px){
    flex-direction: column;
    align-items: center;
    padding: 4rem;
  }
`;

const SectionLeft = styled.section`
  width: 40%;
  ${flexColumn}
  align-items: center;
  @media (max-width: 950px){
    width: initial;
  }
    h1{
      align-self: flex-start;
      font-size: 44px;
      font-weight: bold;
      font-family: "lato";
    }
  img{
    @media (max-width: 950px){
        display: none;
      }
  }
`;

const StyledForm = styled(Form)`
  ${flexColumn};
  justify-content: space-around;
  align-items: center;
  width: 40%;
  @media (max-width: 950px){
    width: 90%;
  }
  div{
    width: 80%;
    input{
      height: 4.5rem;
      width: 100%;
      padding: 1rem;
      border:2px solid #979797;
      border-radius: 4px;
    }
  }
  h2{
    margin-top: 2.5rem;
    line-height: 2;
    align-self: flex-start;
    font-size: 24px;
    font-family: "lato";
    font-weight: 600;
  }
  .form{
    ${flexColumn}
    height: 60%;
    button{
      margin-top: 5rem;
    }
  }

`;

const Error = styled.div`
  ${flexColumn}
  p{
    align-self: center;
    font-family: "lato";
    line-height: 1.3;
    color: #C30B0B;
    font-size: 24px;
    font-style: italic;
    word-break: keep-all;
    white-space: nowrap;
  }
`;

function Login(props) {
  const { errors, touched, token } = props;
  if (token) {
    return <Redirect to="/" />;
  }
  return (
    <LoginContainer>
      <SectionLeft>
        <h1>Welcome Back!</h1>
        <Image src={loginImage} alt="" />
      </SectionLeft>
      <StyledForm>
        <Error>
          {touched.email && errors.email && <p>{errors.email}</p>}
          {touched.password && errors.password && <p>{errors.password}</p>}
        </Error>
        <div className="form">
          <h2>Email Address</h2>
          <Field type="text" name="email" placeholder="johndoe@email.com" />
          <h2>Password</h2>
          <Field type="password" name="password" placeholder="1234Love is the most used password" />
          <Button type="submit">Login</Button>
        </div>
      </StyledForm>
    </LoginContainer>
  );
}
function mapPropsToValues() {
  return {
    email: "",
    password: "",
  };
}

const valSchema = () => (
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

function mapStateToProps(state) {
  return {
    token: state.authState.token,
  };
}

export default connect(mapStateToProps, { loginUser })(LoginFormik);

Login.defaultProps = {
  token: null,
  errors: {},
  touched: {},
};

Login.propTypes = {
  token: pt.string,
  errors: pt.shape({
    email: pt.string,
    password: pt.string,
  }),
  touched: pt.shape({
    email: pt.bool,
    password: pt.bool,
  }),
};
