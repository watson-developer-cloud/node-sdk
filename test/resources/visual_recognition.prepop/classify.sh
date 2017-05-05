#!/bin/bash

#
#  A script to help with testing the test... This script creates the test visual
#  recognition classifier used by the the 'visual_recognition.prepop' test suite.
#  It shouldn't be needed in day-to-day test operation, but is included here
#  in case the test stops behaving and manual creation becomes necessary.

api_key=$(node <<EOF
auth=require('../auth.js');
console.log(auth.visual_recognition.v3.api_key)
EOF
)

echo "api_key extracted as ${api_key}"

formargs=()
for i in *.zip; do
  class=$(basename $i .zip)

  formargs+=(-F "${class}_positive_examples=@$i")
done

echo formargs "${formargs[@]}"

curl -v "${formargs[@]}" -F "name=visual_recognition_test_prepop" \
  "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers?api_key=${api_key}&version=2016-05-20"
