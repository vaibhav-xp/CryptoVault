"use client";

import CreatePasswordSchema from "@/schema/CreatePasswordSchema";
import PasswordInput from "@/shared/PasswordInput";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import { WalletCreationTypes } from "@/components/Welcome/types";
import CustomStepper from "@/shared/CustomStepper";

const NewPassword = ({ setStep, setData, stepper }: WalletCreationTypes) => {
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: CreatePasswordSchema,
    onSubmit: (values) => {
      const password = values.password;
      setData((prev) => ({ ...prev, password }));
      setStep();
    },
  });

  return (
    <Paper
      component={"div"}
      sx={{
        maxWidth: "500px",
        width: "100%",
        textAlign: "center",
        borderRadius: "20px",
        position: "relative",
        padding: "2rem",
      }}
    >
      <CustomStepper activeStep={1} steps={stepper} />
      <Typography variant={"h1"}>New Password</Typography>
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            width: "300px",
            margin: "2rem auto",
          }}
        >
          <PasswordInput
            field={formik.getFieldProps("password")}
            form={formik}
            label="Password"
          />
          <PasswordInput
            field={formik.getFieldProps("confirmPassword")}
            form={formik}
            label="Confirm Password"
          />
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "300px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default NewPassword;
