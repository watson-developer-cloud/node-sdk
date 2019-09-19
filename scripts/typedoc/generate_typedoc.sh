./node_modules/.bin/typedoc --mode file --theme ./scripts/typedoc/theme --excludeExternals \
    --out ./doc ./authorization/v1.ts \
    ./discovery/v1.ts ./language-translator/v3.ts \
    ./natural-language-classifier/v1.ts ./natural-language-understanding/v1.ts \
    ./personality-insights/v3.ts \
    ./speech-to-text/v1-generated.ts ./text-to-speech/v1-generated.ts \
    ./tone-analyzer/v3.ts ./visual-recognition/v3.ts \
    ./lib/recognize-stream.ts ./assistant/v1.ts ./assistant/v2.ts ./compare-comply/v1.ts --target "ES5"
    