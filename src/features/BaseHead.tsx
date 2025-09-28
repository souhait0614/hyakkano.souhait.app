export default function BaseHead() {
  return (
    <>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,initial-scale=1,viewport-fit=cover,interactive-widget=overlays-content' />
      <meta name='format-detection' content='telephone=no,date=no,address=no,email=no,url=no' />
      <link
        rel='icon'
        href='/favicon.ico'
        type='image/x-icon'
        sizes='32x32'
      />
      <link
        rel='icon'
        href='/icon-192.png'
        type='image/png'
        sizes='192x192'
      />
      <link
        rel='icon'
        href='/icon-512.png'
        type='image/png'
        sizes='512x512'
      />
      <link
        rel='apple-touch-icon'
        href='/apple-touch-icon.png'
        type='image/png'
        sizes='180x180'
      />
    </>
  );
}
