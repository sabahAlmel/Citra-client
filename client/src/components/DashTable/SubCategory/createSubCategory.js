import React, {useState, useEffect} from 'react'
import style from './createSubCategory.module.css'
import { Box, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios'
import { toast } from 'react-toastify';

function createSubCategoy() {

//forma data handling
const [formData, setFormData] = useState({
  name: "",
  arabicName: "",
  categoryID: "",
});

// fetch categories
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_BACKEND}category/getall`
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

// change input fields
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

//add sub category

const addSubCategory = async (e) => {
  e.preventDefault();
  await axios
    .post(`${process.env.REACT_APP_BACKEND}subCategory/create`, formData)
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
          <p>الاسم</p>
          <TextField
            name="name"
            id="name"
            label="name"
            variant="outlined"
            onChange={handleChange}
            required
          />
        </Box>
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
          <p>الخانة الرئيسية</p>
          <Select
            id="category"
            label="category"
            name="categoryID"
            onChange={handleChange}
            required
          >
            <MenuItem value="" selected={true}>
              الخانة الرئيسية
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.arabicName}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <button className={style.add} onClick={addSubCategory}>
        أضيفي الخانة الفرعية
      </button>
    </form>
  )
}

export default createSubCategoy