import type { TextTrackInit } from 'vidstack';

export const textTracks: TextTrackInit[] = [
  {
    src: 'src/components/uploads/sample.vtt',
    label: 'English',
    language: 'en-US',
    kind: 'subtitles',
    default: true,
  },
  {
    label: "English",
    kind: "captions",
    language: "en-US",
    type: "json",
    content: { "regions": [], "cues": [{ startTime: 0, endTime: 5, text: 'merhaba' },
    { startTime: 5, endTime: 10, text: 'dünya' },] },
  },
];