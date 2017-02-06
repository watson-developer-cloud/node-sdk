// var path = require('path');
//
// var modules = [
//   'relationship_extraction',
//   'visual_recognition',
//   'speech_to_text',
//   'text_to_speech',
//   'concept_insights',
//   'tradeoff_analytics',
//   'personality_insights',
//   'natural_language_classifier',
//   'authorization',
//   'language_translator',
//   'tone_analyzer',
//   'dialog',
//   'retrieve_and_rank',
//   'document_conversion',
//   'search',
//   'alchemy_language',
//   'alchemy_vision',
//   'alchemy_data_news',
//   'conversation'
// ];
//
// function isService(fileInfo) {
//   var fiename = path.basename(fileInfo.path);
//   return fiename.match(/^v\d\.js$/);
// }
//
// function isRequire(nodePath) {
//   return nodePath.node.callee && nodePath.node.callee.name === 'require';
// }
//
//
//
//
//
// module.exports = function(fileInfo, api, options) {
//   if (!isService(fileInfo)) {
//     return; // skip files that aren't services
//   }
//
//   var j = api.jscodeshift;
//
//   function requiresBaseService(requires){
//     return requires
//       .filter(function(nodePath) {
//         return nodePath.node.arguments && path.basename(nodePath.node.arguments[0].value, '.js') === 'base_service';
//       }).size()
//   }
//
//   var jcs = j(fileInfo.source);
//   var requires = jcs.find(j.CallExpression).filter(isRequire);
//
//   if (requiresBaseService(requires)) {
//     return; // skip files that already require base_service on the assumption that they're already complete
//   }
//
//   if (requires.size() === 0) {
//     throw new Error ('no require statements found in ' + fileInfo.path);
//   }
//
//   var lastRequire = requires.at(-1);
//
//
//
//   //.filter(function (path) {
//   //   con
//   // })
//
//   // var call = j.callExpression(
//   //   j.identifier('foo'),
//   //   [j.identifier('bar')]
//   // );
//
//   //
//   // return api.jscodeshift(fileInfo.source)
//   //   .findVariableDeclarators('foo')
//   //   .renameTo('bar')
//   //   .toSource();
// };
