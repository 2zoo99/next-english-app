const CONTRACTIONS: Record<string, string> = {
    "i'm": "i am", "i've": "i have", "i'll": "i will", "i'd": "i would",
    "you're": "you are", "you've": "you have", "you'll": "you will", "you'd": "you would",
    "he's": "he is", "he'll": "he will", "he'd": "he would",
    "she's": "she is", "she'll": "she will", "she'd": "she would",
    "it's": "it is", "it'll": "it will", "it'd": "it would",
    "we're": "we are", "we've": "we have", "we'll": "we will", "we'd": "we would",
    "they're": "they are", "they've": "they have", "they'll": "they will", "they'd": "they would",
    "that's": "that is", "that'll": "that will", "that'd": "that would",
    "there's": "there is", "there'll": "there will",
    "who's": "who is", "who'll": "who will", "who'd": "who would",
    "what's": "what is", "what're": "what are",
    "where's": "where is", "when's": "when is", "why's": "why is", "how's": "how is",
    "let's": "let us",
    "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not",
    "haven't": "have not", "hasn't": "has not", "hadn't": "had not",
    "won't": "will not", "wouldn't": "would not",
    "don't": "do not", "doesn't": "does not", "didn't": "did not",
    "can't": "can not", "couldn't": "could not",
    "shouldn't": "should not", "mightn't": "might not", "mustn't": "must not",
    "traveled": "travelled",
};

function normalizeApostrophes(text: string) {
    return text.replace(/[\u2018\u2019\u02BC]/g, "'");
}

// 단어 하나가 축약형이면 [원형 단어1, 원형 단어2]로, 아니면 [그 단어 그대로]를 반환
export function expandWord(word: string): string[] {
    const key = normalizeApostrophes(word).toLowerCase();
    const expansion = CONTRACTIONS[key];
    return expansion ? expansion.split(' ') : [word];
}