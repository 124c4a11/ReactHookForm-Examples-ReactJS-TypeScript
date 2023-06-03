import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface IData {
  username: string;
  email: string;
  password: string;
  socials: {
    twitter: string;
    facebook: string;
  };
  phones: string[];
  dynamicPhones: {
    number: string;
  }[];
}

export function BaseForm() {
  const { register, control, handleSubmit, formState } = useForm<IData>({
    defaultValues: {
      // or function
      username: "Username",
      email: "example@mail.com",
      password: "password",
      socials: {
        twitter: "",
        facebook: "",
      },
      phones: ["", ""],
      dynamicPhones: [{ number: "" }],
    },
  });
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "dynamicPhones",
    control,
  });

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

        <label>Twitter:</label>
        <input
          {...register("socials.twitter", {
            required: "Twitter is required!",
          })}
        />
        {errors.socials?.twitter?.message && (
          <p>{errors.socials?.twitter?.message}</p>
        )}

        <label>Facebook:</label>
        <input
          {...register("socials.facebook", {
            required: "Facebook is required!",
          })}
        />
        {errors.socials?.facebook?.message && (
          <p>{errors.socials?.facebook?.message}</p>
        )}

        <label>Phone:</label>
        <input
          {...register("phones.0", {
            required: "Phone is required!",
          })}
        />
        {errors?.phones?.[0]?.message && <p>{errors.phones?.[0]?.message}</p>}

        <label>Additional phone:</label>
        <input
          {...register("phones.1", {
            required: "Additional phone is required!",
          })}
        />
        {errors?.phones?.[1]?.message && <p>{errors.phones?.[1]?.message}</p>}

        <label>List of phones:</label>
        {fields.map((field, ndx) => (
          <>
            <input
              key={field.id}
              {...register(`dynamicPhones.${ndx}.number`)}
            />
            {ndx > 0 && (
              <button type="button" onClick={() => remove(0)}>
                Remove phone number
              </button>
            )}
          </>
        ))}
        <button type="button" onClick={() => append({ number: "" })}>
          Add phone number
        </button>

        <button type="submit">Send</button>
      </form>
      <DevTool control={control} />
    </>
  );
}
