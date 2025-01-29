import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { ISingleData, ITableDataProps } from "../types/data";

const ContactTable = ({
  setSingleData,
  setOpenModalEdit,
  setType,
  deleteData,
  data,
  loading,
}: ITableDataProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const rowsPerPage = 5; // Faqat 5 qator bo'ladi

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteData(deleteId); // Ma'lumotni o'chirish
    }
    setOpenDialog(false);
    setDeleteId(null);
  };

  const handleEditDialog = (data: ISingleData | null) => {
    setOpenModalEdit(true);
    setType("edit");
    setSingleData(data);
  };

  //@ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer  sx={{maxWidth: "100%", overflowX: "auto"}}>
      <Table sx={{border: "1px solid #ccc", borderCollapse: "collapse", minWidth: "800px"}}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Faqat 5 ta ma'lumotni ko'rsatish
            .map((item) => (
              <TableRow key={item?.id}>
                <TableCell>{item?.id}</TableCell>
                <TableCell>
                  {item?.firstName} {item?.lastName}
                </TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.phone}</TableCell>
                <TableCell>
                  <Box display="flex" gap={2}>
                    <Button
                      color="error"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(item?.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      color="success"
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditDialog(item)}
                    >
                      Edit
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />

      {/* O'chirish uchun dialog oynasi */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Contact</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this contact?</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            loading={loading}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ContactTable;
