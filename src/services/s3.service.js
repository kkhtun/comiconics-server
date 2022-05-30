const AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-1",
});
const s3 = new AWS.S3();
const s3Bucket = "comiconics-dev";
const s3BucketPrefix = "s3://comiconics-dev/"; // to remove prefix in url if present, cause listObjects() do not need bucket prefixes

const R = require("ramda");

module.exports = ({}) => ({
    listImageUrls: async ({ imagesFolderUrl }) => {
        const extractBucketPrefix = (url) =>
            imagesFolderUrl.startsWith(s3BucketPrefix)
                ? url.slice(s3BucketPrefix.length)
                : url;
        const trimForPrefix = (url) => {
            if (url.startsWith("/")) {
                url = url.slice(1, url.length);
            }
            if (!url.endsWith("/")) url += "/";
            return url;
        };
        const pathPrefix = R.compose(
            trimForPrefix,
            extractBucketPrefix
        )(imagesFolderUrl);

        const objList = await s3
            .listObjectsV2({
                Bucket: s3Bucket,
                Delimiter: "/",
                Prefix: pathPrefix,
            })
            .promise();

        const urls = R.map(
            R.compose(
                R.concat(process.env.AWS_BUCKET_URL_PREFIX),
                R.prop("Key")
            )
        )(objList.Contents);
        return urls;
    },
});
