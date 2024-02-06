///////////////////////table with pagination and filtration ///////////
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
import "../product.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Modal from "@mui/material/Modal";
import ChildModal from "./categoryChildModal"; // Import the ChildModal component
import { fetchAllCategories } from "../../../db/fetchCategory";

const CategoryTable = () => {
  const [page, setPage] = useState(1); // Move the declaration of 'page' here
  // const navigate = useNavigate();
  const [rowModesModel, setRowModesModel] = useState({});

  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model
  const queryClient = useQueryClient();
  const [rows, setRows] = React.useState([]); //data
  const [pageSize, setPageSize] = useState(5);

  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  const [selectedRowData, setSelectedRowData] = useState(null); // Initialize selectedRowData

  const {
    isLoading,
    isError,
    data: CategoryData,
  } = useQuery(["user-table", page], () => fetchAllCategories(page));

  // React.useEffect(() => {
  //   if (CategoryData) {
  //     const updatedRows = CategoryData?.categories.map((product) => {
  //       // Check if categoryID and subCategoryID are not null or undefined
  //       const categoryName = product.categoryID
  //         ? product.categoryID.arabicName
  //         : null;
  //       const subCategoryName = product.subCategoryID
  //         ? product.subCategoryID.name
  //         : null;

  //       return {
  //         ...product,
  //         id: product._id,
  //         categoryName,
  //         subCategoryName,
  //       };
  //     });

  //     setRows(updatedRows);
  //   }
  // }, [CategoryData]);
  useEffect(() => {
    if (CategoryData && CategoryData.categories) {
      const rowsWithId = CategoryData.categories.map((row) => ({
        ...row,
        id: row._id, // Assuming _id is a unique identifier
      }));
      setRows(rowsWithId);
    }
    setRowModesModel({});
  }, [CategoryData]);

  if (isLoading) {
    return <h2>Loading..</h2>;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }

  const handleRowClickDelete = async (params) => {
    // const productId = params.row.id;

    try {
      // Send a DELETE request to the API to delete the product
      await axios.delete(
        `${process.env.REACT_APP_BACKEND}category/delete/${params}`
      );

      // If the delete request is successful, you may want to update the UI accordingly
      // For example, you can filter out the deleted row from the displayed data
      const updatedData = rows.filter((row) => row._id !== params);
      setRows(updatedData);
      // Set the updated data to the state or wherever you store your data
      // setSampleData(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show a notification, etc.
    }
  };
  const handleRowClickEdit = (params) => {
    // Open the modal with the clicked row data
    handleOpenModal(params.row);
  };

  const columns = [
    { field: "arabicName", headerName: "الإسم", flex: 1 },
    { field: "image", headerName: "الصورة", flex: 1 },

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

  const handlePageChange = (params) => {
    setPage(params.page);
    queryClient.invalidateQueries(["user-table", params.page]);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
    setPage(0);
  };
  const handleOpenModal = (rowData) => {
    setOpenModal(true);
    setSelectedRowData(rowData);
  };
  const handleCloseModal = async (newdata) => {
    setOpenModal(false);

    // Assuming setSelectedRowData is not async, you can use it directly
    setSelectedRowData(newdata);
  };

  // const handleFormSubmitSuccess = (updatedRows) => {
  //   // Update the local state (rows) with the updated data
  //   setRows(updatedRows);

  //   // Invalidate the query to trigger a refetch
  //   queryClient.invalidateQueries("user-table");
  // };
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ minHeight: "60vh" }}
          {...data}
          rows={rows}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          // onRowClick={(params, event) => handleRowClick(params, event)}
          // filterMode="server" // Optional: Use server-side filtering
          onFilterModelChange={(model) => setFilterModel(model)}
          initialState={{
            ...data.initialState,
            //pagination
            // pagination: { paginationModel: { pageSize: 5 } },

            //filter
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

export default CategoryTable;