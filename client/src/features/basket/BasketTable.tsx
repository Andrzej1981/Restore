import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { removeBasketitemAsync, addBasketItemAsync } from "./backetSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface Props{
    items: BasketItem[];
    isBasket?:boolean; 
}

export default function BasketTable({items,isBasket=true}:Props){

    const {status} = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();

    return(
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell>Produkt</TableCell>
            <TableCell align="right">Cena</TableCell>
            <TableCell align="center">Ilość</TableCell>
            <TableCell align="right">Razem</TableCell>
            {isBasket &&
            <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display='flex' alignItems='center'>
                  <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight:20}}></img>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price)}</TableCell>
              <TableCell align="center">
              {isBasket &&  
                <LoadingButton 
                loading={status.includes('pendingRemoveItem'+ item.productId+'rem')} 
                onClick={() => dispatch(removeBasketitemAsync({productId:item.productId}))}
                color="error">
                  <Remove/>
                </LoadingButton> }
                {item.quantity}
                {isBasket &&
                <LoadingButton
                 loading={status.includes('pendingAddItem'+ item.productId+'rem')} 
                 onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))}
                 color="secondary">
                 <Add/>
                </LoadingButton>}
              </TableCell>
              <TableCell align="right">{currencyFormat(item.price*item.quantity)}</TableCell>
              {isBasket &&
              <TableCell align="right">
              <LoadingButton 
                loading={status.includes('pendingRemoveItem'+ item.productId+ 'del')} 
                onClick={() => dispatch(removeBasketitemAsync({productId:item.productId,quantity:item.quantity, name:'del'}))}
                color="error">
                    <Delete/>

                </LoadingButton>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}