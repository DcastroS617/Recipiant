const cloudinary = require('cloudinary')
const fs = require('fs')

const UploadImage = async (req, res, next) => {
    console.log(req.files.files)
    if (req.files) {
        const {
            files
        } = req
        console.log(files.files.tempFilePath)
        if (files.files.tempFilePath) {
            const imagen = await cloudinary.uploader.upload(files.files.tempFilePath, {
                use_filename: true,
                folder: 'file-upload'
            })
            req.body.image = imagen.secure_url
            fs.unlinkSync(files.files.tempFilePath)
        }
    }
    next()
}

module.exports = UploadImage
