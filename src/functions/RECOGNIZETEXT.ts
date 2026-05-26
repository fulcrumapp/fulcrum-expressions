/**
 * Recognize text in a photo
 * 
 * View Documentation - https://learn.fulcrumapp.com/dev/expressions/reference/recognizetext/
 */

interface RecognizeTextOptions {
  photo_id: string;
}

interface RecognizeTextResult {
  text: string;
}

export default function RECOGNIZETEXT(
  options: RecognizeTextOptions,
  callback: (error: Error, result: RecognizeTextResult) => void
): void
{}