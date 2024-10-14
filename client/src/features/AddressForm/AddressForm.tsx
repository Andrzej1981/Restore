import { Typography, Grid} from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
  const {control, formState} = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Adres dostawy
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="fullName" label="Imie i nazwisko"/>
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="address1"
            label="Adres dostawy 1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="address2"
            label="Adres dostawy 2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="city" label="Miasto" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="state" label="Województwo" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="zip" label="Kod pocztowy" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="country" label="Kraj" />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
            disabled={!formState.isDirty}
            name="saveAddress"
            label="Zapisz jako standardowy adres dostawy"
            control={control}
          />
        </Grid>
      </Grid>
    </>
  );
}