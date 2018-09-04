include Configfile

# This will configure a 32-bit architecture on top of a 64-bit linux machine
config-arch:
	sudo dpkg --add-architecture i386
	sudo apt-get update
	sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386

# Gets the ASoC Client Tool and configures it
asoc-tool: config-arch
	$(eval DIR := $(shell pwd))
	curl -o $(HOME)/client.zip $(APPSCAN_TOOL)
	mkdir $(HOME)/client ; mkdir $(HOME)/tool
	unzip -qq $(HOME)/client.zip -d $(HOME)/client
	cd $(HOME)/client ; ls | xargs -I {} sh -c "cp -r {}/* $(HOME)/tool"
	rm -rf client

# Clone repo
clone-repo:
	git clone $(GIT_REPO)

# Generates the irx file for icp-cert-manager
generate-irx:
	cd $(TRAVIS_BUILD_DIR)
	$(HOME)/tool/bin/appscan.sh prepare -oso

# Login to the AppScan API
api-login:
	curl -o $(HOME)/token.json -X POST $(CONTENT_HEADER_JSON) $(ACCEPT_HEADER_JSON) -d '{"KeyId":"$(ASOC_APIKEY)", "KeySecret":"$(ASOC_SECRET)"}' $(LOGIN_URL)

# Uploads the irx file to the AppScan API
upload-file: api-login
	$(eval TOKE := $(shell python getJson.py $(HOME)/token.json "Token"))
	$(eval AUTH := --header 'Authorization: Bearer $(TOKE)')
	$(eval FILE := fileToUpload=@$(shell pwd)/$(notdir $(shell find $(pwd) -maxdepth 2 -name '*.irx' -print)))
	
	curl -o $(HOME)/file.json -X POST --header 'Content-Type: multipart/form-data' $(ACCEPT_HEADER_JSON) $(AUTH) -F $(FILE) $(UPLOAD_URL)

# Checks to see if Cert-Manager-Application already exists.
# TODO: Error with the url, will come back to this later.
get-app:
	$(eval TOKE := $(shell python getJson.py $(HOME)/token.json "Token"))
	$(eval AUTH := --header 'Authorization: Bearer $(TOKE)')
	$(eval URL := $(GET_APP_URL)'$(APP_NAME)''')

	curl -X GET $(ACCEPT_HEADER_JSON) $(AUTH) $(URL)

# Assume we have an existing application, then we'll simply run the static scan
run-scan:
	$(eval TOKE := $(shell python getJson.py $(HOME)/token.json "Token"))
	$(eval AUTH := --header 'Authorization: Bearer $(TOKE)')
	$(eval FILE_ID := "$(shell python getJson.py $(HOME)/file.json "FileId")")
	$(eval APP_ID := "$(shell python getJson.py app.json "Id")")

	curl -X POST $(CONTENT_HEADER_JSON) $(ACCEPT_HEADER_JSON) $(AUTH) -d '{"ARSAFileId": $(FILE_ID), "ApplicationFileId": $(FILE_ID), "ScanName": "$(TRAVIS_TAG):$(TRAVIS_JOB_NUMBER):$(TRAVIS_COMMIT)", "EnableMailNotification": false, "Locale": "en-US", "AppId": $(APP_ID), "Execute": true, "Personal": false}' $(STATIC_SCAN_URL)

get-asset-group:
	$(eval TOKE := $(shell python getJson.py $(HOME)/token.json "Token"))
	$(eval AUTH := --header 'Authorization: Bearer $(TOKE)')

	curl -o asset.json -X GET $(ACCEPT_HEADER_JSON) $(AUTH) $(GET_ASSET_GROUP_URL)

# Create the application only if the application doesn't already exist.
create-app: get-asset-group
	$(eval ASSET_GROUP_ID := "$(shell python getJson.py asset.json "Id")")
	$(eval TOKE := $(shell python getJson.py $(HOME)/token.json "Token"))
	$(eval AUTH := --header 'Authorization: Bearer $(TOKE)')

	curl -o app.json -X POST $(CONTENT_HEADER_JSON) $(ACCEPT_HEADER_JSON) $(AUTH) -d '{"Name": $(APP_NAME), "AssetGroupId": $(ASSET_GROUP_ID), "BusinessImpact": "Unspecified"}' $(CREATE_APP_URL)