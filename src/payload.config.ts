// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { COOKIE_PREFIX } from "./modules/constants";
import { Products } from "./collections/Products";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Products],
  cookiePrefix: COOKIE_PREFIX,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
    declare: false,
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        "postgresql://postgres:Meet4654$@db.eptxrkjxkrffgsnewulu.supabase.co:5432/postgres",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            const baseUrl = process.env.R2_PUBLIC_URL || "";
            return `${baseUrl}/${filename}`;
          },
        },
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        forcePathStyle: true,
      },
    }),
  ],
});
