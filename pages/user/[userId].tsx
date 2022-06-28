import type { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import AddContentButtonsGroup from "../../components/AddContentButtonsGroup";
import TodoListContainer from "../../components/TodoListContainer";

const Home: NextPage = () => {
  // router is used to redirect to the user's profile page
  const router = useRouter();

  // authContext is used to check if a user is logged in
  const currentUser = useAuthContext()?.currentUser;

  useEffect(() => {
    // if a user is not logged in, redirect to the home page
    if (!currentUser) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Nav />
      <AddContentButtonsGroup />
      <TodoListContainer />
    </div>
  );
};

export default Home;
