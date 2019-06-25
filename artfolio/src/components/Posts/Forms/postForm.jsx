import React from "react";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { addPost, editPost, postToEdit } from "../../../redux/actions/actionCreators";
import { putPost } from "../../../constants";

function PostForm(props) {
  const { toBeEdited } = props;
  return (
    <Form>
      {/* <Field type="text" name="title" placeholder="Title" /> */}
      <Field type="text" name="description" placeholder="Description" />
      <Field type="text" name="imgURL" placeholder="Image URL" />
      <button type="submit">{toBeEdited ? "Edit Post" : "Upload Picture"}</button>
    </Form>
  );
}
function mapPropsToValues({ toBeEdited }) {
  return {
    description: toBeEdited ? toBeEdited.description : "",
    imgURL: toBeEdited ? toBeEdited.imgURL : "",
  };
}

const valSchema = () => (
  Yup.object().shape({
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
      const editedObject = { ...props.toBeEdited, ...values };
      const errors = await props.editPost(putPost(id), editedObject);
      if (errors) {
        setErrors(errors);
      }
    }

    const errors = await props.addPost(values);
    if (errors) {
      setErrors(errors);
    }
    setSubmitting(false);
  },
})(PostForm);

function mapStateToProps(state) {
  return {
    toBeEdited: state.editState.toBeEdited,
  };
}

export default connect(mapStateToProps, { addPost, editPost, postToEdit })(FormikForm);
