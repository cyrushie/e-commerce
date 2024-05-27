import * as z from "zod";

const fileSchema = z
  .custom<FileList>()
  .refine((files) => files[0]?.size > 0, { message: "A File is Required" });

export const AddProductSchema = z.object({
  name: z.string(),
  priceInCents: z.coerce.number().gt(0),
  description: z.string(),
  file: fileSchema,
  image: fileSchema.refine(
    (files) => files[0]?.type.startsWith("image/"),
    (val) => ({
      message: `${val[0]?.name} is not an image`,
    })
  ),
});
