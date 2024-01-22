

///////////////////////table with pagination and filtration ///////////
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, FilterToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./product.css";
import { Button } from "@mui/material";

import axios from "axios";

const ProductTable = () => {
  const handleRowClickDelete = async (params) => {
    const productId = params.row.id;

    try {
      // Send a DELETE request to the API to delete the product
      await axios.delete(`${process.env.REACT_APP_API}product/${productId}`);

      // If the delete request is successful, you may want to update the UI accordingly
      // For example, you can filter out the deleted row from the displayed data
      const updatedData = sampleData.filter((row) => row.id !== productId);
      // Set the updated data to the state or wherever you store your data
      // setSampleData(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show a notification, etc.
    }
  };
  // Sample static data for testing
  const sampleData = [
    {
      id: 72287362676,
      الإسم: "rayannn",
      "name in english": "Product 1 (English)",
      date: "2022-01-20",
      سعر: 100,
      "رقم سري": "ABC123",
    },
    {
      id: 2,
      الإسم: "Product 2",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 3,
      الإسم: "Product 3",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 4,
      الإسم: "Product 4",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 5,
      الإسم: "Product 5",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 6,
      الإسم: "Product 6",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 7,
      الإسم: "Product 7",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 8,
      الإسم: "Product 8",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 9,
      الإسم: "Product 9",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 10,
      الإسم: "Product 10",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 11,
      الإسم: "Product 11",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 12,
      الإسم: "Product 12",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },
    {
      id: 13,
      الإسم: "Product 13",
      "name in english": "Product 2 (English)",
      date: "2022-01-21",
      سعر: 150,
      "رقم سري": "XYZ456",
    },

    // Add more sample data as needed
  ];

  const columns = [
    { field: "الإسم", headerName: "الإسم", flex: 1 , },
    { field: "name in english", headerName: "name in english", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      type: "date",
      valueGetter: (params) => new Date(params.row.date),
    },
    { field: "سعر", headerName: "سعر", flex: 1 },
    { field: "رقم سري", headerName: "رقم سري", flex: 1 },
    // Add more columns as needed
    {
      field: "delete", // Add a delete column
      headerName: "Delete",
      flex: 1,
      cellClassName: "delete-cell",

      renderCell: (params) => (
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
          onClick={() => handleRowClickDelete(params)}
        >
          Delete
        </Button>
      ),
    },
  ];
  const navigate = useNavigate();

  const handleRowClick = (params, event) => {
    // Check if the clicked element is the delete button
    const isDeleteButton =
      event.target.tagName.toLowerCase() === "button" &&
      event.target.textContent.toLowerCase() === "delete";

    // If it's the delete button, trigger the delete functionality
    if (isDeleteButton) {
      handleRowClickDelete(params);
    } else {
      // Otherwise, navigate to the product details page
      navigate(`/products/${params.id}`);
    }
  };

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
    setPage(0);
  };

  const data = {
    rows: sampleData,
    columns,
    page,
    pageSize,
    rowCount: sampleData.length,
    pageSizeOptions: [10, 25, 50, 75, 100],
    filterModel,
    dataSet: 'Employee',
    visibleFields: columns,
    rowLength: 100,
  };

  return (
    <Box
      sx={{ height: 400, width: "100%", backgroundColor: "var(--main-color)" }}
    >
      <Button
        fullWidth
        type="submit"
        onClick={() => (window.location.href = "/")}
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
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onRowClick={(params, event) => handleRowClick(params, event)}
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

export default ProductTable;
