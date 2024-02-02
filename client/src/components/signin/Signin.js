import { React, useContext, useState } from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import styles from "../../components/signin/signin.module.css";
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import openeye from "../../assets/icons/open.svg";
import closeeye from "../../assets/icons/close.svg";
import axiosInstance from "../../utils/axiosInstance";
import { auth, provider } from "../../Firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import useApi from "../../hooks/useApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Signin() {
  const { setUser, fetchUserData, fetchUserDataone,user } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  async function getUser() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/user/login`,
        formData
      );
      if (response) {
        console.log(response.data);
        setUser(response.data.token.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const openCloseHandler = () => {
    setOpen(!open);
  };

  let openClose, textPass;

  if (open) {
    openClose = openeye;
    textPass = "text";
  } else {
    openClose = closeeye;
    textPass = "password";
  }

  const isSmallScreen = useMediaQuery("(max-width: 330px)");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);
    if (!formData.email || !formData.password) {
      toast.error("أدخل البريد والإسم");
      setIsPending(false);

      return;
    }

    setFormData({
      email: "",
      password: "",
    });

    try {
      const res = await apiCall({
        url: "/user/login",
        method: "post",
        data: {
          email: formData.email,
          password: formData.password,
        },
      });
      setUser(res.token.data.role);
      console.log("user:", user);
      console.log("resis", res);
      console.log("role", res.token.data.role);
      console.log("call auth");
      // fetchUserData();
      fetchUserDataone()
      toast.success("تم تسجيل الدخول بنجاح");
      setIsPending(false);
      if (res.token.data.role === "admin") {
        navigate("/users");
      } else if (res.token.data.role === "dataEntry") {
        navigate("/products");
      }
      else navigate("/")
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const { errors } = error.response.data;

        if (errors.email) {
          const emailError = errors.email;
          toast.error(emailError);
        }
        if (errors.password) {
          const passwordError = errors.password;
          toast.error(passwordError);
        }
      } else {
        toast.error(error.message);
      }
      setIsPending(false);
    }
  };

  // google sign in
  const handleGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);

      setDisabled(!disabled);

      const res = await axiosInstance.post(
        "/user/gsignup",
        {
          name: data.user.displayName,
          email: data.user.email,
          photourl: data.user.photoURL,
          role: "user",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsPending(false);
      toast.success("تم تسجيل الدخول بنجاح");

      if (res) {
        setUser(res.data.token.data);
        console.log(res.data.token.data);
        setDisabled(!disabled);
      } else {
        setUser("no user found");
      }

      navigate("/");
    } catch (err) {
      setDisabled(false);

      if (err.code === "auth/popup-closed-by-user") {
        console.log("exited the google auth");
      }
    }
  };
 


  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <main className={`${styles.main} ${isSmallScreen && styles.smallScreen}`}>
        <h1 className={styles.h1}>تسجيل الدخول</h1>
        <span
          style={{
            display: "flex",
            width: "fit-content",
            alignItems: "center",
            flexDirection: "row-reverse",
            columnGap: "0.5rem",
          }}
        >
          <h3 className={styles.h3}>اهلا و سهلا بكم مجدداً</h3>
          <FaRegHeart className={styles.icon} />
        </span>
        <div
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
        >
          <TextField
            className={styles.textfield}
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "var(--rose-color)",
              backgroundColor: "white",
              width: "320px",
            }}
            inputProps={{
              style: {
                color: "var(--brown-color)",
                height: "17px",
                fontSize: "16px",
              },
            }}
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            id="filled-basic"
            label="البريد"
            variant="filled"
            type="email"
            required
            dir="LTR"
          />
        </div>
        <div
          className={styles.passInp}
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          // }}
        >
          <TextField
            sx={{
              color: "var(--blue-color)",
              backgroundColor: "white",
            }}
            inputProps={{
              style: {
                color: "var(--brown-color)",
                height: "17px",
                fontSize: "16px",
                width: "300px",
              },
            }}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            id="filled-basic"
            label="كلمة المرور"
            variant="filled"
            type={textPass}
            required
            dir="LTR"
          />
          <img
            src={openClose}
            alt="open close"
            onClick={openCloseHandler}
            className={styles.openClose}
          />
        </div>
        <div
          style={{
            width: "325px",
          }}
        >
          <Button
            fullWidth
            type="submit"
            onClick={() => fetchUserData(formData.email, formData.password)}
            sx={{
              marginBottom: "1rem",
              height: 35,
              backgroundColor: "#FEE7CB",
              color: "var(--brown-color)",
              "&:hover": {
                backgroundColor: "#368681",
                color: "white",
              },
            }}
            color="primary"
          >
            تسجيل الدخول
          </Button>
          <Button
            fullWidth
            onClick={handleGoogle}
            sx={{
              height: 35,
              border: "2px solid #919191",
              backgroundColor: "#f8f8f8",
              color: "var(--brown-color)",
              "&:hover": {
                backgroundColor: "#368681",
                color: "white",
              },
            }}
            color="primary"
          >
            <span className={styles.g}>
              {" "}
              <FcGoogle />
            </span>{" "}
            تسجيل الدخول بواسطة
          </Button>
        </div>
        <Link to="/signup" className={styles.p}>
          <p className={styles.p}>
            ليس لديك حساب؟{" "}
            <span className={styles.linkToOther}>اشترك الآن</span>
          </p>
        </Link>
        <Link to="/" className={styles.p}>
          <Button
            className={styles.Button}
            sx={{
              height: 35,
              backgroundColor: "#FEE7CB",
              color: "var(--brown-color)",
              "&:hover": {
                backgroundColor: "#368681",
                color: "white",
              },
            }}
          >
            <span> الصفحة الرئيسية</span>
          </Button>
        </Link>
      </main>
      {isPending && (
        <p className={styles.pending}>
          {" "}
          . . . جاري تسجيل الدخول, الرجاء الإنتظار{" "}
        </p>
      )}
    </form>
  );
}

export default Signin;
