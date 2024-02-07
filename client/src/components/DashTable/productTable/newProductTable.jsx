import { Box, Button, Modal } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddProduct from "../../AddProduct/AddProduct";

const ProductTableNew = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [slug, setSlug] = useState("");

  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleEditModal = () => {
    setEditModal((prev) => !prev);
  };

  const getData = async () => {
    try {
      setLoading(true);
      await axios
        .get(`${process.env.REACT_APP_BACKEND}product/getall`)
        .then((res) => {
          console.log("res:", res.data.products);
          setData(res.data.products);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_BACKEND}product/${id}`)
        .then(() => {
          toast.success("Producto eliminado correctamente");
          getData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "arabicName", headerName: "الإسم", flex: 0.5 },
    { field: "name", headerName: "name in english", flex: 0.5 },
    { field: "price", headerName: "سعر", flex: 1 },
    { field: "serialNumber", headerName: "رقم التسلسلي", flex: 0.5 },
    { field: "description", headerName: "لوصف", flex: 0.5 },
    {
      field: "categoryName",
      headerName: "التصنيف",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <span>{params.row.categoryID ? params.row.categoryID.name : ""}</span>
        );
      },
    },
    {
      field: "subCategoryID",
      headerName: "تصنيف فرعي",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <p>
            {params.row.subCategoryID && params.row.subCategoryID.arabicName}
          </p>
        );
      },
    },
    {
      field: "delete", // Add a delete column
      headerName: "حذف",
      flex: 1,
      cellClassName: "delete-cell",

      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              color: "var(--brown-color)",
              borderColor: "var(--blue-color) ",
              "&:hover": {
                boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.5)",
                backgroundColor: "var(--blue-color)",
              },
            }}
            id={params.row._id}
            onClick={(e) => handleDelete(e.target.id)}
          >
            حذف
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              color: "var(--brown-color)",
              borderColor: "var(--blue-color) ",
              "&:hover": {
                boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.5)",
                backgroundColor: "var(--blue-color)",
              },
            }}
            id={params.row.slug}
            onClick={(e) => {
              handleEditModal();
              setSlug(e.target.id);
            }}
          >
            تعديل
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: 400,
          width: "100%",
          backgroundColor: "var(--main-color)",
        }}
      >
        <Modal
          open={openModal}
          onClose={handleModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddProduct />
        </Modal>
        <Button
          fullWidth
          type="submit"
          onClick={handleModal}
          sx={{
            margin: "10px",
            height: "3rem",
            width: "5rem",
            // border: '2px solid #368681',
            backgroundColor: "var(--brown-color)",
            color: "var(--main-color)",

            "&:hover": {
              // boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.5)',
              backgroundColor: "var(--blue-color)",
              color: "var(--brown-color)",
            },
          }}
          color="primary"
        >
          أضف منتج
        </Button>
        <DataGrid
          sx={{ minHeight: "60vh" }}
          rows={data}
          getRowId={(row) => row._id}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick={true}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSize={[10]}
          pageSizeOptions={[10, 20, 30, 50, 100]}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
      <Modal open={editModal} onClose={handleEditModal}>
        <form style={{ padding: "1rem", background: "white" }}></form>
      </Modal>
    </>
  );
};

export default ProductTableNew;
