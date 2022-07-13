import { StorageConfig } from "@keystone-6/core/dist/declarations/src/types/config";
import { S3_STORAGE_KEY_ID, S3_STORAGE_KEY_SECRET } from "./index";

const storage_image_avatars: StorageConfig = {
  kind: "s3",
  type: "image",
  bucketName: "sitejuststudy",
  accessKeyId: S3_STORAGE_KEY_ID,
  secretAccessKey: S3_STORAGE_KEY_SECRET,
  region: "ru-central1",
  pathPrefix: "user-avatar-",
  endpoint: "https://storage.yandexcloud.net",
};

const storage_product_image: StorageConfig = {
  kind: "s3",
  type: "image",
  bucketName: "sitejuststudy",
  accessKeyId: S3_STORAGE_KEY_ID,
  secretAccessKey: S3_STORAGE_KEY_SECRET,
  region: "ru-central1",
  pathPrefix: "product-image-",
  endpoint: "https://storage.yandexcloud.net",
};

const storage_blog_image: StorageConfig = {
  kind: "s3",
  type: "image",
  bucketName: "sitejuststudy",
  accessKeyId: S3_STORAGE_KEY_ID,
  secretAccessKey: S3_STORAGE_KEY_SECRET,
  region: "ru-central1",
  pathPrefix: "blog-cover-",
  endpoint: "https://storage.yandexcloud.net",
};

export const storage: Record<string, StorageConfig> = {
  storage_image_avatars,
  storage_product_image,
  storage_blog_image,
};
