import { ShoppingCart } from "@mui/icons-material";
import { AppBar, ListItem, Switch, Toolbar, List, Typography, IconButton, Badge, Box } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
    {title:'Katalog', path:'/catalog'},
    {title:'O nas', path:'/about'},
    {title:'Kontakt', path:'/contact'},
]

const rightLinks = [
    {title:'logowanie', path:'/login'},
    {title:'rejstracja', path:'/register'},

]

const navStyles = {
    color:'inherit',
    typography:'h6',
    '&:hover':{color:'grey.500'},
    '&.active':{color:'text.secondary'},
    textDecoration:'none'  
    }

interface Props{
    darkMode : boolean;
    handleThemeChange: ()=>void;
}

export default function Header({darkMode,handleThemeChange}:Props){
    const {user} = useAppSelector(state => state.account)
    const {basket} = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum,item)=> sum +item.quantity,0)

    return(
        <AppBar position="static" sx={{mb:4}}>
                <Toolbar sx={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>

                    <Box display='flex' alignItems='center'>
                    <Typography variant="h6" component={NavLink} to='/' sx={navStyles}>ReStore</Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                    </Box>

                    
                    <List sx={{display:'flex'}}>
                        {midLinks.map(({title,path}) => (
                            <ListItem 
                            component = {NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                             >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}

                        {user && user.roles?.includes('Admin') && 
                         <ListItem 
                            component = {NavLink}
                            to={'/inventory'}
                            sx={navStyles}
                             >
                                MAGAZYN
                            </ListItem>}
                    </List>

                    <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color="inherit" sx={{mr:2}}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                    {user ? (
                        <SignedInMenu/>
                    ) : (<List sx={{display:'flex'}}>
                        {rightLinks.map(({title,path}) => (
                        <ListItem 
                        component = {NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                         >
                            {title.toUpperCase()}
                        </ListItem>
                    
                     
                    ))}
                        </List>)}
                    </Box>

                </Toolbar>
        </AppBar>
    )
}