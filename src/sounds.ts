import hellevator from './assets/sounds/hellevator.mp3';
import chkchkboom from './assets/sounds/chckchckboom.mp3';
import hallucination from './assets/sounds/hallucination.mp3';
import divine from './assets/sounds/divine.mp3';
import bleep from './assets/sounds/bleep.mp3';

// Array of completion ringtones
export const ringtones: string[] = [
  hellevator,
  chkchkboom,
  hallucination,
  divine,
  bleep
];

export const playRandomRingtone = (): void => {
  if (ringtones.length === 0) return;
  const randomIndex = Math.floor(Math.random() * ringtones.length);
  const selectedSound = ringtones[randomIndex];
  const audio = new Audio(selectedSound);
  audio.play().catch(err => console.error("Failed to play random ringtone:", err));
};