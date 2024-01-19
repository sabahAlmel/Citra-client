import {React, useState} from "react";
import TextField from '@mui/material/TextField';
import styles from './signin.module.css'
import { Button } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useMediaQuery } from '@mui/material';
import {toast} from "react-toastify";
import { Link } from 'react-router-dom';
import openeye from "../../assets/icons/open.svg"
import closeeye from "../../assets/icons/close.svg"
// import axios from "axios";




function Signin() {

//password hide/see icon

const [open ,setOpen]=useState(false);

const openCloseHandler=()=>{
  setOpen(!open)
}

let openClose, textPass;

if(open){
  openClose = openeye;
  textPass="text"
}else{
  openClose=closeeye;
  textPass="password"
}

  const isSmallScreen = useMediaQuery('(max-width: 330px)');
  const [email, setEmail]= useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState('');
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      notify();
    }, 2000);
  };

  const [isPending, setIsPending] = useState(false);

  const handleGoodle = () =>{

  }

  const notify = () => toast("! تم التسجيل بنجاح");
  const notify2 = () => toast("خطاء في كلمة المرور او البريد");
  return (
    <>
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <main className={`${styles.main} ${isSmallScreen && styles.smallScreen}`} >
        <h1 className={styles.h1}>
          تسجيل الدخول
        </h1>
        <span style={{
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          columnGap: '0.5rem'
        }}>
          <h3 className={styles.h3}>
            اهلا و سهلا بكم مجدداً

          </h3>
          <FaRegHeart className={styles.icon} />
        </span>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TextField className={styles.textfield}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // marginTop: '20px',
              color: 'var(--rose-color)',
              backgroundColor: 'white',
              
              '& .Mui-focused > lable': {
                color: 'black',
              }
            }}
            inputProps={{
              style: { color: 'var(--brown-color)',
                       height: '17px',
                       fontSize: '16px'
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
            />
        </div>
        <div className={styles.passInp} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <TextField
          
            sx={{
              color: 'var(--blue-color)',
              backgroundColor: 'white',

            }}
            inputProps={{
              style: { color: 'var(--brown-color)',
                       height: '17px',
                       fontSize: '16px' 
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
            />
            <img src={openClose} alt="open close" onClick={openCloseHandler} className={styles.openClose} />
        </div>
        <div style={{
          width: '14rem',
          display: 'flex',
          flexDirection:'column',
          rowGap: '1rem',
        }}>
          <Button
          fullWidth
          type="submit"
          onClick={() => (window.location.href = '/homepage')}
            sx={{
              height: 35,
              // border: '2px solid #368681',
              backgroundColor: "#FEE7CB",
              color: 'var(--brown-color)',

              '&:hover': {

                // boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.5)',
                backgroundColor: '#368681',
                color: 'white'
              }

            }} color="primary">
            تسجيل الدخول
          </Button>
          <Button
          fullWidth
          // onClick={handleGoogle}
          // disabled={disabled}
            sx={{
              height: 35,
              border: '2px solid #919191',
              backgroundColor: "#f8f8f8",
              color: 'var(--brown-color)',


              '&:hover': {

                // boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.5)',
                backgroundColor: '#368681',
                color: 'white'
              }

            }} color="primary">
           <span className={styles.g}> <FcGoogle /></span> تسجيل الدخول بواسطة
          </Button>

        </div>
        <Link to="/signup" className={styles.p}>
        <p className={styles.p}>ليس لديك حساب <span style={{borderBottom:"1px solid var(--blue-color)"}}>اشترك الآن</span></p>

        </Link>
  
        <Link to="/homepage" className={styles.p}>
        <p className={styles.p}><span>العودة الى الصفحة الرئيسية</span></p>
        
        </Link>
      </main>
      {isPending && (
          <p className={styles.pending}> . . . جاري تسجيل الدخول, الرجاء الإنتظار   </p>
        )}
        
        </form>
    </>



  )
}

export default Signin;

