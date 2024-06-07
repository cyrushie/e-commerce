import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const StripePageSuccess = async ({ searchParams }: { searchParams: { payment_intent: string } }) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

    if (paymentIntent.metadata.productId == null) return notFound()
    const product = await db.product.findUnique({ where: { id: paymentIntent.metadata.productId } })

    if (!product) return notFound()

    const isSuccess = paymentIntent.status === 'succeeded'

    return (
        <div className="max-w-3xl mx-auto w-[90%] space-y-8">
            <h1 className="text-4xl">{isSuccess ? 'Success!' : 'Error!'}</h1>

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

            <Button asChild>
                {isSuccess ? <a href={`/products/download/${await createDownloadVerification(product.id)}`}>Download</a> : <Link href={`/products/${product.id}/purchase`}>Try again</Link>}
            </Button>

        </div>
    )
}

async function createDownloadVerification(productId: string) {
    return (await db.downloadVerification.create({ data: { productId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) } })).id


}

export default StripePageSuccess