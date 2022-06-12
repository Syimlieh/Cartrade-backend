const aws = require("aws-sdk");
const fs = require("fs");
const s3bucket = new aws.clients.s3({
    region: process.env.s3_REGION,
    accessKeyId: process.env.s3_ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    Bucket: process.env.bucket
})

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: process.env.bucket,
        body: fileStream,
        key: file.filename
    }
    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// module.exports = s3bucket;