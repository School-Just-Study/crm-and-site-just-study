export const FRONTEND_URL = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_FRONTEND_URL;
export const BACKEND_URL_GRAPHQL = `${FRONTEND_URL}/api/graphql`;
export const DISABLED_BUILD_STATIC_PATHS = process.env.DISABLE_BUILD_STATIC_PATHS === 'true';
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
