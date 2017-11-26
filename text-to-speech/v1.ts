import GeneratedTextToSpeechV1 = require('./v1-generated');

class TextToSpeechV1 extends GeneratedTextToSpeechV1 {
  constructor(options) {
    super(options);
  }

  getCustomizations(params, callback) {
    return super.listCustomizations(params, callback);
  }

  getWords(params, callback) {
    return super.listWords(params, callback);
  }

  voices(params, callback) {
    return super.listVoices(params, callback);
  }

  voice(params, callback) {
    return super.getVoice(params, callback);
  }
}

export = TextToSpeechV1;
