import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../product.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Modal from "@mui/material/Modal";
import ChildModal from "./subCategoryChildModal"; // Import the ChildModal component
import CreateCategoryForm from "./createSubCategory";
import { fetchAllSubCategories } from "../../../db/fetchSubCategory";

const SubCategoryTable = () => {
  const [page, setPage] = useState(1); // Move the declaration of 'page' here
  const [rowModesModel, setRowModesModel] = useState({});

  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model
  const queryClient = useQueryClient();
  const [rows, setRows] = React.useState([]); //data
  const [pageSize, setPageSize] = useState(5);
  const [editForm, setEditForm] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  const [selectedRowData, setSelectedRowData] = useState(null); // Initialize selectedRowData

  const {
    isLoading,
    isError,
    data: SubCategoryData,
  } = useQuery(["user-table", page], () => fetchAllSubCategories(page));

  useEffect(() => {
    if (SubCategoryData && SubCategoryData.subCateg) {
      const rowsWithId = SubCategoryData.subCateg.map((row) => ({
        ...row,
        id: row._id, // Assuming _id is a unique identifier
      }));
      setRows(rowsWithId);
    }
    setRowModesModel({});
  }, [SubCategoryData]);

  if (isLoading) {
    return <h2>Loading..</h2>;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }

  const handleRowClickDelete = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND}subCategory/delete/${params}`
      );

      const updatedData = rows.filter((row) => row._id !== params);
      setRows(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleRowClickEdit = (params) => {
    // Open the modal with the clicked row data
    handleeditFormModal(params.row);
  };

  const columns = [
    { field: "arabicName", headerName: "الإسم", flex: 1 },

    // Add more columns as needed
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
            onClick={() => handleRowClickDelete(params.row._id)}
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
            onClick={() => handleRowClickEdit(params)}
          >
            تعديل
          </Button>
        </>
      ),
    },
  ];

  const handleAddModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handlePageChange = (params) => {
    setPage(params.page);
    queryClient.invalidateQueries(["user-table", params.page]);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
    setPage(0);
  };
  const handleeditFormModal = (rowData) => {
    setEditForm(true);
    setSelectedRowData(rowData);
  };
  const handleCloseModal = async (newdata) => {
    setEditForm(false);

    // Assuming setSelectedRowData is not async, you can use it directly
    setSelectedRowData(newdata);
  };
  const handleFormSubmitSuccess = (updatedProduct) => {
    // Update the specific row in the state
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === updatedProduct.id ? updatedProduct : row
      );
      return updatedRows;
    });

    // Invalidate the query to trigger a refetch
    queryClient.invalidateQueries(["user-table", page]);
  };
  const data = {
    rows,
    columns,
    page,
    pageSize,
    rowCount: rows.length,
    pageSizeOptions: [10, 25, 50, 75, 100],
    filterModel,
    dataSet: "Employee",
    rowLength: 100,
  };

  return (
    <Box
      sx={{ height: 400, width: "100%", backgroundColor: "var(--main-color)" }}
    >
      <Modal
        open={openModal}
        onClose={handleAddModal}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CreateCategoryForm onClose={handleAddModal} />
      </Modal>
      <Modal
        open={editForm}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ChildModal
          onClose={handleCloseModal}
          rowData={selectedRowData}
          rows={rows}
          setRows={setRows}
          onSubmitSuccess={handleFormSubmitSuccess}
          setSelectedRowData={setSelectedRowData}
        />
      </Modal>
      <Button
        fullWidth
        type="submit"
        onClick={handleAddModal}
        sx={{
          margin: "10px",
          height: "3rem",
          width: "5rem",
          backgroundColor: "var(--brown-color)",
          color: "var(--main-color)",

          "&:hover": {
            backgroundColor: "var(--blue-color)",
            color: "var(--brown-color)",
          },
        }}
        color="primary"
      >
        أضف فئة فرعية
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ minHeight: "60vh" }}
          {...data}
          rows={rows}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onFilterModelChange={(model) => setFilterModel(model)}
          initialState={{
            ...data.initialState,

            filter: {
              ...data.initialState?.filter,
              filterModel: {
                items: [
                  {
                    field: "rating",
                    operator: ">",
                    value: "2.5",
                  },
                ],
              },
            },
          }}
          pageSizeOptions={[10, 25, 50, 75, 100]}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Box>
  );
};

export default SubCategoryTable;
