export default function (speed) {
  if (speed >= 1024) {
    return `${speed / 1024} ГБ/сек`;
  }
  return `${speed} МБ/сек`;
}
