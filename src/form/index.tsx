import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import InputMask from "react-input-mask";
import { useEffect } from "react";
import { ISingleData } from "../types/data";

// Validation schema
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
      "Phone number format: +998 (99) 999-99-99"
    )
    .required("Phone number is required"),
});

const ContactForm = ({
  singleData,
  setOpenModal,
  editData,
  loading,
  postData,
  type,
}: {
  singleData: ISingleData | null;
  setOpenModal: (value: boolean) => void;
  // setSingleData?: (value: FormData | null) => void;
  editData: (id: string, data: FormData) => Promise<void>;
  loading: boolean;
  postData: (data: FormData) => Promise<void>;
  type?: string | null;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: singleData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (singleData) {
      reset(singleData);
    }
  }, [singleData, reset, type]);

  const onSubmit = async (data: FormData) => {
    if (singleData && type === "edit") {
      await editData(singleData?.id, data);
    } else {
      await postData(data);
    }
    setOpenModal(false);
  };

  const onCancel = () => {
    setOpenModal(false);
    reset();
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5">
        {type === "edit" ? "Edit Contact" : "Add Contact"}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex min-w-[300px] flex-col gap-5"
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputMask mask="+998 (99) 999-99-99" {...field}>
              {(inputProps: any) => (
                <TextField
                  {...inputProps}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            </InputMask>
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
