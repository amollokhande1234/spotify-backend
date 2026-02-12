const { ImageKit } = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRV_KEY
});


async function uploadFile(file) {
    const result = await client.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "spotify/music"
    });

    return result;
}

module.exports = uploadFile;