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
import { AddProductSchema } from "@/schemas";
import { addProduct } from "@/actions/add-product";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useTransition, useState } from "react";

const AddProductForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
  });

  const fileRef = form.register("file");
  const imageRef = form.register("image");

  const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
    console.log(values);

    startTransition(() => {
      const validatedFields = AddProductSchema.safeParse(values);

      if (!validatedFields.success) {
        setError("Invalid Fields");
        return;
      }

      const formData = new FormData();

      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("priceInCents", String(values.priceInCents));
      // Append files
      Array.from(values.file).forEach((file, index) => {
        formData.append(`file${index}`, file as File);
      });

      Array.from(values.image).forEach((image, index) => {
        formData.append(`image${index}`, image as File);
      });

      addProduct(formData).then((data) => console.log(data));
    });
  };

  return (
    <Card className="max-w-screen-sm mx-auto">
      <CardHeader>
        <CardTitle>Add Products Cyrus</CardTitle>

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
                      <Input placeholder="0.00" type="number" {...field} />
                    </FormControl>
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
                      <Input type="file" {...fileRef} />
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
                      <Input type="file" {...imageRef} />
                    </FormControl>
                    <FormMessage />
                    <FormError message="" />
                    <FormSuccess message=""></FormSuccess>
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

export default AddProductForm;
