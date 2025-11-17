// Industrial Robotics Motion Constants
// Precision timing and easing for mission-critical UI

export const INDUSTRIAL_EASING = {
  // Primary industrial easing - controlled, minimal overshoot
  primary: [0.30, 0.15, 0.20, 1.00] as [number, number, number, number],
  // Secondary - slightly faster
  secondary: [0.25, 0.20, 0.35, 1.00] as [number, number, number, number],
  // Linear - for robotic precision
  linear: "linear" as const,
};

export const INDUSTRIAL_TIMING = {
  // Panel animations
  panel: 0.16, // 160ms
  // Micro-interactions
  micro: 0.12, // 120ms
  // Fast micro
  fastMicro: 0.08, // 80ms
  // Fade transitions
  fade: 0.1, // 100ms
  // Data updates
  dataUpdate: 0.15, // 150ms
};

export const INDUSTRIAL_TRANSITION = {
  // Panel appearance
  panel: {
    duration: INDUSTRIAL_TIMING.panel,
    ease: INDUSTRIAL_EASING.primary,
  },
  // Micro interactions
  micro: {
    duration: INDUSTRIAL_TIMING.micro,
    ease: INDUSTRIAL_EASING.secondary,
  },
  // Fast micro
  fastMicro: {
    duration: INDUSTRIAL_TIMING.fastMicro,
    ease: INDUSTRIAL_EASING.linear,
  },
  // Fade only
  fade: {
    duration: INDUSTRIAL_TIMING.fade,
    ease: INDUSTRIAL_EASING.linear,
  },
  // Data updates
  data: {
    duration: INDUSTRIAL_TIMING.dataUpdate,
    ease: INDUSTRIAL_EASING.linear,
  },
} as const;

