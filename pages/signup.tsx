import type { NextPage } from "next";
import Nav from "../components/Nav";
import SignupForm from "../components/SignupForm";

const SignUpPage: NextPage = () => {
  return (
    <>
      <Nav />
      <SignupForm />
    </>
  );
};

export default SignUpPage;
