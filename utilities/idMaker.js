var idMaker = function() {

}

idMaker.prototype.generateId = function () {
    var charPool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var length = 8;
    var id = ""
    for (let i = 0; i < length; i++) {
        var index = Math.floor(Math.random() *charPool.length);
        id += charPool.charAt(index);
    }

    return id;
}