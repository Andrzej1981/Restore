import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/backetSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe('pk_test_51Q8oDaFaMZ3qp9mH2Do6pug98dwRVnuSCDIxvZyC73fZxlZf7x6rhgRxF1ND769llx2Anx1HHeFvpiqscM8MOVjx00eO81Sun3')

export default function CheckoutWrapper(){
    const dispatch = useAppDispatch()
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        agent.Payments.createpaymentIntent()
            .then(basket=>dispatch(setBasket(basket)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    },[dispatch]);

    if(loading) return <LoadingComponent message="Czekaj..."></LoadingComponent>

    return(
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}