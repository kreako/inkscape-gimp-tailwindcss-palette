const generate = require('./generate.js')

test('hexColorToRGB handles black as 4 characters', async () => {
  const rgb = generate.hexColorToRGB('#000')
  expect(rgb.r).toBe(0);
  expect(rgb.g).toBe(0);
  expect(rgb.b).toBe(0);
});

test('hexColorToRGB handles white as 4 characters', async () => {
  const rgb = generate.hexColorToRGB('#fff')
  expect(rgb.r).toBe(255);
  expect(rgb.g).toBe(255);
  expect(rgb.b).toBe(255);
});

test('hexColorToRGB handles random 4 characters', async () => {
  const rgb = generate.hexColorToRGB('#1a7')
  expect(rgb.r).toBe(0x11);
  expect(rgb.g).toBe(0xaa);
  expect(rgb.b).toBe(0x77);
});

test('hexColorToRGB handles random 7 characters', async () => {
  const rgb = generate.hexColorToRGB('#1a745a')
  expect(rgb.r).toBe(0x1A);
  expect(rgb.g).toBe(0x74);
  expect(rgb.b).toBe(0x5a);
});

test('formatRGB formats rgb as expected', async () => {
  const fmt = generate.formatRGB({r : 67, g: 230, b: 3})
  expect(fmt).toBe('067 230 003')
});
