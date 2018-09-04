#!/bin/bash

cd appscan
make generate-irx
make upload-file
make run-scan
cd ../
