cd test/resources
tar cvf secrets.tar auth.js cc_input_auth_file.json cc_output_auth_file.json
cd ../..
travis encrypt-file test/resources/secrets.tar --add