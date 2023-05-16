const fs = require('fs') 
const path = require('path');
const axios = require('axios');
const { parse } = require('csv-parse');

const getFiles = async (fileNameParameter = undefined) => {
    let files = []; 

    await axios.get(`${process.env.API_FILES}secret/files`,{
        headers: {
            'Authorization': `${process.env.API_KEY}`
        }
    })
    .then((res) => {

        ({files} = res.data);
        console.log(files);
    })
    .catch((error) => {
        console.error(error)
    })

    if(!fileName)
        if(files.length) {
            files.forEach(async(fileName) => {
                await getFile(fileName);
            })
        }
    else
        await getFile(fileNameParameter);

    return processFiles();
}

const getFile = async(fileName) => {

    try {
        const pathFile = path.resolve(__dirname, 'files', fileName)

        const res = await axios.get(`${process.env.API_FILES}secret/file/${fileName}`, { responseType: "arraybuffer" });
        await fs.promises.writeFile(pathFile, res.data);    
    } catch (error) {
        
    }    
}

const processFiles = async () => {

    let response = [];
    
    const directoryPath = path.join(__dirname, 'files'); 

    try {
        const files = await fs.promises.readdir(directoryPath);

        for (const file of files) {
            const pathFile = path.resolve(__dirname, 'files', file);
            const fileName = file;

            const lines = [];
            const parser = fs.createReadStream(pathFile).pipe(parse({
                comment: '#',
                columns: true,
                relax_column_count: true
            }));

            for await (const data of parser) {
                const { text, number, hex } = data;
                lines.push({ text, number, hex });
            }

            response.push({
                file: fileName,
                lines
            });
        }

        return response;
    } catch (err) {
        console.log('Unable to scan directory: ' + err);
    }
};

module.exports = {
    getFiles, getFile, processFiles
}

