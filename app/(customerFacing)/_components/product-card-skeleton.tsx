import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React from 'react'

const ProductCardSkeleton = () => {
    return (
        <Card className='flex flex-col overflow-hidden'>
            <div className="relative aspect-video">
                <Skeleton className='w-full h-full'></Skeleton>
            </div>
            <CardHeader>
                <Skeleton className='w-[80%] h-6'></Skeleton>
                <Skeleton className='w-[70%] h-4'></Skeleton>
            </CardHeader>
            <CardContent className='w-full flex-grow'>
                <Skeleton className='w-[70%] h-4'></Skeleton>
            </CardContent>
            <CardFooter>
                <Button disabled asChild>
                    <Skeleton className='w-full h-9'></Skeleton>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCardSkeleton