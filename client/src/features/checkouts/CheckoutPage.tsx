import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "../AddressForm/AddressForm";
import Review from "../Review/Review";
import PaymentForm from "../PaymentForm/PaymentForm";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { validationSchema } from "./checkoutValidation";
import {yupResolver} from '@hookform/resolvers/yup'
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { clearBasket } from "../basket/backetSlice";
import { LoadingButton } from "@mui/lab";
import { StripeElementType } from "@stripe/stripe-js";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";


const steps = ['Adres dostawy', 'Podsumowanie zakupów', 'Szczegóły płatności'];



export default function CheckoutPage() {

    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [cardState, setCardState] = useState<{elementError: {[key in StripeElementType]?:string}}>({elementError:{}})
    const [cardComplete,setCardComplete] = useState<any>({cardNumber:false,cardExpiry:false,cardCvv:false})
    const [paymentMessage,setPaymentMessage] = useState('')
    const [paymentSucceeded,setPaymentSucceeded] = useState(false)
    const {basket} = useAppSelector(state=>state.basket);
    const stripe = useStripe();
    const elements= useElements();

function onCardInputChange(event:any){
  setCardState({
    ...cardState,
    elementError:{
      [event.elementType]:event.error?.message
    }
  })
  setCardComplete({...cardComplete, [event.elementType]:event.complete});
}

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm/>;
        case 1:
            return <Review/>;
        case 2:
            return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange}/>;
        default:
            throw new Error('Błąd 404!');
    }
}



    const currentValidationSchema = validationSchema[activeStep];

    const methods = useForm({
        mode:'all',
        resolver:yupResolver(currentValidationSchema)
    });

    useEffect(()=>{
        agent.Account.fetchAddress()
            .then(response => {
                if(response){
                    methods.reset({...methods.getValues(), ...response, saveAddress:false})
                }
            })
    },[methods])

    async function submitOrder(data:FieldValues) {
        setLoading(true)
        const {nameOnCard, saveAddress, ...shippingAddress} = data;
        if(!stripe || !elements) return; //stripe is not ready
        try{
            const cardElement = elements.getElement(CardNumberElement);
            const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret as string,{
                payment_method:{
                    card:cardElement!,
                    billing_details:{
                        name:nameOnCard
                    }
                }
            });
            console.log(paymentResult);
            if(paymentResult.paymentIntent?.status ==='succeeded'){
                const orderNumber = await agent.Orders.create({saveAddress,shippingAddress});
                setOrderNumber(orderNumber);
                setPaymentSucceeded(true);
                setPaymentMessage('Dziękujemy - otrzymaliśmy twoją zapłatę.')
                setActiveStep(activeStep+1);
                dispatch(clearBasket());
                setLoading(false);
            } else {
                setPaymentMessage(paymentResult.error?.message as string)
                setPaymentSucceeded(false);
                setLoading(false);
                setActiveStep(activeStep+1);
            }
        } catch(error){
            console.log(error)
        }
    }

    const handleNext =  async (data:FieldValues) => {
       
        
        if(activeStep === steps.length-1){
            await submitOrder(data)
           
        } else{
            setActiveStep(activeStep+1)
        }
        
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function submitDisabled():boolean{
        if (activeStep===steps.length-1)
        {
            return !cardComplete.cardCvc || !cardComplete.cardExpiry || !cardComplete.cardNumber || !methods.formState.isValid
        } else{
            return !methods.formState.isValid
        }
    }

    return (
        <FormProvider {...methods}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
            <Typography component="h1" variant="h4" align="center">
                Podsumowanie
            </Typography>
            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            {paymentMessage}
                        </Typography>
                        {paymentSucceeded ? (
                        <Typography variant="subtitle1">
                            Numer zamówienia to #{orderNumber}. Nie wyślemy e-mail'a 
                            z potwierdzeniem zamówienia ponieważ ten sklep jest w fazie testów. Jeżli zostanie uruchomiony prześlemy Ci maila z tą wiadomością. Twoja karta nie zostanie obciążona żadną płatnością!
                        </Typography>):(
                            <Button variant="contained" onClick={handleBack}>Wróć i spróbuj ponownie</Button>
                        )}
                    </>
                ) : (
                    <form onSubmit={methods.handleSubmit(handleNext)}>
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                    Wróć
                                </Button>
                            )}
                            <LoadingButton
                                loading={loading}
                                disabled = {submitDisabled()}
                                variant="contained"
                                type='submit'
                                sx={{mt: 3, ml: 1}}
                            >
                                {activeStep === steps.length - 1 ? 'Złóż zamówienie' : 'Dalej'}
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </>
            </Paper>
        </FormProvider>
        
        
    );
}