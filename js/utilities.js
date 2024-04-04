export default {
    /**
     * 
     * @param {Node} parentElement 
     * @param {String} elementType 
     * @param {Array} classNames
     * @param {String} text
     * @param {String} idName
     * @returns {Node} element created is returned
     */
    createElement: (parentElement, elementType, classNames = [], text = "", idName = "") => {
        const elementTemplate = document.createElement(elementType);
        if (text != "") {
            elementTemplate.textContent = text
        }
        if (idName != "") {
            elementTemplate.setAttribute("id",idName)
        }
        if (classNames.length != 0) {
            classNames.forEach(className => elementTemplate.classList.add(className))
        }
        parentElement.appendChild(elementTemplate)
        return elementTemplate
    }
}