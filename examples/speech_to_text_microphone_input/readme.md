# IBM Watson Speech to Text Microphone Transcription Examples

Uses IBM Watson and Node.js to transcribe speech captured from the computer's microphone.

The `transcribe-mic-to-file.js` example uses the more flexible [mic](https://www.npmjs.com/package/mic) package,
which requires that you have either [arecord](http://alsa-project.org/) (Linux) or
[sox](http://sox.sourceforge.net/) (Mac/Windows).

The `transcribe-mic-to-console.js` example uses the [line-in](https://www.npmjs.com/package/line-in) package,
which has no dependencies.
