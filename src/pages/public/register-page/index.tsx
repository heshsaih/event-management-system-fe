import { Box, Button, Typography } from "@mui/material";
import ShadowContainer from "../../../components/StyledContainer";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import TextInput from "../../../components/TextInput";
import StyledLink from "../../../components/StyledLink";
import PasswordRequirements from "./PasswordRequirements";
import { Colors } from "../../../constants/styling";

const registerSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane").max(24, ""),
  lastName: z.string().min(1, "Nazwisko jest wymagane").max(24, ""),
  email: z.string().email("Podana wartość nie jest poprawnym adresem e-mail"),
  password: z.string().min(8, "").max(24, ""),
  confirmPassword: z.string().min(8, "Hasło musi mieć 8 znaków")
}).refine(function(schema) {
  return schema.confirmPassword === schema.password;
}, {
  message: "Hasła muszą być identyczne",
  path: ["confirmPassword"]
});

export type RegisterCredentials = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const a = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const submit = a.handleSubmit(function(e) {
    console.log(e);
  });

  return <ShadowContainer>
    <Typography variant="h3">Zarejestruj się</Typography>
    <FormProvider {...a}>
      <Form onSubmit={submit}>
        <Box
          sx={{
            display: "flex",
            width: "100%"
          }}
        >
          <TextInput sx={{ marginLeft: 0 }} label="Imię" name="firstName"></TextInput>
          <Typography marginX={1}></Typography>
          <TextInput label="Nazwisko" name="lastName"></TextInput>
        </Box>
        <TextInput label="Adres e-mail" name="email"></TextInput>
        <TextInput type="password" label="Hasło" name="password"></TextInput>
        <PasswordRequirements></PasswordRequirements>
        <TextInput type="password" label="Potwierdź hasło" name="confirmPassword"></TextInput>
        <Button fullWidth type="submit">Zarejestruj się</Button>
        <StyledLink style={{color: Colors.RED}} to={"/login"}>Masz już konto? Zaloguj się</StyledLink>
      </Form>
    </FormProvider>
  </ShadowContainer>
}