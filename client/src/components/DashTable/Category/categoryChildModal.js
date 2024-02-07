import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../categoryForm/CategoryForm.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ChildModal = ({
  onClose,
  rowData,
  rows,
  setRows,
  setSelectedRowData,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState({
    arabicName: rowData.arabicName || "",

    image: null, // Assuming images is an array of strings
  });

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    try {
      const requestData = { ...formData };
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}category/update/${rowData.id}`,
        requestData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updatedProduct = response.data;

        const updatedRows = rows.map((row) =>
          row.id === updatedProduct.id ? updatedProduct : row
        );

        setRows(updatedRows);

        onClose();
        toast.success("تم تجديد المعلومات بنجاح");
        if (onSubmitSuccess) {
          onSubmitSuccess(updatedProduct);
        }
      } else {
        console.error("Error updating product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <CategoryForm
            formData={formData}
            setFormData={setFormData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ChildModal;
