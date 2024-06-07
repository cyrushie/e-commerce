import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ExpiredPage = () => {
    return (
        <div className="max-container">
            <div className="text-4xl mb-6 ">Download Verification Token has Expired</div>
            <p className="text-lg mb-4">Go to My Orders page to create a new one</p>
            <Button asChild>
                <Link href='/orders'>
                    My Orders
                </Link>
            </Button>
        </div>
    )
}

export default ExpiredPage