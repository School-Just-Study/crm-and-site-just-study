import { StorageConfig } from '@keystone-6/core/dist/declarations/src/types/config';
import { SERVICE_KEY_ID, SERVICE_KEY_SECRET } from './index';

const storage_image_avatars: StorageConfig = {
    kind: 's3',
    type: 'image',
    bucketName: 'sitejuststudy',
    accessKeyId: SERVICE_KEY_ID,
    secretAccessKey: SERVICE_KEY_SECRET,
    region: 'ru-central1',
    pathPrefix: 'user-avatar-',
    endpoint: 'https://storage.yandexcloud.net'
};

const storage_product_image: StorageConfig = {
    kind: 's3',
    type: 'image',
    bucketName: 'sitejuststudy',
    accessKeyId: SERVICE_KEY_ID,
    secretAccessKey: SERVICE_KEY_SECRET,
    region: 'ru-central1',
    pathPrefix: 'product-image-',
    endpoint: 'https://storage.yandexcloud.net'
};

const storage_blog_image: StorageConfig = {
    kind: 's3',
    type: 'image',
    bucketName: 'sitejuststudy',
    accessKeyId: SERVICE_KEY_ID,
    secretAccessKey: SERVICE_KEY_SECRET,
    region: 'ru-central1',
    pathPrefix: 'blog-cover-',
    endpoint: 'https://storage.yandexcloud.net'
};

const storage_marketing_image: StorageConfig = {
    kind: 's3',
    type: 'image',
    bucketName: 'sitejuststudy',
    accessKeyId: SERVICE_KEY_ID,
    secretAccessKey: SERVICE_KEY_SECRET,
    region: 'ru-central1',
    pathPrefix: 'marketing-',
    endpoint: 'https://storage.yandexcloud.net'
};

export const storage: Record<string, StorageConfig> = {
    storage_image_avatars,
    storage_product_image,
    storage_blog_image,
    storage_marketing_image
};
