import type { NextPage } from "next";
import SigninForm from "../components/SigninForm";
import Nav from "../components/Nav";

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <SigninForm />
    </>
  );
};

export default Home;
