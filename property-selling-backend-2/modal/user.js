const user = {
  fullName: {
    type: String,
    required: [true, "Full Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
};
export default user;
