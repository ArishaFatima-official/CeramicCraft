import { useState  } from "react";
import authApi from "../api/authApi";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export const Register=()=>{
const navigate = useNavigate();
const [registerData, setregisterData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
});
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setregisterData({
        ...registerData,
        [e.target.name]: e.target.value
    });

};

const handleSubmit = async (e: any) => {
    e.preventDefault();
  if (registerData.password !== registerData.confirmPassword) {
  alert("Passwords do not match");
  return;
}
 try {
     const data = {
    name: registerData.name,
    email: registerData.email,
    phone: registerData.phone,
    address: registerData.address,
    password: registerData.password,
  };
    await authApi.register(data);

    setregisterData({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    });
     alert("Registration successful");
    navigate("/login");
    
  } catch (error: any) {
  alert(error.response?.data?.message || "Registration failed");
}
};


 return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold">
                Create Account
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={registerData.email}
                       onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your email"
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
                      value={registerData.phone}
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
                      value={registerData.address}
                       onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={registerData.password}
                       onChange={handleChange}
                      className="form-control"
                      placeholder="Enter password"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                       onChange={handleChange}
                      className="form-control"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 mt-2"
                >
                  Create Account
                </button>

                <p className="text-center mt-3 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Login
                 </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};