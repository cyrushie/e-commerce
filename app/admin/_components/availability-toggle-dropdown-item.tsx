'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React, { useTransition } from 'react'
import { availabilityToggle } from '../_actions/products'
import { useRouter } from 'next/navigation'

const AvailabilityToggleDropdownItem = ({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean }) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    return (
        <DropdownMenuItem disabled={isPending} onClick={() => {
            startTransition(async () => {
                await availabilityToggle(id, !isAvailableForPurchase)
                router.refresh()
            })
        }
        }>
            {isAvailableForPurchase ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem >

    )
}

export default AvailabilityToggleDropdownItem