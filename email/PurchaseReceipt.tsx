import { Body, Container, Head, Heading, Html, Preview, Tailwind } from '@react-email/components'
import OrderInformationEmail from './components/OrderInformation'

interface PurchaseReceiptEmailProps {
    product: {
        name: string,
        imagePath: string
        description: string
    },
    order: {
        id: string,
        createdAt: Date,
        priceInCents: number,
    },
    downloadVerificationId: string,
}

PurchaseReceiptEmail.PreviewProps = {
    product: {
        name: 'Purchase Receipt',
        imagePath: '/products/58b483d3-bcd6-4b10-b99f-5c563c2eb2fe-download (3).jpg',
        description: 'some description'
    },
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        priceInCents: 1000,
    },
    downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps
export default function PurchaseReceiptEmail({ product, order, downloadVerificationId }: PurchaseReceiptEmailProps) {
    return <Html>
        <Preview>Download {product.name} and view receipt</Preview>
        <Tailwind>
            <Head />
            <Body className='font-sans bg-white max-w-lg mx-auto w-[85%]'>
                <Container>
                    <Heading>Purchase Receipt</Heading>
                    <OrderInformationEmail product={product} order={order} downloadVerificationId={downloadVerificationId} />
                </Container>
            </Body>
        </Tailwind>
    </Html>
}
