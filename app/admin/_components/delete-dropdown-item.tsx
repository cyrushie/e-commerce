'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React, { useTransition } from 'react'
import { deleteProduct } from '../_actions/products'
import { useRouter } from 'next/navigation'

const DeleteDropdownItem = ({ id, disabled }: { id: string, disabled: boolean }) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <DropdownMenuItem disabled={disabled || isPending} onClick={
            () => {
                startTransition(async () => {
                    await deleteProduct(id)
                    router.refresh()
                })
            }

        }
            className='text-destructive focus:bg-destructive focus:text-destructive-foreground'>
            Delete
        </DropdownMenuItem>
    )
}

export default DeleteDropdownItem