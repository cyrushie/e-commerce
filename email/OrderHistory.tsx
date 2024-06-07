import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from '@react-email/components'
import OrderInformationEmail from './components/OrderInformation'
import React from 'react'

interface OrderHistoryEmailProps {
    orders: {
        id: string,
        createdAt: Date,
        priceInCents: number,
        downloadVerificationId: string,
        product: {
            name: string,
            imagePath: string
            description: string
        },
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            priceInCents: 1000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: 'Product 1',
                imagePath: '/products/58b483d3-bcd6-4b10-b99f-5c563c2eb2fe-download (3).jpg',
                description: 'some description'
            },
        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            priceInCents: 1000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: 'Product 2',
                imagePath: '/products/758bb88b-857b-4afc-857d-e7e39998dcbd-download (5).jpg',
                description: 'some description'
            },
        },
    ]
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return <Html>
        <Preview>Order History and Downloads</Preview>
        <Tailwind>
            <Head />
            <Body className='font-sans bg-white max-w-lg mx-auto w-[85%]'>
                <Container>
                    <Heading>Order History</Heading>
                    {
                        orders.map((order, index) =>
                            <React.Fragment key={index}>
                                <OrderInformationEmail product={order.product} order={order} downloadVerificationId={order.downloadVerificationId} />
                                {index < orders.length - 1 && <Hr />}
                            </React.Fragment>

                        )
                    }
                </Container>
            </Body>
        </Tailwind>
    </Html>
}
