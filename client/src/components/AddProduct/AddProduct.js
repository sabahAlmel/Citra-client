import React, { useState } from "react";
import style from "./AddProduct.module.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

//WHEN WE FETCH WE NEED TO APPEND BOTH "formData" AND "selectedOptions" TO THE AXIOS REQUEST !!!

function AddProduct() {
  //multi size select for one color

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };
  ///input handling

  const [formData, setFormData] = useState({
    name: "",
    arabicName: "",
    price: "",
    serialNumber: "",
    color: [],
    type: "",
    description: "",
    category: "",
    subCategory: "",
    images: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  return (
    <form className={style.wrapper}>
      <div className={style.right}>
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
          <p>السعر</p>
          <TextField
            price="price"
            id="price"
            label="price"
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
          <p>الرقم التسلسلي</p>
          <TextField
            name="serialNumber"
            id="serialNumber"
            label="serial number"
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
          <p>اللون</p>
          <TextField
            name="color"
            id="color"
            placeholder="color"
            variant="outlined"
            onChange={handleChange}
            required
          />
        </Box>
      </div>
      <div className={style.left}>
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
          <p>نوع القماش</p>
          <Select id="type" onChange={handleChange} name="type" label="type">
            <MenuItem value="" selected={true}>
              نوع القماش
            </MenuItem>
            <MenuItem value={"يارا"}>يارا</MenuItem>
            <MenuItem value={"لينو"}>لينو</MenuItem>
            <MenuItem value={"قطن معرق"}>قطن معرق</MenuItem>
            <MenuItem value={"مزهر"}>مزهر</MenuItem>
          </Select>
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
          <p>الحجم</p>
          <Select
            id="size"
            onChange={handleSelectChange}
            multiple
            name="size"
            label="size"
            value={selectedOptions}
          >
            <MenuItem value="" selected={true}>
              الحجم
            </MenuItem>
            <MenuItem value={"L"}>L</MenuItem>
            <MenuItem value={"M"}>M</MenuItem>
            <MenuItem value={"S"}>S</MenuItem>
            <MenuItem value={"2/3"}>2/3</MenuItem>
            <MenuItem value={"3/4"}>3/4</MenuItem>
            <MenuItem value={"4/5"}>4/5</MenuItem>
            <MenuItem value={"5/6"}>5/6</MenuItem>
            <MenuItem value={"6/7"}>6/7</MenuItem>
            <MenuItem value={"7/8"}>7/8</MenuItem>
            <MenuItem value={"8/9"}>8/9</MenuItem>
          </Select>
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
          <p>الوصف</p>
          <TextField
            id="description"
            name="description"
            placeholder="description"
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
            name="category"
            onChange={handleChange}
            required
          >
            <MenuItem value="" selected={true}>
              الخانة الرئيسية
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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
          <p>الخانة الفرعية</p>
          <Select
            id="subCategory"
            label="subCategory"
            name="subCategory"
            onChange={handleChange}
          >
            <MenuItem value="" selected={true}>
              الخانة الفرعية
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
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
          <p>اختاري الصور</p>
          <input
            type="file"
            id="files"
            onChange={handleChange}
            name="image"
            multiple
          />
        </Box>
      </div>
      <button className={style.addColors} type="button">
        أضف ألوان أخرى
      </button>
    </form>
  );
}

export default AddProduct;
