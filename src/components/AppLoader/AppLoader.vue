<template>
  <div class="loader">
    <div class="loader__inner"></div>
    <div class="loader__orbit">
      <div class="loader__dot"></div>
      <div class="loader__dot"></div>
      <div class="loader__dot"></div>
      <div class="loader__dot"></div>
    </div>
  </div>
</template>

<style scoped lang="css">
.loader {
  position: relative;
  width: 20em;
  height: 20em;
  border-radius: 50%;
  /* smooth background */
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.05) 30%,
    transparent 20%
  );
  overflow: hidden;
}

/* outside circle */
.loader::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: .4em solid transparent;
  border-top-color: rgba(255, 255, 255, 0.6);
  animation: loader-spin 2s linear infinite;
}

/* rotating circle */
.loader::after {
  content: "";
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: conic-gradient(from 90deg, rgba(255, 255, 255, 0.2), transparent);
  filter: blur(2px);
  animation: loader-spin-reverse 1.5s linear infinite;
}

/* center circle */
.loader__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6em;
  height: 6em;
  background: rgba(0, 0, 0);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 1.5em rgba(255, 255, 255, 0.6);
  animation: loader-pulse 1s ease-in-out infinite;
}

/* Container */
.loader__orbit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: orbit-rotate 3s linear infinite;
}

/* dots */
.loader__dot {
  position: absolute;
  left: 50%;
  top: 50%;
  width: .9em;
  height: .9em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

/* 4 dots */
.loader__dot:nth-child(1) {
  transform: rotate(0deg) translate(60px);
}
.loader__dot:nth-child(2) {
  transform: rotate(90deg) translate(60px);
}
.loader__dot:nth-child(3) {
  transform: rotate(180deg) translate(60px);
}
.loader__dot:nth-child(4) {
  transform: rotate(270deg) translate(60px);
}

/* Animations */

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-spin-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes loader-pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes orbit-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
