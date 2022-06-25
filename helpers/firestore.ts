import { db } from "../firebase/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

// a function that creates a new collection with the id of the user on signup
export const createNewCollection = async (
  userId: string,
  diplayName: string
) => {
  await setDoc(doc(db, userId, `${diplayName.toUpperCase()}-${userId}`), {
    userId,
    diplayName,
    createdAt: new Date(),
  });
};
