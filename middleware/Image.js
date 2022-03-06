const cloudinary = require('cloudinary')
const fs = require('fs')

const UploadImage = async (req, res, next) => {
    const {
        files: {
            image: {
                tempFilePath
            }
        }
    } = req
    console.log(tempFilePath)
    if (tempFilePath) {
        const imagen = await cloudinary.uploader.upload(tempFilePath, {
                use_filename: true,
                folder: 'file-upload'
            })
        req.body.image = imagen.secure_url
        fs.unlinkSync(tempFilePath)
    }   
    next()
}

module.exports = UploadImage
