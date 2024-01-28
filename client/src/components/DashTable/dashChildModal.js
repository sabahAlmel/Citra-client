import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddUserForm from "../AddUserForm/AddUserForm";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
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
    name: rowData.name || "",
    email: rowData.email || "",
    phone: rowData.phone || "",
    role: rowData.role || "",
  });

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const requestData = { ...formData };

      if (!requestData.joinDate) {
        delete requestData.joinDate;
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND}user/${rowData.id}`,
        requestData
      );

      if (response.status === 200) {
        const updatedUser = response.data;

        const updatedRows = rows.map((row) =>
          row.id === updatedUser.id ? updatedUser : row
        );

        setRows(updatedRows);

        onClose();
        toast.success("تم تجديد المعلومات بنجاح");
        if (onSubmitSuccess) {
          onSubmitSuccess(updatedUser);
        }
      } else {
        console.error("Error updating user:", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      // Fetch updated data
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}users`);
        const updatedData = response.data;
        setRows(updatedData);
      } catch (error) {
        console.error("Error fetching updated data:", error);
      }
    };

    // Call fetchData function after successful form submission
    if (onSubmitSuccess) {
      fetchData();
    }
  }, [onSubmitSuccess, setRows]);


  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <AddUserForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            rowData={rowData}
            rows={rows}
            setRows={setRows}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ChildModal;
