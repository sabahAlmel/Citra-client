

///////////////////////table with pagination and filtration ///////////
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar, FilterToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import "./product.css";
import { Button } from "@mui/material";
import { fetchUsers, editUsers } from "../../db/fetchUser";  // Adjust the path accordingly
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
const DashTable = () => {
  const queryClient = useQueryClient();
  const [rows, setRows] = React.useState([]);//data
  const { isLoading, data: usersData } = useQuery("user-table", fetchUsers);

  const handleRowClickDelete = async (params) => {
    const userId = params.row.id;
    try {
      // Send a DELETE request to the API to delete the product
      await axios.delete(`${process.env.REACT_APP_BACKEND}user/${userId}`);
  
      // If the delete request is successful, filter out the deleted row from the displayed data
      const updatedData = rows.filter((row) => row.id !== userId);
      
      // Set the updated data to the state or wherever you store your data
      setRows(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show a notification, etc.
    }
  };
  const handleRowClickEdit = async (params) => {
    const userId = params.row.id;

    navigate(`/user/${userId}`);
  };
  // Update the state when data is loaded
  React.useEffect(() => {
    if (usersData) {
      setRows(usersData);
    }
  }, [usersData]);
  

  const columns = [
    { field: 'name', headerName: 'الإسم', width: 180, editable: true ,    flex:1,},
    {    flex:1,
      field: 'email',
      headerName: 'البريد الالكتروني',
      type: '',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {    flex:1,
      field: 'joinDate',
      headerName: 'تاريخ الانضمام',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      flex: 1,
      field: 'phone',
      headerName: 'رقم الهاتف',
      width: 220,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {    flex:1,
      field: 'role',
      headerName: 'نوع العميل',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['admin', 'user', 'dataEntry'],
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
  const navigate = useNavigate();

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
        أضف عميل
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ minHeight: "60vh", }}
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

export default DashTable;
