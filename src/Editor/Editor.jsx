import { useEffect, useMemo, useState } from 'react';
import LeftNavBar from './Components/LeftNavBar';
import Page from './Page';
import GlobalVariables from './GlobalVariables.jsx';
import Canvas from './Canvas.jsx';
import { Text2 } from './Elements.jsx';
import DeployPopup from './DeployPopuo.jsx';
import ImageContainer from './ImageContainer.jsx';
import AiPopup from './AiPopup.jsx';
import { useLocation } from 'react-router-dom';


function HtmlIframeRenderer() {


    let [htmlStr, updateHtmlStr] = useState(``);
    let [element, updateElements] = useState([]);
    let [activeElement, updateActiveElement] = useState(new Text2("test"));
    const [showGallery, setShowGallery] = useState(false);
    const [focusedElement, updateFocusedElement] = useState(undefined);
    const [elemetsStyle, updateElementsStyle] = useState("");
    const [isVerScrollVisible, setVerScrollVisStatus] = useState(false);
    const [callbackUrlUpdate, updateCallbackUrlUpdate] = useState(null);
    const [imagesContainerVisible, setImagesContainerVisible] = useState(false);
    const API_BASE_URL = "https://qurate-backend.vercel.app";

    let canvas = useMemo(()=>{
        return new Canvas(htmlStr, updateHtmlStr, element, updateElements, activeElement, updateActiveElement, setShowGallery, focusedElement, updateFocusedElement, elemetsStyle, updateElementsStyle, isVerScrollVisible, setVerScrollVisStatus, setImagesContainerVisible, updateCallbackUrlUpdate);
    },[htmlStr, updateHtmlStr, element, updateElements, activeElement, updateActiveElement, setShowGallery, focusedElement, updateFocusedElement, elemetsStyle, updateElementsStyle, isVerScrollVisible, setVerScrollVisStatus]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        updateHtmlStr(canvas.getString());
    }, [element,canvas])






    // let textOne = new Text("Hello World");
    // canvas.addElement(textOne);

    // let textTwo = new Text("Hello World");
    // canvas.addElement(textTwo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        updateHtmlStr(canvas.getString());
    }, [elemetsStyle,canvas]);

    const [isDeployPopupVisible, updateDeployPopupVisibility] = useState(false);
    const [htmlDeploymentStr, updateHtmlDeploymentStr] = useState("");
    const [isAiVisible,setIsAiVisible] = useState(false);
    const [prop,setProp] = useState("");
    const location = useLocation();
    const [initialCompId,updateInitCompIt] = useState(undefined);

    useEffect(()=>{
        // alert((location.state));
        if(location.state === "ai"){
            setIsAiVisible(true);
        }
        if(location.state?.split(":")[0] === "getById"){
            console.log("pass in the request parser getbyid")
            updateInitCompIt(location.state.split(":")[1]);
            // alert(location.state.split(":")[1])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (
        <div>
            {/* <h1>HTML in Iframe</h1>
      <iframe
        ref={iframeRef}
        title="html-preview"
        style={{ width: '100%', height: '200px', border: '1px solid #ccc' }}
      /> */}

            <GlobalVariables.Provider value={{ isAiVisible,setIsAiVisible,prop,setProp, API_BASE_URL, isVerScrollVisible, setVerScrollVisStatus, htmlStr, updateHtmlStr, canvas, activeElement, updateActiveElement, showGallery, setShowGallery, focusedElement, updateFocusedElement }}>
                {/* <Header /> */}
                <AiPopup></AiPopup>

                <ImageContainer callbackUrlUpdate={callbackUrlUpdate} imagesContainerVisible={imagesContainerVisible} setImageContainerVisibility={setImagesContainerVisible}  />
                <DeployPopup isDeployPopupVisible={isDeployPopupVisible} updateDeployPopupVisibility={updateDeployPopupVisibility} htmlString={htmlDeploymentStr} />

                <div style={{ display: 'flex' }}>

                    <LeftNavBar initialCompId={initialCompId} updateDeployPopupVisibility={updateDeployPopupVisibility} updateHtmlDeploymentStr={updateHtmlDeploymentStr} />
                    <div style={{ flexGrow: 1, marginLeft: '40px', overflowX: "hidden" }}>
                        <Page />
                    </div>
                </div>
            </GlobalVariables.Provider>


        </div>
    );
}

export default HtmlIframeRenderer;
