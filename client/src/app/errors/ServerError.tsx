import {Divider,  Container,Typography,Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError(){

const {state}=useLocation();

    return(
        <Container component={Paper}>
            {state?.error ? (
                <>
                <Typography gutterBottom variant="h3" color='secondary'>{state.error.title}</Typography>
                <Divider/>
                <Typography variant="body1">{state.error.detail || 'Wewnętrzny błąd serwera!'}</Typography>
                </>
            ):(<Typography gutterBottom variant="h5">Błąd serwera !</Typography>)}
            
        </Container>
    )
}