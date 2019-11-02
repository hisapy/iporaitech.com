# Iporaitech's web site

This is the static website for iporaitech.com.

It's built with Webpack. It doesn't not rely on any Javascript framework _yet_.

See webpack.\* files for bundling info.

## Scripts

Start development server with `yarn dev [--watch]`

Build for production with `yarn build:prod`

## Deploy

1. In the generated index.html, add "/" before favicon.ico and possibly other icons. This is needed because we have 2 index.html and the webpack plugin doesn't add "/" when generating the prod build.
2. Copy files to iporaitech.com bucket in S3 (previously deleting all files)
3. Invalidate cache in CloudFront using /\* and possibly /en/\*
