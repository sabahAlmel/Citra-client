import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CancelIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchOrders } from "../../db/fetchOrder";  
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import {
  GridToolbar,
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const roles = ["admin", "dataEntry", "normal"];
const randomRole = () => {
  return randomArrayItem(roles);
};




function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const [labelVisible, setLabelVisible] = useState(true);

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", email: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button
        sx={{
          // color: 368681,
          margin: "10px",
          height: "3rem",
          width: "5rem",
          border: "2px solid #368681",
          backgroundColor: "var(--brown-color)",
          color: "var(--main-color)",

          "&:hover": {
            backgroundColor: "var(--blue-color)",
            color: "var(--brown-color)",
          },
        }}
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
      >
        أضف عميل
      </Button>
    </GridToolbarContainer>
  );
}

export default function DashTable() {
  const queryClient = useQueryClient();
  const [rows, setRows] = useState([]); //data
  const [rowModesModel, setRowModesModel] = useState({});
  const navigate = useNavigate(); 
  const { isLoading, isError, data: orderData } = useQuery(
    "user-table",
    fetchOrders
  );


  useEffect(() => {
    if (orderData && orderData.orders) {
      const rowsWithId = orderData.orders.map((row) => ({
        ...row,
        id: row._id, // Assuming _id is a unique identifier
      }));
      setRows(rowsWithId);
    }
  }, [orderData]);
  


  if (isLoading) {
    return <h2>Loading..</h2>;
  }
  if (isError) {
    return <div>Error loading products</div>;
  }



  const handleRowClickDelete = async (params) => {
    const orderId = params.row.id;
    try {
      // Send a DELETE request to the API to delete the product
      await axios.delete(`${process.env.REACT_APP_BACKEND}user/${orderId}`);
  
      // If the delete request is successful, filter out the deleted row from the displayed data
      const updatedData = rows.filter((row) => row.id !== orderId);
      
      // Set the updated data to the state or wherever you store your data
      setRows(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show a notification, etc.
    }
  };
  const handleRowClickEdit = async (params) => {
    const orderId = params.row.id;

    navigate(`/user/${orderId}`);
  };




  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const [statuses, setStatuses] = React.useState({});

  const handleChange = (event, id) => {
    const newStatus = event.target.value;

    // Save the selected status to the statuses state
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newStatus,
    }));

    // You can also perform additional actions here if needed
    console.log(`Status ${newStatus} selected for row ID ${id}`);
  };
  const columns = [
    {
      field: "orderNB",
      headerName: "رقم الطلب",
      width: 180,
      editable: true,
      type: 'number',
      flex: 1,
      cellClassName: "delete-cell",
    },

    // {
    //   field: "selectedProduct",
    //   headerName: " إسم المنتج",
    //   width: 180,
    //   editable: true,
    //   flex: 1,
    //   cellClassName: "delete-cell",
    // },
    {
      field: "userId",
      headerName: "اسم المستخدم ",
      type: "",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
      flex: 1,
      cellClassName: "delete-cell",
    },
    {
      field: "address",
      headerName: "العنوان  ",
      type: "",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
      flex: 1,
      cellClassName: "delete-cell",
    },
    {
      field: "totalPrice",
      headerName: "  ",
      type: "المجموع",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
      flex: 1,
      cellClassName: "delete-cell",
    },
    {
      field: "joinDate",
      headerName: "تاريخ ",
      type: "date",
      width: 180,
      editable: true,
      flex: 1,
      cellClassName: "delete-cell",
    },
    {
      field: "actions", // Add a delete column
      headerName: "actions",
      flex: 1,
      cellClassName: "delete-cell",
      type: 'singleSelect',
      renderCell: (params) => (
        <>
          {/* <Button
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
            Cancel
          </Button> */}

          <Box sx={{ minWidth: 120, cellClassName: "actions" }}>
            <FormControl fullWidth>
              <InputLabel
                id={`status-label-${params.id} `}
                
                
              >
                Status
              </InputLabel>
              <Select
                labelId={`status-label-${params.id}`}
                id={`status-select-${params.id}`}
                value={statuses[params.id] || ""}
                label="Status"
                onChange={(event) => handleChange(event, params.id)}
              >
                <MenuItem value={10}>Pending</MenuItem>
                <MenuItem value={20}>Delivered</MenuItem>
                <MenuItem value={30}>Cancel</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </>
      ),
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
              backgroundColor: "var(--gray-color)",
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
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ minHeight: "60vh" }}
          {...data}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          // onRowClick={(params, event) => handleRowClick(params, event)}
          // filterMode="server" // Optional: Use server-side filtering
          onFilterModelChange={(model) => setFilterModel(model)}
        
          // editMode="row"
          // rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          // onRowEditStop={handleRowEditStop}
          // processRowUpdate={processRowUpdate}
          // slotProps={{
          //   toolbar: { setRows, setRowModesModel },
          // }}
          initialState={{
            ...data.initialState,
            //pagination
            // pagination: { paginationModel: { pageSize: 5 } },
            filter: {
              //filter
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
            // toolbar: EditToolbar,
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Box>
  );
}
