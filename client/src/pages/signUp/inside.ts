import { FormValues } from "./signUp";

type inputDataTypes = {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  registerName: keyof FormValues;
};

type dataTypes = {
  email: inputDataTypes;
  code: inputDataTypes;
  password: inputDataTypes;
};

const signUpData: dataTypes = {
  email: {
    title: "Enter your email to create an account",
    placeholder: "Email",
    type: "email",
    name: "email",
    registerName: "email",
  },
  code: {
    title:
      "We sent a code to sulaymonrahmongaa957@gmail.com",
    placeholder: "Enter the code",
    type: "text",
    name: "code",
    registerName: "code",
  },
  password: {
    title: "Create a unique password",
    placeholder: "Email",
    type: "password",
    name: "email",
    registerName: "password",
  },
};

export default signUpData;
