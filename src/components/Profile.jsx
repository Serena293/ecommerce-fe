import { Navigate } from "react-router-dom";

const Profile = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }

  

  return (
    <section>
        <h1 className="text-center">Profile</h1>
    </section>
  );
}

export default Profile;