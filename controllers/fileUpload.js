const File = require('../models/file');

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
            
            // Save to database
            const fileData = await File.create({
                name: sampleFile.name,
                path: uploadPath,
                size: sampleFile.size
            });

            return res.status(200).json({
                success: true,
                message: 'File uploaded successfully',
                file: fileData
            });

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

module.exports = {
    localFileUpload,
}




        


        
    