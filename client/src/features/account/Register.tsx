import {Typography,Container,Paper,Box,Grid,TextField,Avatar} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';





export default function Register() {

    const navigate = useNavigate();
    const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}} = useForm({mode:'all'})  

    function handleApiErrors(errors:any)
    {
        if(errors){
            errors.forEach((error:string) => {
                if(error.includes('Password')){
                    setError('password',{message:error})
                } else if (error.includes('Email')){
                    setError('email',{message:error})
                } else if (error.includes('Username')){
                    setError('username',{message:error})
                }
            });
        }
    }

  return (
    
      <Container component={Paper} maxWidth="sm" sx={{display:'flex', flexDirection:'column',alignItems:'center',p:4}}>

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Rejestracja
          </Typography>
          <Box component="form" onSubmit={handleSubmit(data=>agent.Account.register(data)
                .then(()=>{
                    toast.success('Rejstracja powiodła się! - Możesz się teraz zalogować !');
                    navigate('/login');
                })
                .catch(error=>handleApiErrors(error)))} noValidate sx={{ mt: 1 }}>
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
              label="Email"
              {...register('email',
              { required:'Wymagany email',
                pattern:
                {
                    value: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/,
                    message: 'Niepoprawny format adresu email!'
                }
              })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Hasło"
              type="password"
              {...register('password',
              {required:'Wymagane hasło',
              pattern:
                {
                    value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: 'Hasło powinno zawierać duże i małe litery oraz cyfry!'
                }
              })}
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
              Zarejstruj
            </LoadingButton>
            <Grid container>
              
              <Grid item>
                <Link to='/login'>
                  {"Masz już konto? Zaloguj się !"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        
        
      </Container>
    
  );
}
