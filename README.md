# Iporaitech's web site

This is the static website for iporaitech.com.

It's built with Webpack and styled with TailwindCSS. See webpack.\* files for bundling info.

## Scripts

Start development server with `yarn dev [--watch]`

Build for production with `yarn build:prod`

## Deploy

1. Delete all files from www.iporaitech.com S3 bucket
2. `yarn build:prod` and copy newly generated production files from **dist** to the S3 bucket
3. Invalidate cache in CloudFront using
   ```
   /\*
   /en/\*
   ```
