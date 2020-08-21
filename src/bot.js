module.exports = (token, prefix) => {

    new (require("./Structures/Entities/Discord/Client"))(token, prefix);

}