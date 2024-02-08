import React, { useEffect, useState } from "react";
import style from "./AddProduct.module.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { toast } from "react-toastify";

//WHEN WE FETCH WE NEED TO APPEND BOTH "formData" AND "selectedOptions" TO THE AXIOS REQUEST !!!

const MoreColorsAndSizes = ({
  details = { color: "", size: [] },
  setColor,
}) => {
  const { color, size } = details;

  return (
    <>
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
          onChange={(e) => {
            setColor({ ...details, color: e.target.value });
          }}
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
        <p>الحجم</p>
        <Select
          id="size"
          onChange={(e) => {
            const selectedSizes = Array.isArray(e.target.value)
              ? e.target.value
              : [e.target.value];
            setColor({ ...details, size: selectedSizes });
          }}
          multiple
          name="size"
          label="size"
          value={size}
        >
          <MenuItem value="حجم واحد" selected={true}>
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
    </>
  );
};

function AddProduct() {
  //multi size select for one color

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [newData, setNewData] = useState(0);
  const [details, setDetails] = useState({
    color: "",
    size: [],
  });

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };
  ///input handling

  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    console.log(imgs);
  });

  const handleImageChange = async (e) => {
    e.preventDefault();
    try {
      let img = "";
      let fd = new FormData();
      for (let i = 0; i < formData.images.length; i++) {
        fd.append("image", e.target.files[i], img.name);
        await axios
          .post(
            "https://api.imgbb.com/1/upload?key=268f44c0b0444e18ebac10c0e5823c72",
            fd
          )
          .then((res) => {
            setImgs([...imgs, res.data.data.display_url]);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    arabicName: "",
    price: "",
    serialNumber: "",
    details: [{ color: "", size: [] }],
    type: null,
    description: "",
    categoryID: "",
    subCategoryID: null,
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

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

  const getSubCategories = async (id) => {
    console.log(id);
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_BACKEND}subCategory/getsubbycategory/${id}`
      );
      console.log(res.data);
      setSubCategory(res.data.subCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  const handleAddMore = (e) => {
    e.preventDefault();
    if (newData === 0) {
      setNewData(newData + 1);
      return;
    }
    if (newData >= 1) {
      setFormData({ ...formData, details: [...formData.details, details] });
      setNewData(newData + 1);
      details;
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    // console.log(e.target);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const postProduct = async (e) => {
    e.preventDefault();
    if (newData === 1) {
      setFormData({ ...formData, details: [details] });
    } else {
      setFormData({ ...formData, details: [...formData.details, details] });
    }
    const fd = new FormData();
    formData.images.map((img) => {
      fd.append("image", img);
    });
    console.log(imgs);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND}product/create`,
        { ...formData, images: imgs }
        // {
        //    headers: { "Content-Type": "multipart/form-data" },
        // }
      )
      .then((res) => {
        toast.success("تمت اضافة المنتج بنجاح");
      })
      .catch((err) => {
        toast.error("حصل خطأ أثناء اضافة المنج");
        console.log(err);
        console.log(formData);
      });
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
            name="price"
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
          <p>الخانة الرئيسية</p>
          <Select
            id="category"
            label="category"
            name="categoryID"
            onChange={(e) => {
              setFormData({ ...formData, subCategoryID: null });
              setSubCategory([]);
              handleChange(e);
              getSubCategories(e.target.value);
            }}
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
            name="subCategoryID"
            onChange={handleChange}
          >
            <MenuItem value="" selected={true}>
              الخانة الفرعية
            </MenuItem>
            {subCategory.map((subCat) => (
              <MenuItem value={subCat._id} key={subCat._id}>
                {subCat.arabicName}
              </MenuItem>
            ))}
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
            onChange={(e) => {
              setFormData({
                ...formData,
                images: [...formData.images, e.target.files[0]],
                // images: e.target.files[0],
              });
              console.log(formData);
              handleImageChange(e);
              console.log(imgs);
            }}
            name="images"
            multiple
          />
        </Box>
        {imgs.length ? (
          <Box
            component="form"
            sx={{
              // "& > :not(style)": { m: 1, width: "25ch" },
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "center",
              padding: " 0 20px",
              flexWrap: "no-wrap",
              maxWidth: "80px",
            }}
            noValidate
            autoComplete
          >
            {imgs.map((img) => (
              <img
                height={"30px"}
                width={"30px"}
                src={img}
                key={img}
                alt=""
                style={{ width: "30px", height: "30px", objectFit: "cover" }}
              />
            ))}
          </Box>
        ) : (
          <></>
        )}
        {newData && (
          <>
            {Array.from({ length: newData }).map((_, index) => (
              <MoreColorsAndSizes
                key={index}
                setColor={setDetails}
                details={details}
              />
            ))}
          </>
        )}
      </div>
      <button className={style.addColors} type="button" onClick={handleAddMore}>
        أضف ألوان أخرى
      </button>
      <button className={style.add} onClick={postProduct}>
        أضف المنتج
      </button>
    </form>
  );
}

export default AddProduct;
