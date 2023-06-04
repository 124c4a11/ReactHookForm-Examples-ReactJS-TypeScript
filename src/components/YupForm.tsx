import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IData {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required!"),
  email: yup
    .string()
    .email("Email format is not valid!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

export function YupForm() {
  const { register, formState, control, handleSubmit } = useForm<IData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const { errors } = formState;

  const onSubmit = (data: IData) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username:</label>
        <input {...register("username")} />
        {errors.username?.message && <p>{errors.username?.message}</p>}

        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <label>Password:</label>
        <input {...register("password")} />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <button type="submit">Send</button>
      </form>

      <DevTool control={control} />
    </>
  );
}
