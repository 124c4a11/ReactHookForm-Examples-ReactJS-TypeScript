import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Fragment, useEffect } from "react";

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
  age: number;
  birth: Date;
}

export function BaseForm() {
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = useForm<IData>({
    defaultValues: {
      // or function
      username: "Username",
      email: "example@mail.com",
      password: "password",
      socials: {
        twitter: "",
        facebook: "",
      },
      phones: ["77777", "888"],
      dynamicPhones: [{ number: "" }],
      age: 0,
      birth: new Date(),
    },
  });
  const { errors, touchedFields, dirtyFields, isDirty } = formState;

  console.log("touchedFields", touchedFields);
  console.log("dirtyFields", dirtyFields);
  console.log("isDirty", isDirty);

  const { fields, append, remove } = useFieldArray({
    name: "dynamicPhones",
    control,
  });

  const watchUsername = watch("username");

  useEffect(() => {
    const watcher = watch((value) => console.log(value));

    return () => watcher.unsubscribe();
  }, [watch]);

  const onSubmit = (data: IData) => console.log(data);

  const onError = (errors: FieldErrors) => console.log("onErrors", errors);

  const onGetValues = () =>
    console.log(getValues(["username", "socials.twitter"]));

  const onSetValue = () =>
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <label>Username: {watchUsername}</label>
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
            disabled: watch("socials.twitter") !== "",
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
          <Fragment key={ndx}>
            <input
              key={field.id}
              {...register(`dynamicPhones.${ndx}.number`)}
            />
            {ndx > 0 && (
              <button type="button" onClick={() => remove(0)}>
                Remove phone number
              </button>
            )}
          </Fragment>
        ))}
        <button type="button" onClick={() => append({ number: "" })}>
          Add phone number
        </button>

        <label>Age:</label>
        <input
          type="number"
          {...register("age", {
            valueAsNumber: true,
            required: "Age is required!",
          })}
        />
        {errors.age?.message && <p>{errors.age?.message}</p>}

        <label>Birth:</label>
        <input
          type="date"
          {...register("birth", {
            valueAsDate: true,
            required: "Birth is required!",
          })}
        />
        {errors.birth?.message && <p>{errors.birth?.message}</p>}

        <button type="submit">Send</button>

        <button type="button" onClick={onGetValues}>
          Get values
        </button>

        <button type="button" onClick={onSetValue}>
          Set value
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
}
