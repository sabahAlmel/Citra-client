import { FaRegHeart } from "react-icons/fa";
import styles from './SignUp.module.css'
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
// import { LuEyeOff } from "react-icons/lu";
import openeye from "../../assets/icons/open.svg"
import closeeye from "../../assets/icons/close.svg"
import { useState } from "react";
import {toast} from "react-toastify";
import { Link } from 'react-router-dom';
import { color } from "framer-motion";
import { Opacity } from "@mui/icons-material";


function SignUp(){

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

      const notify = () => toast("! تم التسجيل بنجاح");

    return(
        <>
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            
            <main className={styles.main}>
                {/* <div className={`${styles.circle} ${styles.left}`}>

                </div>
                <div className={`${styles.circle} ${styles.right}`}>
                    
                </div> */}
                <span style={{
                    display: 'flex',
                    width: 'fit-content',
                    alignItems: 'center',
                    flexDirection: 'row',
                    columnGap: '0.5rem'
                    }}>
                    <h2 className={styles.h2}>
                        أنشىء حسابك الآن 

                    </h2>
                    <FaRegHeart className={styles.icon} />
                </span>

                <div style={{
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
                             height: '13px',
                             
                            },
                    }}
                    id="filled-basic" 
                    label="الاسم" 
                    variant="filled" 
                    required 
                    />
                </div>
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
                             height: '13px'
                            },
                    }}
                    id="filled-basic" 
                    label="البريد" 
                    variant="filled" 
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
                       height: '13px',
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
                             height: '13px'
                           },
                    }}
                    id="filled-basic" 
                    label="رقم الهاتف" 
                    variant="filled" 
                    required 
                
                    />
                </div>

                <div style={{
                    width: '14rem',
                    display: 'flex',
                    flexDirection:'column',
                    rowGap: '1rem'
                    }}>
                <Button
                fullWidth
                type="submit"
                onClick={() => (window.location.href = '/homepage')}
                    sx={{
                    height: 38,
                    width: 227,
                    // border: '2px solid #919191 ',
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
                {/* <p className={styles.p}> أو </p> */}
                <Button
                fullWidth
                type="submit"
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
                <Link to="/signin" className={styles.p}>
                    <p className={styles.p}> هل لديك حساب ؟<span style={{borderBottom:"1px solid"}}>سجل الآن </span></p>
                </Link>
                <Link to="/homepage" className={styles.p}>
                    <p className={styles.p}><span>العودة الى الصفحة الرئيسية</span></p>
                </Link>
            </main>
            </form>
        </>
    )
}

export default SignUp;