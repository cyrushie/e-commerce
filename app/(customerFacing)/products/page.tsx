import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import ProductCardSkeleton from "../_components/product-card-skeleton"
import ProductsCard from "../_components/products-card"
import { Product } from "@prisma/client"
import { db } from "@/lib/db"
import { wait } from "@/lib/utils"
import { cache } from "@/lib/cache"

const getProducts = cache(async () => {
    await wait(8000)
    return db.product.findMany({
        where: {
            isAvailableForPurchase: true
        },
        orderBy: {
            name: "asc"
        }
    })
}, ['/products', 'getProducts'])

const ProductsPage = () => {
    return (
        <div className="max-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
            <Suspense fallback={
                <>
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                </>
            }>
                {<SuspenseProduct />}
            </Suspense>
        </div>
    )
}


async function SuspenseProduct() {
    const products = await getProducts()

    return products.map((product: Product) => {
        return <ProductsCard key={product.id} {...product} />
    })
}

export default ProductsPage