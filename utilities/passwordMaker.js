var passwordMaker = function() {

}

passwordMaker.prototype.generatePassword = function () {
    var charPool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var length = 8;
    var pass = ""
    for (let i = 0; i < length; i++) {
        var index = Math.floor(Math.random() *charPool.length);
        pass += charPool.charAt(index);
    }

    return pass;
}

module.exports = passwordMaker
