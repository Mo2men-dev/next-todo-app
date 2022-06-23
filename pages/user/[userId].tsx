import type { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

const Home: NextPage = () => {
  // router is used to redirect to the user's profile page
  const router = useRouter();

  // authContext is used to check if a user is logged in
  const currentUser = useAuthContext()?.currentUser;

  useEffect(() => {
    // if a user is not logged in, redirect to the home page
    if (!currentUser) {
      router.push("/");
    } else {
      // if a user is logged in, redirect to the user's profile page
      router.push(`/user/${currentUser?.displayName}`);
    }
  }, [currentUser]);

  return (
    <>
      <Nav />
      <div className="absolute text-yellow-300 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
        Welcome Back {currentUser?.displayName}
      </div>
    </>
  );
};

export default Home;
