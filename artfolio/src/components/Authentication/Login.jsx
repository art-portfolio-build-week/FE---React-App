import React from "react";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import pt from "prop-types";
import { loginUser } from "../../redux/actions/actionCreators";
import { requiredLogin, loginInvalid } from "../../constants";
import loginImage from "../../assets/images/loginImagejpeg";

const flex = `
  display: flex;
`;

const StyledForm = styled(Form)`
  ${flex};
  flex-direction: column;
  h2{
    font-size: 3.6rem;
    font-family: "lato";
    &:hover{
      color: red;
    }
  }
`;


const LoginContainer = styled.div`
  ${flex};
  flex-direction: column;
  div{
    ${flex};
    justify-content: space-around;
    h1{
      font-size: 44px;
      font-family: "lato";
    }
      p{
        font-family: "lato";
        height: 77px;
        width: 462px;
        color: #C30B0B;
        font-size: 24px;
        font-style: italic;
        line-height: 33px;
      }
  }
`;

const Image = styled.img`
  height: 50rem;
`;

const Section = styled.section`
  ${flex};
  justify-content: space-around;
`;

function Login(props) {
  const { errors, touched } = props;
  return (
    <LoginContainer>
      <div>
        <h1>Welcome Back!</h1>
        <p>Loooks like osme of your info doesn&apos;t match our records; please check and try again</p>
      </div>
      {/* {<img src={} />} */}
      <Section>
        <Image src={loginImage} />
        <StyledForm>
          <h2>Email Address</h2>
          <Field type="text" name="email" placeholder="johndoe@email.com" />
          {touched.email && errors.email && <p>{errors.email}</p>}
          <h2>Password</h2>
          <Field type="password" name="password" placeholder="1234Love is the most used password" />
          {touched.password && errors.password && <p>{errors.password}</p>}
          <button type="submit">Login</button>
        </StyledForm>
      </Section>
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
