import * as z from "zod";

export const AddProductSchema = z.object({
    name: z.string(),
    priceInCents: z.coerce.number().gt(0),
    description: z.string(),
    file: z.any().refine(files => files.length > 0, "A File is required"),
    image: z.any().refine(files => files.length > 0, "A File is required"),
    
});
