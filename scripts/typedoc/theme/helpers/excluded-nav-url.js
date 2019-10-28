"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function excludedNavUrl(cssString, currentlySelected=false) {
    // We do not want to clutter documentation with interfaces, Type aliases and Modules
    // So we'll hide navigation links to those documentations
    // This function will identify a url by its CSS class

    // We will make an exception for when excluded items are selected
    // In that case, we do render the selected excluded URL in the side navigation
    // Regardless of its other css properties

    // Returns true to exclude something, return false otherwise

    if (currentlySelected) {
        // We do not want to exclude selected items
        return false
    } else {
        const excludedCssClasses = ['tsd-kind-interface', 'tsd-kind-type-alias']
        const cssClasses = cssString.split(' ')

        return cssClasses.some((cssClass) => {
            return excludedCssClasses.includes(cssClass)
        })
    }
}
exports.excludedNavUrl = excludedNavUrl;
