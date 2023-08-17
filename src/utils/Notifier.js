import notifier from "node-notifier";

// Refer: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults

// TODO: Add a method to show a post and when clicked redirects user to the main page
class Notifier {
    #appID = "Hackr";
    #icon = "Terminal Icon";

    #title
    #message

    /**
     * 
     * @param {string} title
     * @param {string} message
     */
    constructor(title, message) {
        this.#title = title;
        this.#message = message;
    }

    show() {
        notifier.notify({
            title: this.#title,
            message: this.#message,
            icon: this.#icon,
            id: Date.now().toString,
            appID: this.#appID,
        });
    }
}

export default Notifier;