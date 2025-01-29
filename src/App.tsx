import { useEffect, useState } from "react";
import { ISingleData } from "./types/data";
import useFetch from "./hooks/fetchApi";
import { Box } from "@mui/system";
import { Button, CircularProgress, Dialog, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ContactTable from "./table";
import ContactForm from "./form";

function App() {
  const [appLoading, setAppLoading] = useState(true);
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

  useEffect(() => {
    setTimeout(() => {
      setAppLoading(false);
    }, 1000);
  }, []);

  return appLoading ? (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  ) : (
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

      {/* edit */}
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

      {/* add */}
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
