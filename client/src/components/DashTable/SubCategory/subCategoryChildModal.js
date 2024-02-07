import React, {useState, useEffect}  from 'react'
import style from './subCategoryChildModal.module.css'
import { Box, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios'
import { toast } from 'react-toastify';

function subCategoryChildModal(props) {

    const params = props.rowData.id

    //forma data handling
const [formData, setFormData] = useState({
    arabicName: "",
  });

  // change input fields
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //edit sub category

const editSubCategory = async (e) => {
    e.preventDefault();
    await axios
      .patch(`${process.env.REACT_APP_BACKEND}subCategory/${params}`, formData)
      .then((res) => {
        toast.success("تمت اضافة المنتج بنجاح");
      })
      .catch((err) => {
        toast.error("حصل خطأ أثناء اضافة الخانة الفرعية");
        console.log(err)
      });
  };

  return (
    <form className={style.wrapper}>
                <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: " 0 20px",
          }}
          noValidate
          autoComplete
        >
          <p>الاسم بالعربي</p>
          <TextField
            name="arabicName"
            id="arabicName"
            label="arabic name"
            onChange={handleChange}
            variant="outlined"
            required
          />
        </Box>
        <button className={style.add} onClick={editSubCategory}>
        تعديل
      </button>
    </form>
  )
}

export default subCategoryChildModal