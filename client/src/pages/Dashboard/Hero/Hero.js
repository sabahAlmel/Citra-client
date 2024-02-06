import React,{useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import style from "./Hero.module.css"
import axios from 'axios';

function Hero() {

  const navigate = useNavigate()

  const [picture, setPicture]=useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const changeHandler = (e) => {
    e.preventDefault();
    setPicture(e.target.files[0]);
    const reader = new FileReader();
    const file = e.target.files[0];
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        console.log(picture)
      };
      if (file) {
        reader.readAsDataURL(file);
      }
  }
  const submitHandler = (e) => {
      e.preventDefault();
      if(picture){
        try{
          axios.put(`${process.env.REACT_APP_BACKEND}hero/update`,{picture:picture},{
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            navigate('/')
      }catch(err){
          console.log(`the error is: ${err}`)
      }
      }else{
        alert("الرجاء تحمبل صورة")
      }
  }

  return (
    <div className={style.container}>
          <form method='put' className={style.wrapper}>
      <label>
        <input id='upload' type='file' className={style.inp} onChange={changeHandler} />
        </label>
        <button type='submit' onClick={submitHandler} className={style.submitBTN}>أضيفي الصورة</button>
    </form>
    {imagePreviewUrl && (
          <img src={imagePreviewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
      )}
      <Link to='/' className={style.home}>العودة الى الصفحة الرئيسية</Link>
    </div>

  )
}

export default Hero