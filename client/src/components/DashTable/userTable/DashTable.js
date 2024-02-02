///////////////////////table with pagination and filtration ///////////
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../product.css";
import { Button } from "@mui/material";
import { fetchUsers, editUsers } from "../../../db/fetchUser";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import Modal from "@mui/material/Modal";
import ChildModal from "./dashChildModal"; // Import the ChildModal component
import LoadingPage from "../../loadingPage";
const DashTable = () => {
  const queryClient = useQueryClient();
  const [rows, setRows] = React.useState([]); //data for all rows
  const { isLoading, data: usersData } = useQuery("user-table", fetchUsers);
  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  const [selectedRowData, setSelectedRowData] = useState(); // Initialize selectedRowData
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model

  const handleRowClickDelete = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}user/${userId}`);
      const updatedData = rows.filter((row) => row.id !== userId);

      // Set the updated data to the state or wherever you store your data
      setRows(updatedData);

      // Invalidate the query to trigger a refetch
      queryClient.invalidateQueries("user-table");
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show a notification, etc.
    }
  };
  // Update the state when data is loaded
  React.useEffect(() => {
    if (usersData) {
      setRows(usersData);
    }
  }, [usersData]);



  const columns = [
    {
      field: "name",
      headerName: "الإسم",
      width: 180,
      flex: 1,
      cellClassName: "delete-cell",
    },
    {
      flex: 1,
      field: "email",
      headerName: "البريد الالكتروني",
      type: "",
      width: 180,
      align: "left",
      headerAlign: "left",
      cellClassName: "delete-cell",
    },
    {
      flex: 1,
      field: "joinDate",
      headerName: "تاريخ الانضمام",
      type: "date",
      width: 180,
      cellClassName: "delete-cell",
      valueGetter: (params) => {
        // Assuming that createdAt is a property of the rowData
        const createdAt = params.row.createdAt;

        // If createdAt is available, format it as a date
        return createdAt ? new Date(createdAt) : null;
      },
    },
    {
      flex: 1,
      field: "phone",
      headerName: "رقم الهاتف",
      width: 220,
      type: "number",
      align: "left",
      headerAlign: "left",
      cellClassName: "delete-cell",
    },
    {
      flex: 1,
      field: "role",
      headerName: "نوع العميل",
      width: 220,
      type: "singleSelect",
      valueOptions: ["مدير", "مستخدم", "مدخل بيانات"],
      cellClassName: "delete-cell",
    },
    {
      field: "delete",
      headerName: "العمليات",
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
              marginLeft:"10px"
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

  const handlePageChange = (params) => {
    setPage(params.page);
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

  const handleRowClickEdit = (params) => {
    // Open the modal with the clicked row data
    handleOpenModal(params.row);
  };
  const handleFormSubmitSuccess = (updatedRows) => {
    // Update the local state (rows) with the updated data
    setRows(updatedRows);

    // Invalidate the query to trigger a refetch
    queryClient.invalidateQueries("user-table");
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
  if(isLoading){
    <LoadingPage/>
  }
  return (
    <Box
      sx={{ height: 400, width: "100%", backgroundColor: "var(--main-color)" }}
    >
      <toast />

      {/* Modal */}
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
