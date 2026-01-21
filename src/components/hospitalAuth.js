import { useState } from "react";
import "./HospitalAuth.css";
import { useNavigate } from "react-router-dom";

export default function HospitalAuth() {
  const [activeTab, setActiveTab] = useState("staff"); // "staff", "signin", "register"
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupForm, setSignupForm] = useState({ 
    username: "", 
    password: "", 
    role: "ROLE_USER",
    department: "",
    fullName: "",
    email: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ Base URL from ENV
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // 🔹 Sign Up (Patient)
  const signIn = async () => {
    if (!userName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ userName, email, password }),
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.text();
      if (res.ok) {
        alert("SignUp Success");
        navigate("/login");
      } else {
        alert(data || "Error during signup");
      }
    } catch (error) {
      console.error(error);
      alert("Connection failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Login (Staff / Patient)
  const handleLogin = async () => {
    if (!userName || !password) {
      alert("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
      });

      const data = await res.text();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", userName);

        // Redirect based on role
        if (data.role === "ADMIN" || data.role === "ROLE_ADMIN") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Handle Signup Form change
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit Signup (Staff)
  const handleStaffSignup = async () => {
    const { username, password, role, department, fullName, email } = signupForm;
    if (!username || !password || !fullName || !email || !role) {
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/staff/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm)
      });

      const data = await res.text();
      if (res.ok) {
        alert("Staff registered successfully!");
        setSignupForm({ username: "", password: "", role: "ROLE_USER", department: "", fullName: "", email: "" });
        setActiveTab("staff");
      } else {
        alert(data || "Staff registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Connection error. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hospital-auth-container" style={{marginTop:"100px"}}>
      <div className="hospital-header">
        <div className="hospital-logo">
          <h1>🏥 GuruTeg Bahadur Hospital</h1>
          <p className="hospital-tagline">Advanced Healthcare Management System</p>
        </div>
      </div>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-tabs">
            <button className={`tab-button ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab("staff")}>Staff Login</button>
            <button className={`tab-button ${activeTab === 'signin' ? 'active' : ''}`} onClick={() => setActiveTab("signin")}>SignIn</button>
            <button className={`tab-button ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab("register")}>New Registration</button>
          </div>

          <div className="auth-content">
            {/* Staff Login */}
            {activeTab === "staff" && (
              <div className="login-form">
                <h3>Hospital Staff Access</h3>
                <p className="form-subtitle">Enter your credentials to access the system</p>
                <div className="form-group">
                  <label>Staff ID / Username</label>
                  <input placeholder="Enter your staff ID or username" className="hospital-input" onChange={(e)=>setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter your password" className="hospital-input" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin} className="login-button" disabled={isLoading}>
                  {isLoading ? <> <span className="spinner"></span> Authenticating... </> : "Access Hospital System"}
                </button>
              </div>
            )}

            {/* Patient SignIn */}
            {activeTab === "signin" && (
              <div className="signin-form">
                <h3>Patient SignIn</h3>
                <div className="form-group">
                  <label>Username</label>
                  <input placeholder="Enter username or patient ID" className="hospital-input" onChange={(e)=>setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input placeholder="Enter email" className="hospital-input" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password" className="hospital-input" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button onClick={signIn} className="signin-button" disabled={isLoading}>
                  {isLoading ? <> <span className="spinner"></span> Signing In... </> : "Sign In"}
                </button>
              </div>
            )}

            {/* Staff Registration */}
            {activeTab === "register" && (
              <div className="signup-form">
                <h3>New Staff Registration</h3>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="fullName" value={signupForm.fullName} className="hospital-input" onChange={handleSignupChange} />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input name="email" type="email" value={signupForm.email} className="hospital-input" onChange={handleSignupChange} />
                </div>
                <div className="form-group">
                  <label>Username *</label>
                  <input name="username" value={signupForm.username} className="hospital-input" onChange={handleSignupChange} />
                </div>
                <div className="form-group">
                  <label>Password *</label>
                  <input name="password" type="password" value={signupForm.password} className="hospital-input" onChange={handleSignupChange} />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <select name="department" value={signupForm.department} className="hospital-select" onChange={handleSignupChange}>
                    <option value="">Select Department</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="emergency">Emergency</option>
                    <option value="administration">Administration</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select name="role" value={signupForm.role} className="hospital-select" onChange={handleSignupChange}>
                    <option value="ROLE_DOCTOR">Doctor</option>
                    <option value="ROLE_NURSE">Nurse</option>
                    <option value="ROLE_ADMIN">Administrator</option>
                    <option value="ROLE_STAFF">Support Staff</option>
                  </select>
                </div>
                <button onClick={handleStaffSignup} className="signup-button" disabled={isLoading}>
                  {isLoading ? <> <span className="spinner"></span> Registering... </> : "Register Account"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
