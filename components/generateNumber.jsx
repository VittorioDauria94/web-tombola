export default function generateNumbers() {
  return Array.from({ length: 90 }, (_, i) => ({
    value: i + 1,
    extracted: false,
  }));
}
