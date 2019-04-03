exports.run = (client, message, args) => {
    function isNormalInteger(str) {
        var n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }

    let messagecount;
    if(isNormalInteger(args[0])) {
        messagecount = parseInt(args[0]);
    }

    message.channel.fetchMessages({ limit: messagecount })
        .then(messages => message.channel.bulkDelete(messages));
}