///////////////////////table with pagination and filtration ///////////
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
import "../product.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { fetchProducts } from "../../../db/fetchProduct";
import Modal from "@mui/material/Modal";
import ChildModal from "./productChildModal"; // Import the ChildModal component

const ProductTable = () => {
  const [page, setPage] = useState(1); // Move the declaration of 'page' here
  // const navigate = useNavigate();

  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model
  const queryClient = useQueryClient();
  const [rows, setRows] = React.useState([]); //data
  const [pageSize, setPageSize] = useState(5);

  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  const [selectedRowData, setSelectedRowData] = useState(null); // Initialize selectedRowData

  const {
    isLoading,
    isError,
    data: ProductData,
  } = useQuery(["user-table", page], () => fetchProducts(page));
  // Update the state when data is loaded
  // React.useEffect(() => {
  //   if (ProductData) {
  //     // Assuming your response has a 'products' field that contains the array of products
  //     const updatedRows = ProductData?.products.map((product) => ({
  //       ...product,
  //       id: product._id, // Set 'id' to the value of '_id'
  //     }));

  //     setRows(updatedRows);
  //   }
  // }, [ProductData]);
  // React.useEffect(() => {

  //     // Assuming your response has a 'products' field that contains the array of products
  //     const updatedRows = ProductData?.products.map(async (product) => {
  //       try {
  //         // Fetch category details based on categoryID
  //         const categoryResponse = await axios.get(
  //           `${process.env.REACT_APP_BACKEND}category/getone/${product.categoryID}`
  //         );

  //         // Extract category name
  //         const categoryName = categoryResponse.data.category.name;

  //         // Return the updated product object with additional fields
  //         return {
  //           ...product,
  //           id: product._id, // Set 'id' to the value of '_id'
  //           categoryName,
  //         };
  //       } catch (error) {
  //         console.error("Error fetching category:", error);
  //         // Handle the error appropriately, e.g., set categoryName to a default value
  //         return {
  //           ...product,
  //           id: product._id,
  //           categoryName: "Unknown Category",
  //         };
  //       }
  //     });

  // }, [ProductData]);

  React.useEffect(() => {
    if (ProductData) {
      const updatedRows = ProductData?.products.map((product) => {
        // Check if categoryID and subCategoryID are not null or undefined
        const categoryName = product.categoryID
          ? product.categoryID.arabicName
          : null;
        const subCategoryName = product.subCategoryID
          ? product.subCategoryID.name
          : null;

        return {
          ...product,
          id: product._id,
          categoryName,
          subCategoryName,
        };
      });

      setRows(updatedRows);
    }
  }, [ProductData]);

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
      await axios.delete(
        `${process.env.REACT_APP_BACKEND}product/${productId}`
      );

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
  const handleRowClickEdit = (params) => {
    // Open the modal with the clicked row data
    handleOpenModal(params.row);
  };

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
    },
    {
      field: "subCategoryName",
      headerName: "تصنيف فرعي",
      flex: 0.5,
      renderCell: (params)=> {
        return <p>{params.row.subCategoryID && params.row.subCategoryID.arabicName}</p>
      }
    },

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
            onClick={() => handleRowClickDelete(params.row.id)}
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

  // const handleRowClick = (params, event) => {
  //   // Check if the clicked element is the delete button
  //   const isDeleteButton =
  //     event.target.tagName.toLowerCase() === "button" &&
  //     event.target.textContent.toLowerCase() === "حذف";

  //   // If it's the delete button, trigger the delete functionality
  //   if (isDeleteButton) {
  //     handleRowClickDelete(params);
  //   } else {
  //     // Otherwise, navigate to the product details page
  //     // navigate(`/products/${params.id}`);

  //       handleOpenModal(params.row);

  //   }
  // };

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
    // visibleFields: columns,
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
        {/* <ChildModal onClose={handleCloseModal} rowData={selectedRowData} setRows={setRows} /> */}
      </Modal>
      <Button
        fullWidth
        type="submit"
        // onClick={() => (window.location.href = "/")}
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

export default ProductTable;
