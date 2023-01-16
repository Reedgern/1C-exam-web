const { uploadModel } = require('../../models/upload');
const { v4: uuidv4 } = require('uuid');

const uploadImageController = async (req, res) => {
    try {
        const { blob, dataUrl } = req.body;
        const id = uuidv4();

        console.info(req.file);

        await uploadModel.get('images').unshift({blob, id, dataUrl}).write();

        res.status(200).json({
            data: {
                id,
            },
        });

    }
    catch(error) {
        res.status(200).json({
            error: true,
            errorText: `uploadImageController error: ${error?.message}`
        })
    }
};

const getImageController = async (req, res) => {
    try {
        const { id } = req.query;

        const image = await uploadModel.get('images').find({ id });

        if (!image.value()) {
            throw new Error('Image not found.');
        }

        res.status(200).json({
            data: {
                blob: image.blob,
                dataUrl: image.dataUrl,
            }
        });
    }
    
    catch(error) {
        res.status(200).json({
            error: true,
            errorText: `getImageController error: ${error?.message}`
        });
    }
}

module.exports = {
    uploadImageController, getImageController
}