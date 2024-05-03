export const STATIC_CONFIG = {
  AWS_DEFAULT_REGION: "us-west-1",
  AWS_LOCAL_PROFILE: process.env.AWS_LOCAL_PROFILE || "sik",
  IS_LOCAL_ENV: !!process.env.IS_LOCAL_ENV,
  STAGE: process.env.STAGE || "dev",
}
