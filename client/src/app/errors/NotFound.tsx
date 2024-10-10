import { Container, Paper, Typography,Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound()
{
    return(
        <Container component={Paper} sx={{height:45}}>
            <Typography gutterBottom variant="h4">Błąd! - Nie znaleziono strony !</Typography>
            <Divider/>
            <Button fullWidth component={Link} to='/catalog'>Wróć do sklepu</Button> 
        </Container>
    )
}