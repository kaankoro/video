<script lang="ts" setup>
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player/styles/default/layouts/audio.css';
import 'vidstack/player/styles/default/layouts/video.css';
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';
import { onMounted, ref } from 'vue';
import { MediaPlayerElement } from 'vidstack/elements';
import { textTracks } from './tracks';

const $player = ref<MediaPlayerElement>(),
  $src = ref('src/components/uploads/arda_guler.mp4');

// Reactive variables
let isLoaded = ref(false);
let showGrayScreen = ref(true);
let overlayOpacity = ref(1);
let overlayZIndex = ref(1);

// Methods
function handleCanPlay() {
  isLoaded.value = true;
  checkIfReadyToHideOverlay();
}

function checkIfReadyToHideOverlay() {
  if (isLoaded.value) {
    fadeOutOverlay();
  }
}

function fadeOutOverlay() {
  overlayOpacity.value = 0;
  setTimeout(() => {
    showGrayScreen.value = false;
    overlayZIndex.value = -1; // Move the overlay behind the video
  }, 500); // 0.5 seconds fade out
}

setTimeout(() => {
  checkIfReadyToHideOverlay();
}, 2000);

onMounted(() => {
  for (const track of textTracks) $player.value!.textTracks.add(track);
  $player.value?.subscribe(({ paused, viewType }) => {
  });
});
</script>

<template>
  <media-player
    class="player"
    title="Sprite Fight"
    :src="$src"
    crossOrigin
    playsInline
    ref="$player"
    @can-play="handleCanPlay"
  >
    <media-provider>
      <!-- Add media provider content if needed -->
    </media-provider>
    <!-- Layouts -->
    <media-audio-layout />
    <media-video-layout v-if="!showGrayScreen"/>
    <div :class="['overlay', { 'gray-overlay': showGrayScreen }]" :style="{ opacity: overlayOpacity, zIndex: overlayZIndex }">
      <div class="spinner" v-if="showGrayScreen"></div>
    </div>  
  </media-player>
</template>

<style scoped>
.player {
  --brand-color: #f5f5f5;
  --focus-color: #4e9cf6;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: block;

  --audio-brand: var(--brand-color);
  --audio-focus-ring-color: var(--focus-color);
  --audio-border-radius: 2px;

  --video-brand: var(--brand-color);
  --video-focus-ring-color: var(--focus-color);
  --video-border-radius: 2px;
}

.player[data-view-type='audio'] media-poster {
  display: none;
}

.player[data-view-type='video'] {
  aspect-ratio: 16 / 9;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease, z-index 0s 0.5s; /* Delay z-index change until after fade out */
  background-color: rgba(128, 128, 128, 0.4); /* Initial gray color */
  z-index: 1; /* Default z-index */
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
