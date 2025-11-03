import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password Should be Minimum 8 Characters"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username should be minimum 3 characters")
    .max(70, "Username should be maximum 70 characters")
    .regex(
      /^[a-z0-9][a-z0-9.-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers, hyphens, and dots"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username can't have two consecutive hyphens"
    )
    .refine(
      (val) => !val.includes(".."),
      "Username can't have two consecutive dots"
    )
    .refine(
      (val) => !/[.-]{2,}/.test(val),
      "Username can't have consecutive special characters"
    ),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password Should be Minimum 8 Characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
