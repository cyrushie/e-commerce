"use client";

import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema, EditProductSchema } from "@/schemas";
import { addProduct } from "@/actions/add-product";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useTransition, useState } from "react";
import { Product } from "@prisma/client";
import { editProduct } from "@/actions/edit-products";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const ProductForm = ({ product }: { product?: Product | null }) => {

  const [isPending, startTransition] = useTransition();
  const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const ProductFormSchema = product ? EditProductSchema : AddProductSchema

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    values: {
      name: product ? product.name : undefined as unknown as string,
      priceInCents: product ? product.priceInCents : undefined as unknown as number,
      description: product ? product.description : '',
      file: '' as unknown as FileList,
      image: '' as unknown as FileList
    }
  });

  const fileRef = form.register("file");
  const imageRef = form.register("image");

  const onSubmit = (values: z.infer<typeof ProductFormSchema>) => {

    startTransition(() => {
      const validatedFields = ProductFormSchema.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid Fields");
        return;
      }

      const formData = new FormData();

      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("priceInCents", String(values.priceInCents));
      if (product) {
        formData.append("id", product.id);
      }

      // Append files
      if (values.file) {
        Array.from(values.file).forEach((file, index) => {
          formData.append(`file${index}`, file as File);
        });
      }
      if (values.image) {
        Array.from(values.image).forEach((image, index) => {
          formData.append(`image${index}`, image as File);
        });
      }

      if (product) {
        editProduct(formData).then((data) => console.log(data));
      } else {
        addProduct(formData).then((data) => console.log(data));
      }

    });
  };

  return (
    <Card className="max-w-screen-sm mx-auto">
      <CardHeader>
        <CardTitle>Add Products</CardTitle>

        <CardDescription>Fill up the form to add new product</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            encType="multipart/form-data"
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
                      {/* <Input placeholder="0.00" type="number" {...priceInCentsRef} onChange={(e) => setPriceInCents(e.target.valueAsNumber)}
                        value={product !== null ? priceInCents : ''}
                      /> */}
                      <Input placeholder="0.00" type="number" {...field}
                      />
                    </FormControl>
                    <div className="text-sm">{formatCurrency((field.value
                      || 0) / 100)}</div>
                    <FormMessage />
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
                        placeholder="product description"
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
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                    <div className="">{product && product.filePath}</div>
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
                      <Input type="file" {...imageRef} />
                    </FormControl>
                    <FormMessage />
                    <div className="">
                      {
                        product ?
                          <Image src={product ? product.imagePath : ''} alt="product image" height={250} width={300} className="rounded-lg" /> : ''
                      }
                    </div>
                    <FormError message={error} />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center ">
              <Button disabled={isPending} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
