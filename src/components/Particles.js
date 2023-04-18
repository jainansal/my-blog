import particleJS from 'particle.js'

new particleJS({
  element: 'canvas',
  imagePath: '/images/logo-float.png',
  cropStartPointX: 0,
  cropStartPointY: 0,
  cropX: 60,
  cropY: 30,
  startingPointX: 30,
  startingPointY: 15,
  destinationX: 0,
  destinationY: 0,
  duration: 300,
  pointOffsetEnable: false,
  pointOffsetLevel: 4,
  timeOffsetLevel: 100,
  spacingEnable: false,
  spacingLevel: 2
}).render();