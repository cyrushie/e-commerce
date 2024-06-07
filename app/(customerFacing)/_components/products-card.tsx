import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    id: string,
    name: string,
    priceInCents: number,
    description: string,
    imagePath: string
}

const ProductsCard = ({ id, name, priceInCents, description, imagePath }: ProductCardProps) => {
    return (
        <Card className='flex flex-col overflow-hidden'>
            <div className="relative aspect-video">
                <Image fill src={imagePath} alt='product image' />
            </div>
            <CardHeader>
                <CardTitle>
                    {name}
                </CardTitle>
                <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
            </CardHeader>
            <CardContent className='w-full flex-grow'>
                <p className="line-clamp-4">{description}</p>
            </CardContent>
            <CardFooter>
                <Button asChild className='w-full'>
                    <Link href={`/products/${id}/purchase`}>
                        Purchase
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductsCard