import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IData {
  username: string;
  email: string;
  password: string;
}

const schema = z.object({
  username: z.string().nonempty("Username is required!"),
  email: z
    .string()
    .nonempty("Email is required!")
    .email("Email format is not valid!"),
  password: z.string().nonempty("Password is required"),
});

export function ZodForm() {
  const { register, formState, control, handleSubmit } = useForm<IData>({
    resolver: zodResolver(schema),
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
