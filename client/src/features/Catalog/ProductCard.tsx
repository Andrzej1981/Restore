import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/backetSlice";

interface Props{
    product:Product;
}

export default function ProductCard({product}:Props){

  
  const dispatch = useAppDispatch();

  

    return(

        <Card>
            <CardHeader avatar={
                <Avatar sx={{bgcolor:'secondary.main'}}>
                {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
                title={product.name}
                titleTypographyProps={{
                    sx:{fontWeight:'bold', color:'primary.main'}
                }}
            >
            </CardHeader>
        <CardMedia
          sx={{ height: 140, backgroundSize: 'contain', bgcolor:'primary.light' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color='secondary' variant="h5">
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
           loading={status === 'pendingAddItem'+product.id}
           onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))}
           size="small">Dodaj do koszyka</LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">Zobacz</Button>
        </CardActions>
      </Card>

    );
}