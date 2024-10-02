import {Typography,Container,Paper,Box,Grid,TextField,Avatar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../app/store/configureStore';
import { signInUser } from './accountSlice';




export default function Login() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

const {register,handleSubmit,formState:{isSubmitting,errors,isValid}} = useForm({mode:'onTouched'})  

 async function submitForm(data:FieldValues)
  {
    await dispatch(signInUser(data));
    navigate('/catalog');
    
  }

  return (
    
      <Container component={Paper} maxWidth="sm" sx={{display:'flex', flexDirection:'column',alignItems:'center',p:4}}>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zaloguj się
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Nazwa użytkownika"
              autoFocus
              {...register('username',{required:'Wymagana nazwa użytkownika'})}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Hasło"
              type="password"
              {...register('password',{required:'Wymagane hasło'})}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
            
            <LoadingButton
              loading={isSubmitting}
              disabled ={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logowanie
            </LoadingButton>
            <Grid container>
              
              <Grid item>
                <Link to='/register'>
                  {"Nie masz konta? Zarejstruj się !"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        
        
      </Container>
    
  );
}
