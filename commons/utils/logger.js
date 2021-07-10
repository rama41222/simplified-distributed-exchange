const logger = (code, message) => {
    console.log(`CODE: ${code}:::`, `MESSAGE: ${JSON.stringify(message)}`);
}

module.exports = {
    logger
}