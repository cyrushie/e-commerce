"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { StripeElements } from '@stripe/stripe-js/dist';
import Image from 'next/image';
import { useState } from 'react';
import { userOrderExists } from '../_actions/order';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

interface CheckoutFormProps {
    product: {
        id: string;
        name: string;
        priceInCents: number;
        description: string;
        imagePath: string;
    };
    clientSecret: string;
}

const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
    return (
        <div className="max-w-3xl mx-auto w-[90%] space-y-8">
            <div className="flex gap-4">
                <div className="aspect-video flex-shrink-0 relative w-1/3 overflow-hidden rounded-md">
                    <Image fill src={product.imagePath} alt={product.name} />
                </div>
                <div className="">
                    <p className="text-muted-foreground">{formatCurrency(product.priceInCents)}</p>
                    <h2 className="text-xl font-bold capitalize">
                        {product.name}
                    </h2>
                    <p className="text-muted-foreground line-clamp-3">{product.description}</p>
                </div>
            </div>
            <Elements options={{
                clientSecret, appearance: {
                    theme: 'stripe',
                }
            }} stripe={stripePromise}>
                <Form priceInCents={product.priceInCents} productId={product.id} />
            </Elements>
        </div>
    )
}

function Form({ priceInCents, productId }: { priceInCents: number, productId: string }) {
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>('')
    const [email, setEmail] = useState<string>()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements || !email) return
        setLoading(true)


        const orderExists = await userOrderExists(email, productId)
        console.log(orderExists)
        if (orderExists) {
            setErrorMessage('You have already purchased this product. Try downloading it from th My Orders page')
            setLoading(false)
            return
        }

        stripe?.confirmPayment({ elements, confirmParams: { return_url: `${process.env.NEXT_PUBLIC_SERVER_URL as string}/stripe/purchase-success` } }).then(({ error }) => {
            if (error.type === "card_error" || error.type === 'validation_error') {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('An unknown error has occured')
            }
        }).finally(() => setLoading(false))
    }

    return <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>Checkout</CardTitle>
                {errorMessage && <CardDescription className='text-destructive'>
                    {errorMessage}
                </CardDescription>}
            </CardHeader>
            <CardContent>
                <PaymentElement />
                <div className="mt-4">
                    <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
                </div>
            </CardContent>
            <CardFooter>
                <Button type='submit' size="lg" disabled={stripe == null || elements == null || isLoading} className='w-full' >
                    {isLoading ? 'Purchasing... ' : 'Purchase '}- {formatCurrency(priceInCents / 100)}

                </Button>
            </CardFooter>
        </Card>
    </form>
}

export default CheckoutForm