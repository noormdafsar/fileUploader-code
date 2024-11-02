const File = require('../models/file');
const cloudinary = require('cloudinary').v2;

const localFileUpload = async (req, res) => {
    try {
        // Check if file exists
        const sampleFile = req.files.sampleFile;
        const uploadPath = __dirname + '/uploads/' + sampleFile.name;

        if(!sampleFile || Object.keys(sampleFile).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No file were uploaded',
            });
        }

            //    await sampleFile.mv(uploadPath, async (err) => {
            //         if(err) {
            //             console.log('Error while uploading file to the server', err);
            //             return res.status(500).json({
            //                 success: false,
            //                 message: 'Error while uploading file to the server',
            //             });
            //         }
            //         console.log(sampleFile);
            //         res.send('File uploaded to: ' + uploadPath);
            //     })

        try {
            // Move file to upload directory
            await sampleFile.mv(uploadPath);

        } catch(moveError) {
            return res.status(500).json({
                success: false,
                message: 'Error while moving file to server',
                error: moveError.message
            });
        }

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error in file upload process',
            error: error.message
        });
    }
}

// const isFileTypesSupported = (type, supportedType) => {
//     return supportedType.includes(type);
// }

const imageUpload = async (req, res) => {
    try {

        // data fetch 
        const { name, tags, email } = req.body;
        // console.log({ name, tags, email });

        // Check if file exists(validation check)
        const sampleFile = req.files.sampleFile;
        const supportedType = ['png', 'jpeg', 'jpg', 'gif'];

        if(!sampleFile || Object.keys(sampleFile).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No file were uploaded',
            });
        }

        // Check if file type is supported
        const fileType = sampleFile.mimetype.split('/')[1];
        if(!supportedType.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported',
            });
        }

        // Upload file to cloudinary
        const uploadImage = await cloudinary.uploader.upload(sampleFile.tempFilePath, {
            folder: 'Nooruddin',
            public_id: sampleFile.name,
            resource_type: 'image',
        });
        console.log(uploadImage);

            // Save file to database
            const newFile = new File({
                name: sampleFile.name,
                imageUrl: uploadImage.secure_url,
                tags: tags,
                size: sampleFile.size,
                email: email,
            });

            await newFile.save();

            return res.status(200).json({
                success: true,
                imageUrl: uploadImage.url,
                message: 'File uploaded successfully',
                file: newFile,
            });

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error in file upload process',
            error: error.message
        });
    }
}

const videoUpload = async (req, res) => {
    try {
        // fetch data
        const { name, tags, email } = req.body;
        console.log({ name, tags, email });

        // Check if file exists(validation check)
        const sampleFile = req.files.sampleFile;
        const supportedType = ['mp4', 'mkv', 'avi', 'mov'];

        if(!sampleFile || Object.keys(sampleFile).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No file were uploaded',
            });
        }

        // Check if file size is greater than 10MB
        if(sampleFile.size > 10000000) {
            return res.status(400).json({
                success: false,
                message: 'File size should not be greater than 10MB',
            });
        }

        // Check if file type is supported
        const fileType = sampleFile.mimetype.split('/')[1];
        if(!supportedType.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported',
            });
        }

        // Upload file to cloudinary
        const uploadVideo = await cloudinary.uploader.upload(sampleFile.tempFilePath, {
            folder: 'Nooruddin',
            public_id: sampleFile.name,
            resource_type: 'video',
        });
        console.log(uploadVideo);

        // Save file to database
        const newFile = new File({
            name: sampleFile.name,
            imageUrl: uploadVideo.secure_url,
            tags: tags,
            size: sampleFile.size,
            email: email,
        });

        await newFile.save();

        return res.status(200).json({
            success: true,
            videoUrl: uploadVideo.secure_url,
            message: 'video uploaded successfully',
        })
    }

    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error in file upload process',
            error: error.message
        });
    }
}

const imageSizeReducer = async (req, res) => {
    try {
        // data fetch 
        const { name, tags, email } = req.body;
        console.log({ name, tags, email });

        const sampleFile = req.files.sampleFile;

        // check if file exists
        const supportedType = ['png', 'jpeg', 'jpg', 'gif'];
        const fileType = sampleFile.mimetype.split('/')[1];

        if(!supportedType.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: 'File type not supported',
            });
        }

        if(!sampleFile || Object.keys(sampleFile).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No file were uploaded',
            });
        }

        // Resize image
        const uploadImage = await cloudinary.uploader.upload(sampleFile.tempFilePath, {
            folder: 'Nooruddin',
            public_id: sampleFile.name,
            resource_type: 'image',
            width: 500,
            height: 500,
            crop: 'scale',
            resize: 'fill',
        });

        // Save file to database
        const newFile = new File({
            name: sampleFile.name,
            imageUrl: uploadImage.secure_url,
            tags: tags,
            size: sampleFile.size,
            email: email,
        });

        await newFile.save();

        return res.status(200).json({
            success: true,
            imageUrl: uploadImage.url,
            message: 'Image resized and uploaded successfully',
            file: newFile,
        });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: 'Error in file upload and resize photo process',
            error: error.message
        });
    }
}



module.exports = {
    localFileUpload, imageUpload, videoUpload, imageSizeReducer,
}




        


        
    