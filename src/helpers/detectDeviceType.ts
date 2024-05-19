export default function detectDeviceType(): 'Mobile' | 'Tablet' | 'Desktop' {
  const userAgent = window.navigator.userAgent;
  if (/Mobi/.test(userAgent) || /Android/i.test(userAgent)) {
    return 'Mobile';
  } else if (/iPad|Tablet|Silk.*Firefox|Kindle|PlayBook/i.test(userAgent)) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}