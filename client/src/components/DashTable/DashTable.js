import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import {
  GridToolbar,
  
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['admin', 'dataEntry', 'normal'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const sampleData = [
  {
    id: randomId(),
    name: randomTraderName(),
    email: 'user1@getMaxListeners.com',
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    email: 'user2@getMaxListeners.com',
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    email: 'user3@getMaxListeners.com',
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    email: 'user4@getMaxListeners.com',
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    email: "user5@hotmail.com",
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', email: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button sx={{
        // color: 368681,
        margin: "10px",
          height: "3rem",
          width: "5rem",
        border: '2px solid #368681',
        backgroundColor: "var(--brown-color)",
        color: "var(--main-color)",

        '&:hover':{
          
        
          backgroundColor: "var(--blue-color)",
          color: "var(--brown-color)",
        }
      
      }} color="primary" startIcon={<AddIcon />} onClick={handleClick}>
      أضف عميل
      </Button>
    </GridToolbarContainer>
  );
}

export default function DashTable() {
  const [rows, setRows] = React.useState(sampleData);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
 
  const columns = [
    
    { field: 'name', headerName: 'الإسم', width: 180, editable: true },
    {
      field: 'email',
      headerName: 'البريد الالكتروني',
      type: '',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'joinDate',
      headerName: 'تاريخ الانضمام',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'نوع العميل',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['admin', 'user', 'dataEntry'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
                
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
            sx={{
              '&:hover': {
                
                backgroundColor: 'var(--blue-color)',
              },
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'var(--main-color)',
              },
            }}
          />,
        ];
      },
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
    rows: sampleData,
    columns,
    page,
    pageSize,
    rowCount: sampleData.length,
    pageSizeOptions: [10, 25, 50, 75, 100],
    filterModel,
  };
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
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
                filterMode="server" // Optional: Use server-side filtering
                onFilterModelChange={(model) => setFilterModel(model)}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
          toolbar:GridToolbar
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
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
      />
        </div>
    </Box>
  );
}
