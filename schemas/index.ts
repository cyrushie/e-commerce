import * as z from "zod";

const fileSchema = z
  .custom<FileList>()
  .refine((files) => files[0]?.size > 0, { message: "A File is Required" });
const imageSchema = fileSchema.refine(
  (files) => files[0]?.type.startsWith("image/"),
  (val) => ({
    message: `${val[0]?.name} is not an image`,
  })
);

const optionalFileSchema = z.custom<FileList>();
const optionalImageSchema = optionalFileSchema.refine(
  (files) => files[0] === undefined || files[0]?.type.startsWith("image/"),
  (val) => ({
    message: `${val[0]?.name} is not an image`,
  })
);

export const AddProductSchema = z.object({
  name: z.string().min(1, { message: "name must be at least 1 character" }),
  priceInCents: z.coerce.number().gt(0),
  description: z
    .string()
    .min(5, { message: "description must be at least 5 letters long" }),
  file: fileSchema,
  image: imageSchema,
});

export const EditProductSchema = AddProductSchema.extend({
  file: optionalFileSchema,
  image: optionalImageSchema,
});
