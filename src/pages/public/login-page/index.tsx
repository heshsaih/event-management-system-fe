import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../../components/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../components/Form";
import StyledLink from "../../../components/StyledLink";
import StyledContainer from "../../../components/StyledContainer";
import { Colors } from "../../../constants/styling";
import useLogin from "../../../data/useLogin";

const loginSchema = z.object({
  email: z
    .string()
    .email("Podany adres e-mail nie jest poprawny"),
  password: z
    .string()
    .min(1, "Hasło jest wymagane")
    .max(16, "Hasło musi mieć max. 16 znaków"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {isFetching, login} = useLogin();
  const a = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = a.handleSubmit(function (e) {
    login(e);
  });

  return (
    <>
      <StyledContainer>
        <Typography variant="h3">Zaloguj się</Typography>
        <FormProvider {...a}>
          <Form onSubmit={submit}>
            <TextInput type="email" label="Adres e-mail" name="email"></TextInput>
            <TextInput
              label="Hasło"
              name="password"
              type="password"
            ></TextInput>
            <Button
              fullWidth
              type="submit"
            >
              {isFetching ? <CircularProgress></CircularProgress> : "Zaloguj"}
            </Button>
            <Box
              sx={{
                width: "100%",
                display: "flex",
              }}
            >
              <StyledLink style={{ color: Colors.RED }} to={"/forgot-password"}>
                Zresetuj hasło
              </StyledLink>
              <Typography flexGrow={1}></Typography>
              <StyledLink style={{ color: Colors.RED }} to={"/register"}>
                Nie masz konta? Zarejestruj się!
              </StyledLink>
            </Box>
            <Typography margin={"2rem 0"}>lub</Typography>
            <Button fullWidth>
              Zaloguj się przez CAS
            </Button>
          </Form>
        </FormProvider>
      </StyledContainer>
    </>
  );
}
