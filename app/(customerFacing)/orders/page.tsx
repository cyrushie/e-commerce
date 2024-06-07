'use client'

import { ordersHistory } from '@/actions/orders'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const OrdersPage = () => {
    const [data, action] = useFormState(ordersHistory, {})

    return (
        <form action={action} className='w-[90%] mx-auto max-w-xl'>
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>Enter your email and we will send you your purchase history and download links</CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' name='email' type='email'></Input>
                    {data.error && <div className='text-destructive'>{data.error}</div>}
                </CardContent>
                <CardFooter>
                    {
                        data.message ? <p className="text-emerald-500">{data.message}</p> :
                            <SubmitButton />
                    }
                </CardFooter>
            </Card>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return <Button disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
    </Button>
}

export default OrdersPage