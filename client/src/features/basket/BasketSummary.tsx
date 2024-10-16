import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
    subtotal?:number;
}

export default function BasketSummary({subtotal}:Props) {
    const {basket} = useAppSelector(state=>state.basket)
    if (subtotal === undefined)
       subtotal = basket?.items.reduce((sum,item)=>sum+(item.quantity*item.price),0) ?? 0;
    const deliveryFee = subtotal > 80000 ? 0 : 10000;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Razem bez wysyłki:</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Cena dostawy*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Razem z wysyłką</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Zamówienia powyżej 400zł bedą dostarczane za darmo.</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}