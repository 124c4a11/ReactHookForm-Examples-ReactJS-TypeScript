import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IData {
  username: string;
  email: string;
  password: string;
}

export function BaseForm() {
  const { register, control, handleSubmit, formState } = useForm<IData>({
    defaultValues: {
      // or function
      username: "Username",
      email: "example@mail.com",
      password: "password",
    },
  });
  const { errors } = formState;

  const onSubmit = (data: IData) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>Username:</label>
        <input
          {...register("username", {
            required: "Username is required!",
          })}
        />
        {errors.username?.message && <p>{errors.username?.message}</p>}

        <label>Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required!",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format!",
            },
            validate: {
              notAdmit: (fieldValue) => {
                return (
                  fieldValue !== "admit@example.com" ||
                  "Enter a different email address!"
                );
              },

              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("@blacklist.com") ||
                  "This domail is not supported!"
                );
              },
            },
          })}
        />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <label>Password:</label>
        <input
          {...register("password", {
            required: "Password is required!",
          })}
        />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <button type="submit">Send</button>
      </form>
      <DevTool control={control} />
    </>
  );
}
