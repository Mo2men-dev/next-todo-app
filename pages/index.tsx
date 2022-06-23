import type { NextPage } from "next";
import SigninForm from "../components/SigninForm";
import Nav from "../components/Nav";
import { useAuthContext } from "../context/AuthContext";

const Home: NextPage = () => {
  const currentUser = useAuthContext()?.currentUser;
  return (
    <>
      <Nav />
      <SigninForm />
    </>
  );
};

export default Home;
