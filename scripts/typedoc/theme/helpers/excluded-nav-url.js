"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function excludedNavUrl(cssString) {
    // We do not want to clutter documentation with interfaces, Type aliases and Modules
    // So we'll hide navigation links to those documentations
    // This function will identify whether a url by its CSS class
    // Returns true if type of URL is excluded. Returns false otherwise

    const excludedCssClasses = ['tsd-kind-interface', 'tsd-kind-type-alias']
    const cssClasses = cssString.split(' ')


    return cssClasses.some((cssClass) => {
        return excludedCssClasses.includes(cssClass)
    })
}
exports.excludedNavUrl = excludedNavUrl;
