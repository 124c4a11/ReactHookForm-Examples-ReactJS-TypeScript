import { useForm } from "react-hook-form";
import { TextField, Button, Stack, Typography, Grid } from "@mui/material";
import { DevTool } from "@hookform/devtools";

interface IData {
  email: string;
  password: string;
}

let renderCount = 0;

export function MuiForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<IData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: IData) => console.log(data);

  renderCount++;

  return (
    <Grid container justifyContent="center">
      <Grid>
        <Typography variant="h6" component="h1">
          Render count: {renderCount / 2}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} width={400}>
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Stack>
        </form>

        <DevTool control={control} />
      </Grid>
    </Grid>
  );
}
