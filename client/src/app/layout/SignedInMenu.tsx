import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React, { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/backetSlice";
import { Link } from "react-router-dom";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=>state.account);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Fragment>
        <Button
        color='inherit'
         onClick={handleClick}
         sx={{typography:'h6'}}
         >
            {user?.email}
        </Button>
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={handleClose}>Profil</MenuItem>
            <MenuItem component={Link} to='/orders'>Moje zakupy</MenuItem>
            <MenuItem onClick={
                ()=>{
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>Wyloguj</MenuItem>
        </Menu>
    </Fragment>
  );
 
    
}