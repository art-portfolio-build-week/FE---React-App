import React from "react";
import moment from "moment";
import * as Yup from "yup";
import styled from "styled-components";
import pt from "prop-types";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { addPost, editPost, postToEdit } from "../../../redux/actions/actionCreators";
import { getPostById } from "../../../constants";
import lenseImage from "../../../assets/images/addPost.png";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  input{
    height: 5rem;
    padding: 0.5rem;
    width: 42.5rem;
    border: 0.1rem solid #979797;
    border-radius: 0.2rem;
    margin-bottom: 2.5rem;
    @media (max-width: 1250px){
        width: 35rem;
      }
  }
  h2{
    font-size:3.6rem;
    font-weight: bold;
    font-family: "lato";
    line-height: 1.8;
    @media (max-width: 1250px){
      font-size: 3rem;
      }
  }
  button{
    align-self: center;
    width: 60%;
    color: white;
    font-size: 2.2rem;
    padding: 1rem;
    background-color: #153D5B;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    border-radius: 1.5rem;
    border: 3px solid #153D5B;
    margin-top: 0.5rem;
    transition: 0.2s;
    margin-bottom: 3.5rem;
    cursor: pointer;
    &:hover{
      transition: 0.2s;
      background-color: #12973c;
      color: #171D21;
      border: 3px solid #171D21;
    }
  }
  button:last-of-type{
    margin-top: 0;
    background-color: white;
    color: #171D21;
    border: 3px solid #171D21;
    &:hover{
      transition: 0.2s;
      background-color: #a22119;
      color: white;
    }
  }
  textarea{
    height: 25rem;
    resize: none;
    padding: 0.5rem;
    border: 0.1rem solid #979797;
    border-radius: 0.2rem;
    margin-bottom: 2.5rem;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  padding: 5rem;
  margin: 0 auto;
  h1{
    margin-left: 10%;
    align-self: flex-start;
    font-size: 4rem;
    font-weight: bold;
    font-family: "lato";
    @media (max-width: 1250px){
        align-self: initial;
        margin: 1rem;
        font-size: 3.5rem;
      }
  }
  section{
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    img{
      height: 45rem;
      margin-bottom: 175px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
      @media (max-width: 950px){
        display: none;
      }
    }
  }
`;

function PostForm(props) {
  const { toBeEdited, history } = props;
  return (
    <Div>
      <h1>{toBeEdited ? "Edit a Post" : "Create a Post"}</h1>
      <section>
        <img src={lenseImage} alt="lense" />
        <StyledForm>
          <h2>Title</h2>
          <Field type="text" name="title" placeholder="Is that a plane?" />
          <h2>Category</h2>
          <Field type="text" name="category" component="select">
            <option disabled defaultValue>Post under one of these categories</option>
            <option value="photography">Photography</option>
            <option value="illustration">Illustration</option>
            <option value="graphic-design">Graphic Design</option>
          </Field>
          <h2>Description</h2>
          <Field type="text" name="description" component="textarea" placeholder="Superman saves the world again!" />
          <h2>Image Url</h2>
          <Field type="text" name="imgURL" placeholder="Enter the image url" />
          <button type="submit">{toBeEdited ? "Edit" : "Save"}</button>
          <button type="button" onClick={history.goBack}>Cancel</button>
        </StyledForm>
      </section>
    </Div>
  );
}
function mapPropsToValues({ toBeEdited }) {
  return {
    description: toBeEdited ? toBeEdited.description : "",
    imgURL: toBeEdited ? toBeEdited.imgURL : "",
    title: toBeEdited ? toBeEdited.title : "",
    category: toBeEdited ? toBeEdited.title : "Post under one of these categories",
  };
}

const valSchema = () => (
  Yup.object().shape({
    title: Yup.string().required(),
    category: Yup.string().required(),
    description: Yup.string().max(150).required(),
    imgURL: Yup.string().url().required(),
  })
);

const FormikForm = withFormik({
  validationSchema: valSchema,
  mapPropsToValues,
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    if (props.toBeEdited) {
      // eslint-disable-next-line prefer-destructuring
      const id = props.toBeEdited.id;
      const errors = await props.editPost(getPostById(id), values);
      if (errors) {
        setErrors(errors);
      }
    }
    const newPost = { ...values, timestamp: moment().format() };
    const errors = await props.addPost(newPost);
    if (errors) {
      setErrors(errors);
    }
    setSubmitting(false);
  },
})(PostForm);

function mapStateToProps(state) {
  return {
    toBeEdited: state.userState.toBeEdited,
  };
}

export default connect(mapStateToProps, { addPost, editPost, postToEdit })(FormikForm);

PostForm.defaultProps = {
  history: {},
  toBeEdited: {},
};

PostForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: pt.object,
  toBeEdited: pt.shape({
    id: pt.number,
    username_id: pt.number,
    description: pt.string,
    imgURL: pt.string,
    votes: pt.number,
  }),
};
