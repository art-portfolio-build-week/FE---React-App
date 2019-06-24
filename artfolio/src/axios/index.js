import axios from "axios";

export default function () {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;

  return axios.create({
    header: {
      authorization: token,
    },
  });
}
