import React, { useState } from "react";

const ACCESS_KEY = "UIP-c0LfBiObMI_9X0v3YfjESJofbMDMeAhPGH1KbGA";
const IMAGES_PER_PAGE = 30;
const TOTAL_PAGES = 3;

export default function ImageContainer({
    imagesContainerVisible,
    setImageContainerVisibility,
    callbackUrlUpdate,
}) {
    const [keyword, setKeyword] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchImages = () => {
        if (!keyword.trim()) return alert("Please enter a keyword");

        setImages([]);
        setLoading(true);
        let allUrls = [];
        let completedRequests = 0;

        for (let page = 1; page <= TOTAL_PAGES; page++) {
            const xhr = new XMLHttpRequest();
            const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
                keyword
            )}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${ACCESS_KEY}`;

            xhr.open("GET", url, true);

            // eslint-disable-next-line no-loop-func
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    const urls = data.results.map((img) => img.urls.regular);
                    allUrls = allUrls.concat(urls);
                }

                completedRequests++;
                if (completedRequests === TOTAL_PAGES) {
                    setImages(allUrls);
                    setLoading(false);
                }
            };

            // eslint-disable-next-line no-loop-func
            xhr.onerror = function () {
                console.error("Error fetching page " + page);
                completedRequests++;
                if (completedRequests === TOTAL_PAGES) setLoading(false);
            };

            xhr.send();
        }
    };

    if (!imagesContainerVisible) return null;

    return (
        <div className="popup-overlay" style={{ zIndex: 10000 }}>
            <div className="popup-container">
                {/* Close Button */}
                <button
                    onClick={() => setImageContainerVisibility(false)}
                    className="popup-close"
                >
                    ✕
                </button>

                {/* Header */}
                <h2 className="popup-title">Unsplash Image Search</h2>

                {/* Search Box */}
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Enter keyword (e.g. mountains)"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={searchImages} className="search-button">
                        Search
                    </button>
                </div>

                {/* Loading */}
                {loading && <p className="loading-text">Loading images...</p>}

                {/* Gallery */}
                <div className="image-gallery">
                    {images.map((url, i) => (
                        <img
                            key={i}
                            src={url}
                            alt=""
                            className="gallery-image"
                            onClick={() => {
                                callbackUrlUpdate(url);
                                setImageContainerVisibility(false);

                            }}
                        />
                    ))}
                </div>

                {/* No Results */}
                {!loading && images.length === 0 && (
                    <p className="no-results">No images found.</p>
                )}
            </div>
        </div>
    );
}
