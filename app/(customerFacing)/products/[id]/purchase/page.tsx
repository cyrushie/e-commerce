import CheckoutForm from '@/app/(customerFacing)/_components/checkout-form'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const PurchasePage = async ({ params: { id } }: { params: { id: string } }) => {
    const product = await db.product.findUnique({
        where: {
            id
        }
    })

    if (!product) return notFound()

    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.priceInCents,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            productId: product.id
        }
    })

    if (!paymentIntent.client_secret) {
        throw Error('Stripe failed to create payment intent')
    }

    return (
        <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
    )
}

export default PurchasePage