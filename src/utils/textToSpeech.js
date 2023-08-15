export const synth = typeof window !== 'undefined' && window.speechSynthesis;

export const speech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id';
    utterance.pitch = 1;
    utterance.rate = 0.9;
    utterance.volume = 2;
    return utterance;
};
