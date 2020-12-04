
const language = require('@google-cloud/language');
const {PredictionServiceClient} = require('@google-cloud/automl').v1;

/**
 * export GOOGLE_APPLICATION_CREDENTIALS="/Volumes/ANDRES/Descargas/orquestador-dc77bf0bf392.json"
 * TODO(developer): Uncomment these variables before running the sample.
 */
const projectId = 'orquestador-287822';
const location = 'us-central1';
const modelId = 'TCN2580124980855439360';
const content = 'Hola, como esta'

// Imports the Google Cloud AutoML library

// Instantiates a client
const client = new PredictionServiceClient();

async function predict() {
  // Construct request
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      textSnippet: {
        content: content,
        mimeType: 'text/plain', // Types: 'test/plain', 'text/html'
      },
    },
  };

  const [response] = await client.predict(request);

  for (const annotationPayload of response.payload) {
    console.log(`Predicted class name: ${annotationPayload.displayName}`);
    console.log(
      `Predicted class score: ${annotationPayload.classification.score}`
    );
  }
}

predict();

async function quickstart() {
    // Imports the Google Cloud client library
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();
  
    // The text to analyze
    const text = 'Hello, world!';
  
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
  
    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  }
  //quickstart();
