import React from "react";
import * as Yup from "yup";
import { withFormik, Form, Field } from "formik";
import { connect } from "react-redux";
import { addPost } from "../../../redux/actions/actionCreators";

function PostForm(props) {
  return (
    <Form>
      {/* <Field type="text" name="title" placeholder="Title" /> */}
      <Field type="text" name="description" placeholder="Description" />
      <Field type="text" name="imgURL" placeholder="Image URL" />
      <button type="submit">Upload Picture</button>
    </Form>
  );
}
function mapPropsToValues() {
  return {
    description: "",
    imgURL: "",
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
    const errors = await props.addPost(values);
    if (errors) {
      setErrors(errors);
    }
    setSubmitting(false);
  },
})(PostForm);

export default connect(state => state, { addPost })(FormikForm);
