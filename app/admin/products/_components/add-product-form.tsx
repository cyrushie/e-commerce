"use client";

import * as z from "zod";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "@/schemas";

const AddProductForm = () => {
    const form = useForm<z.infer<typeof AddProductSchema>>({
        resolver: zodResolver(AddProductSchema)
    });

    const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
        // add server actions
    };

    return (
        <Card className="max-w-screen-sm">
            <CardHeader>
                <CardTitle>Add Products</CardTitle>
                <CardDescription>
                    Fill up the form to add new product
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="product name"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priceInCents"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price in Cents</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0.00"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                                                                <FormMessage
                                                                                />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="product
                                            description"
                                                {...field}
                                            />
                                        </FormControl>
                                                                                <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>File </FormLabel>
                                        <FormControl>
                                            <Input type="file" {...field} />
                                        </FormControl>
                                                                                <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image </FormLabel>
                                        <FormControl>
                                            <Input type="file" {...field} />
                                        </FormControl>
                                                                                <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-center ">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AddProductForm;
