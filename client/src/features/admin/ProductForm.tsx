import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import { Product } from "../../app/models/product";
import { useEffect } from "react";
import useProducts from "../../app/hooks/useProducts";
import AppSelectedList from "../../app/components/AppSelectedList";
import AppDropZone from "../../app/components/AppDropZone";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./ProductValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setProduct } from "../Catalog/catalogSlice";
import { LoadingButton } from "@mui/lab";

interface Props {
  product?: Product;
  cancelEdit: () => void;
}

export default function ProductForm({ product, cancelEdit }: Props) {
  const {control,reset,handleSubmit,watch,formState: { isDirty, isSubmitting }} = useForm({resolver: yupResolver<any>(validationSchema)});
  const { brands, types } = useProducts();
  const watchFile = watch('file',null);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
        let response:Product;
      if (product) {
        response = await agent.Admin.updateProduct(data);
      } else {
        response = await agent.Admin.updateProduct(data);
      }
      dispatch(setProduct(response));
      cancelEdit()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Szczegóły produktu
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              control={control}
              name="name"
              label="Nazwa produktu"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectedList
              control={control}
              item={brands}
              name="brand"
              label="Marka"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelectedList
              control={control}
              item={types}
              name="type"
              label="Typ produktu"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="price"
              label="Cena (wyrażona w groszach)"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="quantityInStock"
              label="Ilość na magazynie"
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              rows={4}
              control={control}
              name="description"
              label="Opis produktu"
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <AppDropZone control={control} name="file" />
              {watchFile ? (
                <img
                  src={watchFile.preview}
                  alt="prewiew"
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <img
                  src={product?.pictureUrl}
                  alt={product?.name}
                  style={{ maxHeight: 200 }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
            Anuluj
          </Button>
          <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="success">
            OK
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
