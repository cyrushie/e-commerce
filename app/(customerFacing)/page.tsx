import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Product } from "@prisma/client";
import Link from "next/link";
import ProductsCard from "./_components/products-card";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import ProductCardSkeleton from "./_components/product-card-skeleton";
import { Suspense } from "react";
import { cache } from "@/lib/cache";

const getMostPopularProducts = cache(async () => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true
    },
    orderBy: {
      order: { _count: 'desc' }
    },
    take: 6,
  })
}, ['/', 'getMostPopularProducts'], { revalidate: 60 * 60 * 24 })

const getNewestProducts = cache(async () => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 6,
  })
}, ['/', 'getNewestProducts'])

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
export default function HomePage() {
  return <main className="space-y-12 max-container">
    <ProductsGridSection productsFetcher={getMostPopularProducts} title="Most Popular" />
    <ProductsGridSection productsFetcher={getNewestProducts} title="Newest Products" />
  </main>;
}

interface ProductsGridSectionProps {
  productsFetcher: () => Promise<Product[]>
  title: string
}

const ProductsGridSection = async ({ title, productsFetcher }: ProductsGridSectionProps) => {
  return (<div>
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold">{title}</h1>
      <Button asChild variant='outline'>
        <Link href='/products' className="gap-1" >
          View all<ArrowRightIcon className=""></ArrowRightIcon>
        </Link>
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
      <Suspense fallback={
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      }>
        {<SuspenseProduct productsFetcher={productsFetcher} />}
      </Suspense>
    </div>
  </div>)
}

async function SuspenseProduct({ productsFetcher }: {
  productsFetcher: () => Promise<Product[]>
}) {
  return (await productsFetcher()).map(product => {
    return <ProductsCard key={product.id} {...product} />
  })
}
