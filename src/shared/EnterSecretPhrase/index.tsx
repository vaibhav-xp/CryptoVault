import useMnemonic from "@/hooks/useMnemonic";
import PasswordInput from "@/shared/PasswordInput";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomStepper from "@/shared/CustomStepper";
import { WalletCreationTypes } from "@/components/Welcome/types";
import { ReactNode } from "react";

interface WalletCreateTypesChildren extends WalletCreationTypes {
  children: ReactNode;
}

const EnterSecretPhrase = ({
  setData,
  setStep,
  stepper,
  children,
}: WalletCreateTypesChildren) => {
  const seedPhraseLength = new Array(12);
  const { validateMnemonicPhrase } = useMnemonic();

  const validationSchema = Yup.object(
    seedPhraseLength.reduce((schema, _, idx) => {
      schema[idx] = Yup.string()
        .required("This field is required")
        .min(1, "Must be at least 1 character");
      return schema;
    }, {})
  );

  const initialValues = seedPhraseLength
    .fill(0)
    .reduce((obj: any, _, idx: number) => {
      obj[idx] = "";
      return obj;
    }, {});

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const seed = Object.values(values).join(" ");
      console.log(seed);

      if (validateMnemonicPhrase(seed)) {
        setData((prev) => ({
          ...prev,
          mnemonic: seed,
        }));
        setStep();
      }
    },
  });

  return (
    <Paper
      component={"div"}
      sx={{
        maxWidth: "500px",
        width: "100%",
        borderRadius: "20px",
        position: "relative",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {children}
      <Box component={"form"} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} width={"100%"}>
          {seedPhraseLength.map((_, idx) => (
            <Grid item xs={6} sm={4} key={idx}>
              <PasswordInput
                form={formik}
                label={(idx + 1).toString()}
                field={formik.getFieldProps(idx.toString())}
                error={
                  formik.touched[idx.toString()] &&
                  Boolean(formik.errors[idx.toString()])
                }
                helperText={
                  formik.touched[idx.toString()] &&
                  formik.errors[idx.toString()]
                }
              />
            </Grid>
          ))}
        </Grid>
        <Box
          component={"div"}
          marginTop={"1rem"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: "1rem",
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={formik.handleReset}
            disabled={!formik.dirty}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EnterSecretPhrase;
