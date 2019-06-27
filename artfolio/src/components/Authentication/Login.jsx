import React from "react";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import pt from "prop-types";
import { loginUser } from "../../redux/actions/actionCreators";
import { requiredLogin, loginInvalid } from "../../constants";
import loginImage from "../../assets/images/loginImagejpeg";
import { Button, sadBabyBlue, navyBlue } from "../../assets/styling";

const flex = `
  display: flex;
  flex-direction: column;
`;

const LoginContainer = styled.div`
  ${flex};
  padding: 8rem;
  flex-direction: row;
  justify-content: space-around;
`;

const SectionLeft = styled.section`
  width: 40%;
  ${flex}
  align-items: center;
    h1{
      align-self: flex-start;
      font-size: 44px;
      font-weight: bold;
      font-family: "lato";
    }
`;

const StyledForm = styled(Form)`
  ${flex};
  justify-content: space-around;
  align-items: center;
  width: 40%;
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
    ${flex}
    height: 60%;
    button{
      margin-top: 5rem;
    }
  }

`;

const Error = styled.div`
  ${flex}
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

const Image = styled.img`
  height: 48rem;
  margin-top: 5rem;
`;

function Login(props) {
  const { errors, touched } = props;
  return (
    <LoginContainer>
      {/* {<img src={} />} */}
      <SectionLeft>
        <h1>Welcome Back!</h1>
        <Image src={loginImage} />
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
