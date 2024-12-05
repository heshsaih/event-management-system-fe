import { Step, StepConnector, StepLabel, Stepper } from "@mui/material";
import StyledContainer from "../../../components/StyledContainer";
import EventForm from "./EventForm";
import { useEffect, useState } from "react";
import CreateSessions from "./CreateSessions";
import Summary from "./Summary";
import { useSearchParams } from "react-router-dom";
import MailNotifications from "./MailNotifications";
import useWidth from "../../../hooks/useWidth";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

const steps = function (t: TFunction<"pl">) {
return [
  t("createEventPage.index.eventFormStep"),
  t("createEventPage.index.createSessions"),
  t("createEventPage.index.mailNotifications"),
  t("createEventPage.index.summary")
];

} 

function determineStep(step: string | null): number {
  const stepToNumber = Number(step);

  if (!step || isNaN(stepToNumber) || stepToNumber > 3 || stepToNumber < 0) {
    return 0;
  }
  return stepToNumber;
}

export default function CreateEventPage() {
  const {t} = useTranslation();
  const width = useWidth();
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("step");

  const [step, setStep] = useState<number>(determineStep(param));

  useEffect(
    function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [step]
  );

  useEffect(
    function () {
      setStep(determineStep(param));
    },
    [param]
  );

  const nextStep = function () {
    const nextStep = (step + 1) % 4;
    setStep(nextStep);
    setSearchParams(function (params) {
      params.set("step", String(nextStep));
      return params;
    });
  };

  const previousStep = function () {
    const previousStep = step - 1 >= 0 ? step - 1 : 3;
    setStep(previousStep);
    setSearchParams(function (params) {
      params.set("step", String(previousStep));
      return params;
    });
  };

  return (
    <StyledContainer
    >
      <Stepper
        activeStep={step}
        sx={{
          width: "100%",
          alignItems: "center"
        }}
        connector={width < 600 ? <></> : <StepConnector></StepConnector>}
        orientation={width < 600 ? "vertical" : "horizontal"}
      >
        {steps(t).map(function (e) {
          return (
            <Step key={e}>
              <StepLabel>{e}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {step === 0 && <EventForm nextStep={nextStep}></EventForm>}
      {step === 1 && (
        <CreateSessions
          previousStep={previousStep}
          nextStep={nextStep}
        ></CreateSessions>
      )}
      {step === 2 && (
        <MailNotifications
          previousStep={previousStep}
          nextStep={nextStep}
        ></MailNotifications>
      )}
      {step === 3 && <Summary previousStep={previousStep}></Summary>}
    </StyledContainer>
  );
}
