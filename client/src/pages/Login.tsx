import { useState  } from "react";
import authApi from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export const Login=()=>{

const { login } = useAuth();
const navigate = useNavigate();
const [loginFormData, setLoginData] = useState({ 
    email: "",
    password: "",
});
const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
        ...loginFormData,
        [e.target.name]: e.target.value
    });

};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await authApi.login(loginFormData);

      setLoginData({
        email: "",
        password: "",
      });

      login(response.token, response.user);
         alert("Login successful!");
      navigate("/");
    } catch (error: any) {
  alert(error.response?.data?.message || "Invalid email or password");
}
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold">Login</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={loginFormData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                     name="password"
                    value={loginFormData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="remember"
                    >
                      Remember Me
                    </label>
                  </div>

                  <a href="#" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Login
                </button>

                <p className="text-center mt-3 mb-0">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    Register
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




