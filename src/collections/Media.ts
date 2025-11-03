import { TRPCError } from "@trpc/server";
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "folder",
      type: "select",
      options: [
        { label: "Products", value: "products" },
        { label: "Users", value: "users" },
      ],
      required: true,
      defaultValue: "products",
      admin: { position: "sidebar" },
    },
    {
      name: "prefix",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [({ siblingData }) => siblingData.folder || "products"],
      },
    },
  ],
  upload: {
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "application/pdf"],
    formatOptions: { format: "webp", options: { quality: 85 } },
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        formatOptions: { format: "webp", options: { quality: 80 } },
      },
      {
        name: "card",
        width: 800,
        height: 600,
        formatOptions: { format: "webp", options: { quality: 85 } },
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        formatOptions: { format: "webp", options: { quality: 85 } },
      },
    ],
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          const timestamp = Date.now();
          const originalName = req.file.name;
          const fileSize = req.file.size;

          const extension = originalName.split(".").pop();
          const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");

          req.file.name = `${timestamp}_${nameWithoutExt}_${fileSize}.${extension}`;
        }
      },
    ],
    beforeValidate: [
      ({ data, req }) => {
        if (req.file && req.file.size > 3 * 1024 * 1024) {
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "FILE SIZE IS TOO LARGE",
          });
        }
      },
    ],
  },
};
