import { useState,useEffect } from "react";
import { getProfile, updateProfile,changePassword} from "../api/profileApi";

export const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
     name: "",
    email: "",
    phone: "",
    address: ""
  });
 const [updatePassword, setUpdatePassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response  = await getProfile();
        setProfileData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
        ...profileData,
        [e.target.name]: e.target.value
    });

};
 const handleChangeUpdate = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePassword({
        ...updatePassword,
        [e.target.name]: e.target.value
    });

};

const handleSubmitUpdate = async (e: any) => {
    e.preventDefault();
try {
    const data = {
    currentPassword: updatePassword.currentPassword,
    newPassword: updatePassword.newPassword
}

 await changePassword(data);

 setUpdatePassword({
       currentPassword: "",
      newPassword: ""
    });
    alert("password changed successfully");
 setIsChangingPassword(false);
} 
catch (error: any) {
  alert(error.response?.data?.message || "password change failed");
}
};

const handleSubmit = async (e: any) => {
    e.preventDefault();
try {
     const data = {
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
  address: profileData.address
  };

  const response = await updateProfile(data);
    setProfileData({
      name: response.data.name,
      email: response.data.email,
      phone: response.data.phone,
      address: response.data.address,
    });

alert("profile updated successfully");
 setIsEditing(false);
    
  } catch (error: any) {
  alert(error.response?.data?.message || "profile updated failed");
}
};
  return (
    <>
      {!isEditing && !isChangingPassword && (
      <div className="container py-5">
  <div className="row justify-content-center">
    <div className="col-lg-8">

      <div className="card shadow border-0">
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="rounded-circle border mb-3"
            />

            <h3 className="fw-bold mb-1">
             {profileData.name}
            </h3>

            <p className="text-muted">
              Customer Account
            </p>
          </div>

          <hr />

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Full Name</strong>
            </div>

            <div className="col-md-8">
             {profileData.name}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Email</strong>
            </div>

            <div className="col-md-8">
              {profileData.email}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Phone</strong>
            </div>

            <div className="col-md-8">
              {profileData.phone}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <strong>Address</strong>
            </div>

            <div className="col-md-8">
              {profileData.address}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">

            <button
              className="btn btn-dark"
            onClick={()=> setIsEditing(true)}>
              Update Profile
            </button>

            <button
              className="btn btn-outline-secondary"
                onClick={()=> setIsChangingPassword(true)}
            >
              Change Password
            </button>

          </div>

        </div>
      </div>

    </div>
  </div>
</div>
      )} 
      {isEditing &&  (
       <div className="container py-5">
  <div className="row justify-content-center">
    <div className="col-lg-8">

      <div className="card shadow border-0">
        <div className="card-body p-5">

            <div className="text-center mb-4">

            <h3 className="fw-bold">My Profile</h3>
            <p className="text-muted">
              Manage your account information
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>
                <input
                  type="email"
                   name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  disabled
                />
              </div>

            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                   name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="03XX-XXXXXXX"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Address
                </label>
                <input
                  type="text"
                   name="address"
                  value={profileData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your address"
                />
              </div>

            </div>

            <div className="d-flex gap-2 mt-4">

              <button
                type="submit"
                className="btn btn-dark"
              >
                Save Profile
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
              onClick={() => setIsEditing(false)}>
               cancel
              </button>

            </div>

          </form>

        </div>
      </div>

    </div>
  </div>
</div>

      )}

      {isChangingPassword && (
    <div className="container py-5">
  <div className="row justify-content-center">
    <div className="col-lg-6">

      <div className="card shadow border-0">
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <h3 className="fw-bold">Change Password</h3>
            <p className="text-muted">
              Update your account password
            </p>
          </div>

          <form onSubmit={handleSubmitUpdate}>

            <div className="mb-3">
              <label className="form-label">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={updatePassword.currentPassword}
                onChange={handleChangeUpdate}
                className="form-control"
                placeholder="Enter current password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={updatePassword.newPassword}
                onChange={handleChangeUpdate}
                className="form-control"
                placeholder="Enter new password"
              />
            </div>

            <div className="d-flex gap-2">

              <button
                type="submit"
                className="btn btn-dark"
              >
                Update Password
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setIsChangingPassword(false)}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      </div>

    </div>
  </div>
</div>
)}
    </>
  );
};