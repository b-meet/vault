import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Added getDocs
import type { Profile } from "./types";
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export const saveProfile = async (profile: Profile) => {
  try {
    const { ...profileDataToSave } = profile;
    const docRef = await addDoc(collection(db, "profiles"), profileDataToSave);
    console.log("Profile saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    const profiles: Profile[] = [];
    querySnapshot.forEach((doc) => {
      // Include the document ID in the profile data
      profiles.push({ id: doc.id, ...doc.data() } as Profile);
    });
    console.log("Profiles fetched successfully");
    return profiles;
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw e;
  }
};