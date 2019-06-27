// URL
export const login = "https://artista-backend.herokuapp.com/api/login";
export const register = "https://artista-backend.herokuapp.com/api/register";

export const fetchAll = "https://artista-backend.herokuapp.com/api/posts";
export const getPostById = id => `https://artista-backend.herokuapp.com/api/posts/${id}`;
export const addPost = "https://artista-backend.herokuapp.com/api/posts";
export const votePost = id => `https://artista-backend.herokuapp.com/api/posts/votes/${id}`;

export const getUser = id => `https://artista-backend.herokuapp.com/api/users/${id}`;

// Error Messages
export const loginInvalid = {
  email: "Please enter a valid email.",
  password: "Your password must atleast be 8 characters long.",
};

export const requiredLogin = {
  email: "An email is required in order to login",
  password: "A password is required in order to login",
};

export const registerInvalid = {
  firstName: "Please enter a valid First Name.",
  lastName: "Please enter a valid Last Name.",
  dob: "Please enter a valid date of birth",
  email: "Please enter a valid email.",
  password: "Your password must atleast be 8 characters long.",
  passwordConfirm: "Your passwords do not match.",
  phone: "That is not a valid phone number",
  uvp: "Enter at least 150 words",
};

export const registerRequired = {
  firstName: "A first name is required in order to sign",
  lastName: "A last name is required in order to sign",
  dob: "A date of birth is required in order to sign",
  email: "An email is required in order to signup",
  password: "A password is required in order to signup",
  phone: "A phone number  is required in order to signup",
  uvp: "A bio is needed in order to signup",
};
