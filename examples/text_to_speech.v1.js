'use strict';

var TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
var fs = require('fs');

var textToSpeech = new TextToSpeechV1({
  // if left unspecified here, the SDK will fall back to the TEXT_TO_SPEECH_USERNAME and TEXT_TO_SPEECH_PASSWORD
  // environment properties, and then IBM Cloud's VCAP_SERVICES environment property
  // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
  url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});

// Synthesize speech, correct the wav header, then save to disk
// (wav header requires a file length, but this is unknown until after the header is already generated and sent)
// This method buffers the file in memory and repairs the WAV header in place.
textToSpeech.synthesize(
  {
    text: 'Hello from IBM Watson',
    accept: 'audio/wav'
  },
  function(err, audio) {
    if (err) {
      console.log(err);
      return;
    }
    textToSpeech.repairWavHeader(audio);
    fs.writeFileSync('audio.wav', audio);
    console.log('audio.wav written with a corrected wav header');
  }
);

// Synthesize speech and then pipe the results to a file
// This method is more efficient and does not buffer the file in memory,
// but the WAV header will be incorrect and an audio player will likely
// show the clip as being ~20 hours long.
textToSpeech
  .synthesize({
    text: 'Hello from IBM Watson',
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav' // default is audio/ogg; codec=opus
  })
  .pipe(fs.createWriteStream('output.wav'));

// Retrieve details of all available voices
textToSpeech.listVoices({}, function(err, res) {
  if (err) {
    return console.log(err);
  }
  console.log(JSON.stringify(res, null, 2));
});

// Retrieve details of a specific voice
textToSpeech.getVoice(
  {
    voice: 'en-GB_KateVoice'
  },
  function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
  }
);

// Pronunciation details for a word
textToSpeech.getPronunciation(
  {
    text: 'iPhone',
    format: 'spr', // 'ipa' (default) is only for english voices
    voice: 'de-DE_DieterVoice' // optional, defaults to en-US_MichaelVoice
  },
  function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
  }
);

// create a voice model to change pronunciation of words
textToSpeech.createVoiceModel(
  {
    name: 'my custom alt language pronunciation model',
    language: 'en-US', // currently, only en-US is accepted
    description: 'Test model to try out custom pronunciations'
  },
  function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
    /*
{
  "customization_id": "6666451d-a23e-485c-9bc5-c7ce722550d6"
}
   */
  }
);

// update a voice model
textToSpeech.updateVoiceModel(
  {
    customization_id: '6666451d-a23e-485c-9bc5-c7ce722550d6',
    name: 'new name', // optional
    description: 'new description', // optional
    words: [
      { word: 'NCAA', translation: 'N C double A' },
      { word: 'iPhone', translation: 'I phone' }
    ] // required - replaces existing words list
  },
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('updated');
  }
);

// get a list of custom voice models
textToSpeech.listVoiceModels(
  {
    language: 'en-US' // optional filter (currently only accepts en-US)
  },
  function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
    /*
{
  "customizations": [
    {
      "last_modified": 1472067196711,
      "customization_id": "10ba7c7c-ce2d-447f-9724-72da0d6f1e66",
      "created": 1472067196711,
      "description": "Test model to try out custom pronunciations",
      "name": "my custom pronunciation model",
      "language": "en-US",
      "owner": "7f966201-2afd-48ea-b5c1-d6981d50633e"
    },
    {
      "last_modified": 1465475563937,
      "customization_id": "e24536fd-b1b4-48f3-95fe-c2d93e7f5c45",
      "created": 1465475563937,
      "description": "a simple model for testing purposes",
      "name": "test model",
      "language": "en-US",
      "owner": "7f966201-2afd-48ea-b5c1-d6981d50633e"
    }
    //...
  ]
}
   */
  }
);

// get details of a custom voice model
textToSpeech.getVoiceModel(
  {
    customization_id: '6666451d-a23e-485c-9bc5-c7ce722550d6'
  },
  function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
    /*
{
  "last_modified": 1472067165812,
  "customization_id": "6666451d-a23e-485c-9bc5-c7ce722550d6",
  "created": 1472066628780,
  "words": [
    {
      "word": "NCAA",
      "translation": "N C double A"
    },
    {
      "word": "iPhone",
      "translation": "I phone"
    }
  ],
  "description": "new description",
  "name": "new name",
  "language": "en-US",
  "owner": "7f966201-2afd-48ea-b5c1-d6981d50633e"
}
   */
  }
);

// delete a custom voice model
textToSpeech.deleteVoiceModel(
  {
    customization_id: '9d153f61-a9c4-4b73-8eaf-63951c6dd77d'
  },
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('deleted');
  }
);

// add multiple words to an existing model
textToSpeech.addWords(
  {
    customization_id: '7c7f8ba7-2f83-48f2-ae52-3a70825f9899',
    words: [
      { word: 'NCAA', translation: 'N C double A' },
      { word: 'iPhone', translation: 'I phone' }
    ]
  },
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('added');
  }
);

// add a single word to an existing model
textToSpeech.updateVoiceModel(
  {
    customization_id: '7c7f8ba7-2f83-48f2-ae52-3a70825f9899',
    word: 'NCAA',
    translation: 'N C double A'
  },
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('added');
  }
);

// get all words in a customization
textToSpeech.listWords(
  {
    customization_id: '7c7f8ba7-2f83-48f2-ae52-3a70825f9899'
  },
  function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
    /*
{
  "words": [
    {
      "word": "NCAA",
      "translation": "N C double A"
    },
    {
      "word": "iPhone",
      "translation": "I phone"
    }
  ]
}
   */
  }
);

// get a single word from a customization
textToSpeech.getWord(
  {
    customization_id: '7c7f8ba7-2f83-48f2-ae52-3a70825f9899',
    word: 'iPhone'
  },
  function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.stringify(res, null, 2));
    /*
{
  "translation": "I phone"
}
   */
  }
);

// delete a word from a customization
textToSpeech.deleteWord(
  {
    customization_id: '7c7f8ba7-2f83-48f2-ae52-3a70825f9899',
    word: 'iPhone'
  },
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('deleted word');
  }
);
