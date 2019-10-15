"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function excludedIndexSection(sectionTitle) {
    // Returns true if section is excluded. Returns false otherwise
    const excludedSections = ['Interfaces', 'Type aliases', 'Modules']
    return excludedSections.includes(sectionTitle)
}
exports.excludedIndexSection = excludedIndexSection;
