import { useContext, useEffect } from 'react'
// import { HeroSection, Text2 } from './Elements.jsx';
// import Canvas from './Canvas.jsx';
import GlobalVariables from './GlobalVariables.jsx';
import ElementsAdder from './ElementsAdder.jsx';
import IframePreview from './IFramePreview.jsx';
import VerticalToolbar from './VerticalToolbar.jsx';

function Page() {
    // const iframeRef = useRef(null);


    // let htmlCode = ``

    // useEffect(() => {
    //     const iframe = iframeRef.current;
    //     const doc = iframe.contentDocument || iframe.contentWindow.document;
    //     doc.open();
    //     doc.write(htmlCode);
    //     doc.close();
    // }, []);


    // function addCompoent() {  
    //     let textOne = new Text("Hello World");
    //     // htmlCode = textOne.htmlString;   

    // }
    // let frameOneRef = useRef();


    let { isVerScrollVisible, htmlStr, canvas, activeElement, showGallery, setShowGallery } = useContext(GlobalVariables);
    // let [] = useState(new Text2("test"));

    // let [updateTempHtmlString] = useState("");

    useEffect(() => {
        canvas.setShowGallert = setShowGallery;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     setTimeout(() => {
    //         updateTempHtmlString(htmlStr);
    //     }, 150);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [htmlStr]);




    // const canvas = 


    // alert("Pass")




    useEffect(() => {






        //         let hero = new HeroSection("I am John Doe", "And I'm a Photographer", "Hire me");
        //         hero.reGenHtmlStr();
        //         canvas.addElement(hero);

        //         hero.assignStyle("hero_image", `
        //   background-image: url('HeroSectionImage.jpg');
        //   background-size: cover;
        //   background-position: center;
        //   height: 400px;
        //   display: flex;
        //   align-items: center;
        //   justify-content: center;
        //   position: relative;
        //   overflow: hidden;
        // `);

        //         hero.assignStyle("hero_text", `
        //   text-align: center;
        //   color: white;
        //   padding: 20px;
        //   z-index: 2;
        // `);

        //         hero.assignStyle("hero_title", `
        //   font-size: 2.5rem;
        //   margin-bottom: 10px;
        //   font-weight: bold;
        // `);

        //         hero.assignStyle("hero_subtitle", `
        //   font-size: 1.2rem;
        //   margin-bottom: 20px;
        //   opacity: 0.9;
        // `);

        //         hero.assignStyle("hero_button", `
        //   background-color: #ff5733;
        //   color: white;
        //   border: none;
        //   padding: 10px 20px;
        //   font-size: 1rem;
        //   border-radius: 4px;
        //   cursor: pointer;
        //   transition: background-color 0.3s;
        // `);


        //         let textOne = new Text2("Hello World1");
        //         textOne.reGenHtmlStr();
        //         canvas.addElement(textOne);

        //         textOne.assignStyle("main", "font-size: 20px; color: red; text-align: center");


        //         updateActiveElement(textOne)

    }, [])


    // let textTwo = new Text("Hello World2");
    // canvas.addElement(textTwo);

    
    useEffect(() => {
        window.addEventListener("message", canvas.handleOptionSelect);

        return () => {
            window.removeEventListener("message", canvas.handleOptionSelect);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [htmlStr]);



    let str = "";
    try {
        str = activeElement.getToolbar();
    } catch (error) {
        str = "not loaded";
    }


    // let [scrollData, updateScrollData] = useState(frameOneRef.current?.offsetTop || 0);
    // useEffect(() => {

    // }, [])




    return (
        <div>
            {/* <button onClick={() => {
                updateHtmlStr(canvas.getString());
            }}>update</button> */}
            {str}
            {showGallery && (
                <ElementsAdder
                    onClose={() => setShowGallery(false)}
                    onElementSelect={(elementId) => {
                        console.log('Selected element:', elementId);
                        setShowGallery(false);
                    }}
                />
            )}
            {/* <iframe
                ref={frameOneRef}
                // ref={iframeRef}
                title="html-preview"
                style={{ width: '100%', height: '100vh', border: '1px solid #ccc', marginTop: "45px", zIndex: 100 }}
                srcDoc={htmlStr}
            /> */}

            <div style={{ display: "flex", zIndex: -1000, flex: 1, flexDirection: "row", marginTop: "calc(2vh + 20px)", overflow: "hidden" }}>
                <IframePreview htmlString={htmlStr} />

                <div className='scroll_down_editor' style={{ width: (isVerScrollVisible ? '25%' : `0px`) ,transition: "width 0.5s ease-out"}}>
                    <VerticalToolbar />
                </div>
            </div>

            {/* <iframe
                // ref={iframeRef}
                title="html-preview"
                style={{
                    position: 'absolute',
                    top: frameOneRef.current?.offsetTop || 0,
                    left: frameOneRef.current?.offsetLeft || 0,
                    width: frameOneRef.current?.offsetWidth || '100%',
                    height: '100vh',
                    border: '1px solid #ccc',
                    marginTop: "45px",
                    top: "0px",
                    zIndex: -100
                }}
                srcDoc={tempHtmlString}
            /> */}
        </div>
    )
}

export default Page
