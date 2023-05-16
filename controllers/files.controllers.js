const fs = require('fs')  
const { reponse } = require('express');
const axios = require('axios');
const { getFiles } = require('../services/files.service');

const procesData = async (req, res = response) => {

    const result = await getFiles();

    res.json({
        result
    })
}


module.exports = {
    procesData
};