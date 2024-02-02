import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NotFound from "../pages/NotFound/NotFound";
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("userr info from context" + user);
  const isAdmin = user && user.Role === "admin" || user.Role==="dataEntry";
  console.log(isAdmin);
  return isAdmin ? children : <NotFound />;
};
export default ProtectedRoute;
