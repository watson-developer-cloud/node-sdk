#!/bin/sh

# based on https://odoepner.wordpress.com/2012/02/17/shell-script-to-generate-simple-index-html/

echo '<!DOCTYPE html><html><body>'
echo '<h1>JSDoc for <a href="https://npmjs.org/package/watson-developer-cloud"><code>watson-developer-cloud</code></a></h1>'
echo '<p>See also: <a href="https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/">https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/</a></p>'
echo '<ul>'
ls | sed 's/^.*/<li><a href="&">&<\/a><\/li>/'
echo '</ul></body></html>'
