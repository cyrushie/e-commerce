import React from 'react'
import AddProductForm from '../../_components/product-form'
import ProductForm from '../../_components/product-form'
import { db } from '@/lib/db'

const EditProductPage = async ({ params: { id } }: { params: { id: string } }) => {
    const product = await db.product.findUnique({ where: { id } })

    return (
        <div className="max-container pb-8">
            <ProductForm product={product} />
        </div>
    )
}

export default EditProductPage