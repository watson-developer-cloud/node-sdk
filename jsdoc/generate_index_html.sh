#!/bin/sh

# based on https://odoepner.wordpress.com/2012/02/17/shell-script-to-generate-simple-index-html/

echo '<!DOCTYPE html><html><body>'
echo '<h1>JSDoc for IBM Watson Developer Cloud Node.js SDK</h1>'
echo '<p><a href="https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/">docs</a>'
echo ' | <a href="https://github.com/watson-developer-cloud/node-sdk">GitHub</a>'
echo ' | <a href="https://npmjs.org/package/watson-developer-cloud">npm</a>'
echo '</p><ul>'
ls| grep --invert-match index.html | sed 's/^.*/<li><a href="&">&<\/a><\/li>/'
echo '</ul></body></html>'
