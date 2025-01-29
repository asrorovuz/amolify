import { useState } from "react";
import ContactTable from "./table";
import { ToastContainer } from "react-toastify";
import { Box, Button, Dialog, Typography } from "@mui/material";
import ContactForm from "./form";
import useFetch from "./hooks/fetchApi";
import { ISingleData } from "./types/data";

function App() {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [singleData, setSingleData] = useState<ISingleData | null>(null);
  const [type, setType] = useState<string | null>(null);

  const { data, loading, deleteData, editData, postData } = useFetch<any>(
    "https://67993d28be2191d708b2685d.mockapi.io/api/contact/contacts"
  );

  const handleClose = () => {
    setOpenModalEdit(false);
    setSingleData(null);
    setType(null);
    setOpenModalAdd(false);
  };

  const handelAddModal = () => {
    setOpenModalAdd(true);
    setType(null);
  };

  return (
    <>
      <ToastContainer />

      <Box
        sx={{
          height: "100vh",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h4">Contacts</Typography>
          <Button variant="contained" onClick={handelAddModal}>
            Add Contact
          </Button>
        </Box>
        <ContactTable
          setSingleData={setSingleData}
          setOpenModalEdit={setOpenModalEdit}
          setType={setType}
          deleteData={deleteData}
          data={data}
          loading={loading}
        />
      </Box>

      {/* edit  */}
      <Dialog
        open={openModalEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ContactForm
          singleData={singleData}
          setOpenModal={setOpenModalEdit}
          type={type}
          editData={editData}
          postData={postData}
          loading={loading}
        />
      </Dialog>

      {/* add  */}
      <Dialog
        open={openModalAdd}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ContactForm
          singleData={null}
          setOpenModal={setOpenModalAdd}
          type={type}
          editData={editData}
          postData={postData}
          loading={loading}
        />
      </Dialog>
    </>
  );
}

export default App;
