import React, { useRef, useEffect, useState } from 'react';
import Header from './Components/Header';
import LeftNavBar from './Components/LeftNavBar';
import Page from './Page';
import GlobalVariables from './GlobalVariables.jsx';
import Canvas from './Canvas.jsx';
import { Text, Text2 } from './Elements.jsx';


function HtmlIframeRenderer() {


    let [htmlStr, updateHtmlStr] = useState(``);
    let [element, updateElements] = useState([]);
    let [activeElement, updateActiveElement] = useState(new Text2("test"));
    const [showGallery, setShowGallery] = useState(false);
    const [focusedElement, updateFocusedElement] = useState(undefined);
    const [elemetsStyle, updateElementsStyle] = useState("");
    const [isVerScrollVisible, setVerScrollVisStatus] = useState(false);
    const API_BASE_URL = "https://qurate-backend.vercel.app";

    let canvas = new Canvas(htmlStr, updateHtmlStr, element, updateElements, activeElement, updateActiveElement, setShowGallery, focusedElement, updateFocusedElement, elemetsStyle, updateElementsStyle, isVerScrollVisible,setVerScrollVisStatus);
    useEffect(() => {
        updateHtmlStr(canvas.getString());
    }, [element])




    // let textOne = new Text("Hello World");
    // canvas.addElement(textOne);

    // let textTwo = new Text("Hello World");
    // canvas.addElement(textTwo);

    useEffect(() => {
        updateHtmlStr(canvas.getString());
        // alert(import.meta.env);
    }, [elemetsStyle]);



    return (
        <div>
            {/* <h1>HTML in Iframe</h1>
      <iframe
        ref={iframeRef}
        title="html-preview"
        style={{ width: '100%', height: '200px', border: '1px solid #ccc' }}
      /> */}

            <GlobalVariables.Provider value={{ API_BASE_URL, isVerScrollVisible, setVerScrollVisStatus, htmlStr, updateHtmlStr, canvas, activeElement, updateActiveElement, showGallery, setShowGallery, focusedElement, updateFocusedElement }}>
                {/* <Header /> */}

                <div style={{ display: 'flex' }}>

                    <LeftNavBar />
                    <div style={{ flexGrow: 1, marginLeft: '40px' }}>
                        <Page />
                    </div>
                </div>
            </GlobalVariables.Provider>


        </div>
    );
}

export default HtmlIframeRenderer;
