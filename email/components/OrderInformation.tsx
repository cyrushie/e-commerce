import { formatCurrency } from "@/lib/utils"
import { Button, Column, Img, Row, Section, Text } from "@react-email/components"

interface OrderInformationEmailProps {
    order: {
        id: string,
        createdAt: Date,
        priceInCents: number,
    },
    product: { imagePath: string, name: string, description: string },
    downloadVerificationId: string
}

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export default function OrderInformationEmail({ order, product, downloadVerificationId }: OrderInformationEmailProps) {
    return <>
        <Section>
            <Row>
                <Column>
                    <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4 ">Order Id</Text>
                    <Text>{order.id}</Text>
                </Column>
                <Column>
                    <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4 ">Purchase On</Text>
                    <Text>{dateFormatter.format(order.createdAt)}</Text>
                </Column>
                <Column>
                    <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4 ">Price</Text>
                    <Text>{formatCurrency(order.priceInCents / 100)}</Text>
                </Column>
            </Row>
        </Section>
        <Section className="border border-gray-500 rounded-lg my-4 border-solid p-4 md:p-6">
            <Img
                width="100%"
                alt={product.name}
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
            />

            <Row className="mt-8">
                <Column className="align-bottom">
                    <Text className="font-bold mt-0 mr-4 text-lg">{product.name}</Text>
                </Column>
                <Column align="right">
                    <Button href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`} className="px-8 py-4 bg-black rounded-lg text-white">
                        Downlaod
                    </Button>
                </Column>
            </Row>
            <Row>
                <Column>
                    <Text className="text-gray-500 mb-0">{product.description}</Text>
                </Column>
            </Row>
        </Section>
    </>
}