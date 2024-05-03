import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketitemAsync} from "../basket/backetSlice";

export default function ProductDetails(){
    const {basket,status} = useAppSelector(state=>state.basket)
    const dispatch = useAppDispatch();
    const {id} = useParams<{id:string}>();
    const [product,setProduct] = useState<Product | null>(null);
    const [loading,setLoading] = useState(true);
    const [quantity,setQuantity] = useState(0);
    const item = basket?.items.find(i=>i.productId === product?.id);

    useEffect(()=>{
        if(item) setQuantity(item.quantity);
        id && agent.Catalog.details(parseInt(id))
        .then(response=>setProduct(response))
        .then(error => console.log(error))
        .finally(()=>setLoading(false));
        
    },[id,item])

    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        if(parseInt(event.currentTarget.value) >= 0)
            {
        setQuantity(parseInt(event.currentTarget.value));
          }
    }

    function handleUpdateCart(){
        if(!product) return;
        
        if (!item || quantity>item.quantity){
            const updateQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId:product?.id,quantity:updateQuantity}))
        } else {
            const updateQuantity = item.quantity - quantity;
            dispatch(removeBasketitemAsync({productId:product?.id,quantity:updateQuantity}))
        }
    }

    if(loading)return <LoadingComponent message="Loading product..."/>
    if(!product) return <NotFound/>

    return(
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}} />
            </Grid>
            <Grid  item xs={6}>
                <Typography variant="h6">
                    {product.name}
                </Typography>
                <Divider sx={{mb:2}} />
                <Typography variant="h4" color='secondary'>{(product.price*0.021).toFixed(2)} zł</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Nazwa</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell>Opis produktu</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow> 
                                <TableCell>Typ</TableCell>
                                <TableCell>{product.type}</TableCell> 
                            </TableRow>
                            <TableRow>
                                <TableCell>Marka</TableCell>
                                <TableCell>{product.brand}</TableCell> 
                            </TableRow>
                            <TableRow>
                                <TableCell>Ilość sztuk w magazynie</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>  
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                             onChange={handleInputChange}
                             variant="outlined"
                             type='number'
                             label='Ilość w koszyku'
                             fullWidth
                             value={quantity}
                             ></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                            disabled = {item?.quantity === quantity || !item && quantity ===0} 
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height:'55px'}}
                            color='primary'
                            size='large'
                            variant="contained"
                            fullWidth
                            >
                                {item ? 'Aktualizuj ilość' : 'Dodaj do koszyka'}
                            </LoadingButton>
                        </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
    }