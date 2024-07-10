import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from "react";
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function StripePaymentForm() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const options: StripeElementsOptions = {
    mode: 'payment' as const,
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      labels: "floating",
      theme: "stripe",
      disableAnimations: true
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm.Form />
    </Elements>
  )
}

StripePaymentForm.Form = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const {error: submitError} = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError?.message || null);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    // TODO:
    const { data: { secret } } = await axios('/create-intent', {
      method: 'POST',
    });

    const {error} = await stripe?.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret: secret,
      confirmParams: {
        return_url: window.location.href,
      },
    }) || {};

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error?.message || null);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button className='mt-5 w-full' type="submit" disabled={!stripe || !elements}>
        Pay
      </Button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}