import { useEffect, useRef } from "react";
import morphdom from "morphdom";

function IframePreview({ htmlString }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Initial render: write full HTML
    if (!doc.body.hasChildNodes()) {
      doc.open();
      doc.write(htmlString);
      doc.close();
    } else {
      // Later updates: morph existing DOM with new HTML
      const newDoc = new DOMParser().parseFromString(htmlString, "text/html");
      morphdom(doc.documentElement, newDoc.documentElement);
    }
  }, [htmlString]);

  return <iframe style={{ width: '100%', height: 'calc(98vh - 20px)', border: '1px solid #ccc', zIndex: 100 }} ref={iframeRef} className="w-full h-screen border" />;
}

export default IframePreview;
