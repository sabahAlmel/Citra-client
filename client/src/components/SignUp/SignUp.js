import { FaRegHeart } from "react-icons/fa";
import styles from "../../components/SignUp/SignUp.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import openeye from "../../assets/icons/open.svg";
import closeeye from "../../assets/icons/close.svg";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { auth, provider } from "../../Firebase";
import { signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpp() {
  const [open, setOpen] = useState(false);

  const { setUser } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });
  const [disabled, setDisabled] = useState(false);

  // hide or show password
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // google sign up

  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((data) => {
        setDisabled(!disabled);
        axiosInstance
          .post(
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
          )
          .then((res) => {
            setIsPending(false);
            if (res) {
              setUser(res.data.token.data);
              console.log(res.data.token.data);
              setDisabled(!disabled);
              toast.success("تم تسجيل الدخول بنجاح", response.message);
            } else {
              setUser("no user found");
            }
            navigate("/");
          });
      })
      .catch((err) => {
        setDisabled(false);
        if (err.code === "auth/popup-closed-by-user") {
          console.log("exited the google auth");
        }
      });
  };

  //sign up
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsPending(true);

    try {
      const response = await axiosInstance.post("/user/signup", formData);
      setUser(response.data.token.data);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");
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
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "user",
    });
  };

  return (
    <>
     
      <form onSubmit={handleSubmit} className={styles.wrapper}>
        <main className={styles.main}>
          <ToastContainer />
          <span
            style={{
              display: "flex",
              width: "fit-content",
              alignItems: "center",
              flexDirection: "row",
              columnGap: "0.5rem",
            }}
          >
            <h2 className={styles.h2}>أنشىء حسابك الآن</h2>
            <FaRegHeart className={styles.icon} />
          </span>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                color: "var(--blue-color)",
                backgroundColor: "white",
              }}
              inputProps={{
                style: { color: "var(--brown-color)", height: "13px" },
              }}
              id="filled-basic"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="الاسم"
              variant="filled"
              required
              dir="LTR"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              className={styles.textfield}
              sx={{
                display: "flex",
                flexDirection: "column",
                // marginTop: '20px',
                color: "var(--rose-color)",
                backgroundColor: "white",

                "& .Mui-focused > lable": {
                  color: "black",
                },
              }}
              inputProps={{
                style: { color: "var(--brown-color)", height: "13px" },
              }}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              id="filled-basic"
              label="البريد"
              variant="filled"
              required
              dir="LTR"
            />
          </div>
          <div
            className={styles.passInp}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                color: "var(--blue-color)",
                backgroundColor: "white",
              }}
              inputProps={{
                style: {
                  color: "var(--brown-color)",
                  height: "13px",
                  fontSize: "16px",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              sx={{
                color: "var(--blue-color)",
                backgroundColor: "white",
              }}
              inputProps={{
                style: { color: "var(--brown-color)", height: "13px" },
              }}
              id="filled-basic"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              label="رقم الهاتف"
              variant="filled"
              required
              dir="LTR"
            />
          </div>

          <div
            style={{
              width: "14rem",
              display: "flex",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            <Button
              fullWidth
              type="submit"
              disabled={isPending}
              sx={{
                height: 38,
                width: 227,
                // border: '2px solid #919191 ',
                backgroundColor: "#FEE7CB",
                color: "var(--brown-color)",

                "&:hover": {
                  // boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.5)',
                  backgroundColor: "#368681",
                  color: "white",
                },
              }}
              color="primary"
            >
              {isPending ? "جارٍ التحميل..." : "تسجيل الدخول"}
            </Button>
            {/* <p className={styles.p}> أو </p> */}
            <Button
              fullWidth
              type="submit"
              onClick={handleGoogle}
              disabled={disabled}
              sx={{
                height: 35,
                border: "2px solid #919191",
                backgroundColor: "#f8f8f8",
                color: "var(--brown-color)",

                "&:hover": {
                  // boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.5)',
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
          <Link to="/signin" className={styles.p}>
            <p className={styles.p}>
              {" "}
              هل لديك حساب ؟
              <span className={styles.linkToOther}>سجل الآن </span>
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
      </form>
    </>
  );
}

export default SignUpp;
