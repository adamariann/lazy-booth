function formatDurationNumeric(
  seconds: number,
  format?: "hour" | "minute" | "second"
): string {
  // Ubah nilai seconds ke bilangan bulat
  seconds = Math.ceil(seconds);

  // Hitung jam, menit, dan detik dari total detik
  const hours = Math.floor(Math.abs(seconds) / 3600);
  const minutes = Math.floor((Math.abs(seconds) % 3600) / 60);
  const remainingSeconds = Math.abs(seconds) % 60;

  // Buat format string untuk waktu
  const formattedTime =
    format === "minute"
      ? [minutes, remainingSeconds]
      : format === "second"
      ? [remainingSeconds]
      : [hours, minutes, remainingSeconds];

  const res =
    format === "second"
      ? formattedTime.map((value) => String(value)).join(":")
      : formattedTime.map((value) => String(value).padStart(2, "0")).join(":");

  // Tambahkan tanda minus jika seconds negatif
  return seconds < 0 ? "-" + res : res;
}

export default formatDurationNumeric;
