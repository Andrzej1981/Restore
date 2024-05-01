import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

export default function HomePage(){
    const dispatch =useAppDispatch();
    const {data,title} = useAppSelector(state => state.counter);
    

    return(
        <>
        <Typography variant="h2">
            {title}
        </Typography>
        <Typography variant="h5">
            Data is: {data}
        </Typography>
        <ButtonGroup>
            <Button onClick={()=>dispatch(decrement(5))} variant='contained' color='secondary'>Decrement 5</Button>
            <Button onClick={()=>dispatch(decrement(1))} variant='contained' color='error'>Decrement</Button>
            <Button onClick={()=>dispatch(increment(1))} variant='contained' color='primary'>Increment</Button>
            <Button onClick={()=>dispatch(increment(5))} variant='contained' color='secondary'>Increment 5</Button>
        </ButtonGroup>
        </>
    )
    }