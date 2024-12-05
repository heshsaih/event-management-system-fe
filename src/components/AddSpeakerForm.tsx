import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "./Form";
import TextInput from "./TextInput";
import { useState } from "react";
import useSpeaker from "../data/useSpeaker";
import StyledModal from "./StyledModal";
import ControlledAutocomplete, {
} from "./ControlledAutocomplete";
import { useSpeakerTitle } from "../data/useSpeakerTitle";
import { useOrganization } from "../data/useOrganization";
import useAsyncSpeakerTitle from "../data/useAsyncSpeakerTitle";
import useAsyncOrganization from "../data/useAsyncOrganization";

type AddSpeakerFormProps = {
  open: boolean;
  onClose: () => void;
};

const addSpeakerSchema = z.object({
  firstName: z.string().min(3, "Imię musi mieć min. 3 znaki"),
  lastName: z.string().min(3, "Nazwisko musi mieć min. 3 znaki"),
  speakerTitle: z
    .object({
      label: z.string().min(1),
      value: z.string().min(1),
    })
    .optional(),
  organization: z
    .object({
      label: z.string().min(1),
      value: z.string().min(1),
    })
    .optional(),
  email: z.string().email("Podany adres e-mail nie jest poprawnym adresem"),
  backupEmail: z.string().optional(),
});

export type AddSpeakerFormType = z.infer<typeof addSpeakerSchema>;

export default function AddSpeakerForm(props: AddSpeakerFormProps) {
  const [newSpeakerTitle, setNewSpeakerTitle] = useState<string>("");
  const [newOrganization, setNewOrganization] = useState<string>("");
  const { createSpeakerTitle } = useSpeakerTitle();
  const { createOrganization } = useOrganization();
  const { isCreating, createSpeaker, getAllSpeakers } = useSpeaker();
  const speakerTitles = useAsyncSpeakerTitle();
  const organizations = useAsyncOrganization();

  const a = useForm<AddSpeakerFormType>({
    resolver: zodResolver(addSpeakerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      speakerTitle: {
        label: "",
        value: "",
      },
      organization: {
        label: "",
        value: "",
      },
      email: "",
      backupEmail: "",
    },
  });

  const submit = a.handleSubmit(async function (data) {
    const success = await createSpeaker([
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        backupEmail: data.backupEmail,
        speakerTitleId: data.speakerTitle?.value,
        organizationId: data.organization?.value,
      },
    ]);
    if (success) {
      await getAllSpeakers();
      a.reset();
      speakerTitles.setComponentState({
        label: "",
        value: "",
      });
      organizations.setComponentState({
        label: "",
        value: "",
      });
      props.onClose();
    }
  });

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <>
        <Typography variant="h4">Dodaj prelegenta</Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
              }}
            >
              <TextInput name="firstName" label="Imię*"></TextInput>
              <Typography marginX={2}></Typography>
              <TextInput name="lastName" label="Nazwisko*"></TextInput>
            </Box>
            <ControlledAutocomplete
              async
              name="speakerTitle"
              options={speakerTitles.options ?? []}
              componentState={speakerTitles.componentState}
              setComponentState={speakerTitles.setComponentState}
              label="Tytuł naukowy"
              createable
              createLabel="Taki tytuł nie istnieje, kliknij aby go utworzyć"
              createValue={crypto.randomUUID()}
              onCreateCallback={async function () {
                const result = await createSpeakerTitle([
                  {
                    name: newSpeakerTitle,
                  },
                ]);
                if (result) {
                  speakerTitles.setComponentState({
                    label: "",
                    value: "",
                  });
                }
              }}
              filterCallback={function (phrase) {
                setNewSpeakerTitle(phrase);
                speakerTitles.setInput(phrase);
              }}
            ></ControlledAutocomplete>
            <ControlledAutocomplete
              loading
              async
              name="organization"
              options={organizations.options ?? []}
              componentState={organizations.componentState}
              setComponentState={organizations.setComponentState}
              label="Organizacja"
              createable
              createLabel="Taka organizacja nie istnieje, kliknij aby ją utworzyć"
              createValue={crypto.randomUUID()}
              onCreateCallback={async function () {
                const result = await createOrganization([
                  {
                    name: newOrganization,
                  },
                ]);
                if (result) {
                  organizations.setComponentState({
                    label: "",
                    value: "",
                  });
                }
              }}
              filterCallback={function (phrase) {
                setNewOrganization(phrase);
                organizations.setInput(phrase);
              }}
            ></ControlledAutocomplete>
            <TextInput name="email" label="Adres e-mail*"></TextInput>
            <TextInput
              name="backupEmail"
              label="Zapasowy adres e-mail"
            ></TextInput>
            <Button type="submit">
              {isCreating ? <CircularProgress></CircularProgress> : "Utwórz"}
            </Button>
          </Form>
        </FormProvider>
      </>
    </StyledModal>
  );
}
