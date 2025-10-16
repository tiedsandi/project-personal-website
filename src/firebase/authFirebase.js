import { getAuth } from "firebase/auth";
import { app } from "./initFirebase";

const auth = getAuth(app);
export { auth };
