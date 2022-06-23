import type { NextPage } from "next";
import SigninForm from "../components/SigninForm";
import Nav from "../components/Nav";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  // router is used to redirect to the user's profile page
  const router = useRouter();

  // authContext is used to check if a user is logged in
  const currentUser = useAuthContext()?.currentUser;

  useEffect(() => {
    // if a user is logged in, redirect to the user's profile page
    if (currentUser) {
      router.push(`user/${currentUser?.displayName}`);
    } else {
      // if a user is not logged in, redirect to the home page
      router.push("/");
    }
  }, [currentUser]);

  return (
    <>
      <Nav />
      <SigninForm />
    </>
  );
};

export default Home;
