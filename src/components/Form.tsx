import { DetailedHTMLProps, FormHTMLAttributes, PropsWithChildren } from "react"

type FormProps = PropsWithChildren<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>>;

export default function Form(props: FormProps) {
  const {style, ...rest} = props;
  return <form
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      ...style
    }}
    {...rest}
  >
    {props.children}
  </form>
}