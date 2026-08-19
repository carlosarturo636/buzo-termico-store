"use client";

import Script from "next/script";
import { getMufasaMetaParameters, trackMetaPixel } from "@/lib/meta-pixel";

const META_PIXEL_ID = "941801464865360";
let hasTrackedViewContent = false;

export function MetaPixel() {
  function trackInitialProductView() {
    if (hasTrackedViewContent) return;
    hasTrackedViewContent = true;
    trackMetaPixel("ViewContent", getMufasaMetaParameters());
  }

  return (
    <Script id="mufasa-meta-pixel" strategy="afterInteractive" onReady={trackInitialProductView}>
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
