./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals --excludePrivate --excludeProtected \
    --out ./doc ./natural-language-understanding/v1.ts \
    ./speech-to-text/v1-generated.ts ./text-to-speech/v1-generated.ts \
    ./lib/recognize-stream.ts ./assistant/v1.ts ./assistant/v2.ts ./discovery/v2.ts --target "ES5"
    