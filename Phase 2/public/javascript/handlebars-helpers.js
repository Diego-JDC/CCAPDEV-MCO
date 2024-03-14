const { currentlyLoggedUser, loggedUser } = require("../../controllers/routes");

module.exports = {
    formatDate: (date) => {return date.toDateString()},
    canEdit: (name) => { return (loggedUser == name) }
};