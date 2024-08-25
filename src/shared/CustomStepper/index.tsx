import { Step, StepLabel, Stepper } from "@mui/material";

interface Props {
  activeStep: number;
  steps?: string[];
}

const intialSteps = [
  "Create Password",
  "Secret Seed Phrase",
  "Confirm Secret Recovery Phrase",
  "Wallet Created Successfully.",
];

const CustomStepper = ({ activeStep, steps = intialSteps }: Props) => {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        marginBottom: "2rem",
        "& .MuiStepIcon-root": {
          fontSize: 30,
        },
        "& .MuiStepLabel-label": {
          fontSize: "1.2rem",
        },
        "& .MuiStepConnector-line": {
          height: "2px",
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomStepper;
