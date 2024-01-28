///////////////////////table with pagination and filtration ///////////
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, FilterToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./product.css";
import { Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { fetchProducts } from "../../db/fetchProduct"; // Adjust the path accordingly

const ProductTable = () => {
  const [page, setPage] = useState(1); // Move the declaration of 'page' here

  const {
    isLoading,
    isError,
    data: ProductData,
  } = useQuery(["user-table", page], () => fetchProducts(page));
    // Update the state when data is loaded
    React.useEffect(() => {
      if (ProductData) {
        // Assuming your response has a 'products' field that contains the array of products
        const updatedRows = ProductData?.products.map((product) => ({
          ...product,
          id: product._id, // Set 'id' to the value of '_id'
        }));
    
        setRows(updatedRows);
      }
    }, [ProductData]);
  const navigate = useNavigate();

  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model
  const queryClient = useQueryClient();
  const [rows, setRows] = React.useState([]); //data
  const [pageSize, setPageSize] = useState(5);

  
 
  if (isLoading) {
    return <h2>Loading..</h2>;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }

  const handleRowClickDelete = async (params) => {
    const productId = params.row.id;

    try {
      // Send a DELETE request to the API to delete the product
      await axios.delete(`${process.env.REACT_APP_BACKEND}product/${productId}`);

      // If the delete request is successful, you may want to update the UI accordingly
      // For example, you can filter out the deleted row from the displayed data
      const updatedData = rows.filter((row) => row.id !== productId);
      setRows(updatedData);
      // Set the updated data to the state or wherever you store your data
      // setSampleData(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show a notification, etc.
    }
  };
  const handleRowClickEdit = async (params) => {
    const userId = params.row.id;

    navigate(`/product/${userId}`);
  };


  const columns = [
    { field: "arabicName", headerName: "الإسم", flex: 1 },
    { field: "name", headerName: "name in english", flex: 1 },
    { field: "price", headerName: "سعر", flex: 1 },
    { field: "serialNumber ", headerName: "رقم سري", flex: 1 },
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
            onClick={() => handleRowClickDelete(params)}
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

  const handleRowClick = (params, event) => {
    // Check if the clicked element is the delete button
    const isDeleteButton =
      event.target.tagName.toLowerCase() === "button" &&
      event.target.textContent.toLowerCase() === "حذف";

    // If it's the delete button, trigger the delete functionality
    if (isDeleteButton) {
      handleRowClickDelete(params);
    } else {
      // Otherwise, navigate to the product details page
      navigate(`/products/${params.id}`);
    }
  };

  const handlePageChange = (params) => {
    setPage(params.page);
    queryClient.invalidateQueries(["user-table", params.page]);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
    setPage(0);
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
