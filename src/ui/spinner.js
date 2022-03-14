export default class Spinner {
    #spinnerElement
    constructor(idSpinnerParent) {
        this.#spinnerElement = document.getElementById(idSpinnerParent);
    }

    async awaitWithSpinner(fn) {
        this.#startSpinner();
        const response = await fn;
        this.#stopSpinner();
        return response;
    }

    #startSpinner() {
        this.#spinnerElement.style.display = "flex"
    } 

    #stopSpinner() {
        this.#spinnerElement.style.display = "none"
    }
    

}