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
import Spinner from '@/components/shared/spinner';

interface StripePaymentFormProps {
  amount: number;
  product: string;
  paymentIntentUrl: string;
  mode?: "subscription" | "payment";
}

export default function StripePaymentForm(props: StripePaymentFormProps) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const options: StripeElementsOptions = {
    mode: props.mode,
    amount: props.amount * 100,
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
      <StripePaymentForm.Form
        paymentIntentUrl={props.paymentIntentUrl}
        product={{
          name: props.product,
          price: props.amount * 100,
        }}
      />
    </Elements>
  )
}

StripePaymentForm.Form = ({ paymentIntentUrl, product }: { paymentIntentUrl: string; product: {
  price: number;
  name: string;
} }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    setErrorMessage(null);
    setLoading(true);
    
    const {error: submitError} = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError?.message || null);
      return;
    }
    
    const { data: { secret } } = await axios(paymentIntentUrl, {
      method: 'POST',
      data: product
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
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button className='mt-5 w-full' type="submit" disabled={!stripe || !elements || loading}>
        {loading ? <Spinner /> : "Pay"}
      </Button>
      {/* Show error message to your customers */}
      {errorMessage && <div className='mt-5 text-sm text-red-500 font-semibold'>{errorMessage}</div>}
    </form>
  )
}