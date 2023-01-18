const axios = require('axios');
const { API_KEY_OPEN_AI } = require('../config/config');

const Ai = async(text, message) => {

    const response = await chatGPT(text);

    if(!response.success) {
        return message.reply('Terjadi kesalahan.');
    }

    return message.reply(response.data);
}

const chatGPT = async(question) => {

    const result = {
        success: false,
        data: null,
        message: ""
    }

    return await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        data: {
            "model": "text-davinci-003",
            "prompt": question,
            "max_tokens": 1000,
            "temperature": 0
        },
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Language": "in-ID",
            "Authorization": `Bearer ${API_KEY_OPEN_AI}`
        }
    }).
    then(res => {
        if(res.status === 200) {
            result.success = true;
            result.data = res?.data?.choices?.[0].text || 'Mohon maaf untuk saat ini kami belum tau';
        } else {
            result.message = 'Response Failed';
        }

        return result;
    }).
    catch(err => {
        result.message = `Error : ${err.message}`;
        return result
    }) ;
}


module.exports = {
    Ai
}