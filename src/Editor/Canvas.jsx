
export default class Canvas {
    constructor(htmlString = ``, updateHtmlStr, elements, updateElements,activeElement, updateActiveElement, setShowGallert,focusedElement, updateFocusedElement,elemetsStyle,updateElementsStyle,isVerScrollVisible,setVerScrollVisStatus,setImagesContainerVisible, updateCallbackUrlUpdate) {
        this.htmlString = htmlString;
        this.updateHtmlStr = updateHtmlStr;
        this.elements = elements;
        this.updateElements = updateElements;
        this.getString = this.getString.bind(this);
        this.mode = "edit";//edit or view
        this.activeElement = activeElement;
        this.updateActiveElement = updateActiveElement;
        this.setShowGallert = setShowGallert;
        this.focusedElement = focusedElement;
        this.updateFocusedElement = updateFocusedElement;
        this.elementsStyle = "";
        this.elementsStyle = elemetsStyle;
        this.updateElementsStyle = updateElementsStyle;
        this.isVerScrollVisible = isVerScrollVisible;
        this.setVerScrollVisStatus = setVerScrollVisStatus;
        this.setImagesContainerVisible = setImagesContainerVisible;
        this.updateCallbackUrlUpdate = updateCallbackUrlUpdate;
        this.productionStyle = `
        <style>


















._0004 {
.hero-image {
  background-image: url('HeroSectionImage.jpg');
  filter: grayscale(60%) brightness(0.8);
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 40px;
}

.hero-text {
  text-align: right;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 25px;
  border-radius: 8px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.hero-subtitle {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.hero-button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px 25px;
  border-radius: 5px;
  cursor: pointer;
}

.hero-button:hover {
  background-color: white;
  color: black;
}
}


        body{
          margin: 0px;
        }
        .production_objects{
            
        }
        .production_container:hover{
            outline: 2px solid black;
            overflow: visible;
        }
            .production_object_options{
                display: none; 
                flex-direction: row;
                position: absolute;
                top: 0px;
                left: 0;
                // bottom: 100%;
                background-color: rgba(255, 255, 255, 0.8);
                color: black;
                font-size: 16px;
                padding: 5px;
                z-index: 1000;
                gap: 5px;
                transform: translateY(-100%); 
            }
            .production_object_options div{
                padding: 2px 5px;
                cursor: pointer;
            }
            /* Only show options inside the container you hover */
.production_container:hover > .production_object_options {
  display: flex;
} 
/* If this container has a hovered child, hide its own options */
.production_container:has(.production_container:hover) > .production_object_options {
  display: none;
}

.production_object_options {
    /* Alignment resets */
    text-align: initial;

    /* Font style resets */
    font-weight: normal;
    font-style: normal;
    text-decoration: none;

    /* Transform resets */
    text-transform: none;

    /* Effects resets */
    text-shadow: none;
    -webkit-text-stroke: 0;
    color: initial;

    /* Font family reset */
    font-family: initial;

    /* Spacing resets */
    letter-spacing: normal;
    line-height: normal;
}



            .production_container{
                position: relative;
                // border: 1px solid #ccc;
            }


.production_container {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.production_container::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(90deg, #ff7a18, #af002d, #319197);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.production_container:hover::before {
  opacity: 1;
}





/* Prevent parent highlight when child is hovered */
.production_container:has(.production_container:hover)::before {
  opacity: 0;
}

/* Keep clicked container highlighted (pure CSS focus-based) */
.production_container:focus-within::before,
.production_container:focus::before {
  opacity: 1;
}

/* Make container focusable */
.production_container {
  outline: none;
}



.production_container:focus-within::before,
.production_container:focus::before {
  opacity: 1;
}




.production_container {
  position: relative;
  cursor: pointer;
}

/* Hide checkbox but keep it clickable */
.production_container input[type="checkbox"] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

/* When checked, show gradient border */
.production_container input[type="checkbox"]:checked + .production_content::before {
  opacity: 1;
}

/* Keep hover effect */
.production_container:hover .production_content::before {
  opacity: 1;
}

#main_container{
      background-color: white;
}


        </style>
        `




      this.handleOptionSelect = this.handleOptionSelect.bind(this);
      // this.addElementStyle = this.addElementStyle;
      

    }



  async handleOptionSelect(event){
    console.log("event is as follows")
    console.log(event);

    if(event.data.option === "rerender"){
      // alert("request recieved");
      this.updateHtmlStr(this.getString());
    }
    // return;

    console.log("event recieved in canvas");
    console.log(event.data);


            // let index = event.data.index;
            let location = "not_defined";
            let option = event.data.option;

            if(event.data.location){
              location = event.data.location.split(":")
              if(location.length !== 2){
              }
            }else{
              return;
            }

            if(option === "make_editor_visible"){
              this.setVerScrollVisStatus(true);
            }

            if(option === "enable_text_editing"){
              let text = prompt("Enter the text");
              console.log("text entered is ",text);
              event.data.text = text;
              this.elements[event.data.index].updateText(location[1],text);
              this.updateHtmlStr(this.getString());
              return;
            }

            if(option === "enable_image_editing"){
              // let url = prompt("Enter the url of the image");
              // console.log("url entered is ",url);
              // event.data.url = url;
              // this.elements[event.data.index].updateImgUrl(location[1],url);
              // this.updateHtmlStr(this.getString());
              this.setImagesContainerVisible(true);
              this.updateCallbackUrlUpdate(()=>{return (url)=>{
                this.elements[event.data.index].updateImgUrl(location[1],url);
                this.updateHtmlStr(this.getString());
              }});
              return;
            }

            if(option === "add_background_image"){
              // let url = prompt("Enter the url of the background image");
              // console.log("url entered is ",url);
              // event.data.backgroundUrl = url;
              // this.elements[event.data.index].addBackgroundImg(location[1],url);
              // this.updateHtmlStr(this.getString());
              this.setImagesContainerVisible(true);
              this.updateCallbackUrlUpdate(()=>{return (url)=>{
                this.elements[event.data.index].addBackgroundImg(location[1],url);
                this.updateHtmlStr(this.getString());
              }});
              return;
            }

            if(option === "show_element_gallery"){
              this.setShowGallert(true);
// window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "show_element_gallery", elementId: "component_0001"})'
              this.updateFocusedElement({
                index: event.data.index,
                location: event.data.location,
              })
              return;
            }

            // if(option.split(":")[0] === "clone_element"){
            //   console.log("cloning element");
            //   console.log(this.elements[event.data.index]);
            //   try {
            //     this.elements[event.data.index].handleOptionSelect(event.data);
            //   } catch (error) {
                
            //   }
            // }

            // operating on the event 
            if(option === "setactiveelement"){

              console.log("setting active element");
              console.log(event.data);
              console.log(this.elements);

                await this.updateActiveElement(this.elements[event.data.index]);
                try {
                  await this.elements[event.data.index].handleOptionSelect(event.data);
                  this.updateHtmlStr(this.getString());
                  console.log("data passed in to the element from canvas")
                  console.log("Element is as folows")
                  console.log(this.elements[event.data.index])
                } catch (error) {
                  console.log("error in passing event handler to the element from canvas")
                  console.log(error)
                }
                return;
            }

            try {
                await this.elements[event.data.index].handleOptionSelect(event.data);
                this.updateHtmlStr(this.getString());
            } catch (error) {
            }
        }


    addElement(element) {
        try {
            // element.index = this.elements.length;
            element.assignIndex(this.elements.length);
            element.getHtml();
            // this.elements.push(element);
            this.updateElements((prevElements) => {
                return [...prevElements, element];
            })
        } catch (error) {
        }
    }

    async addElementStyle(css){
      // alert("adding this css "+css)
      // console.log("adding style ",css);
      await this.updateElementsStyle((prev)=>{
        let newCss = prev+css;

        return newCss;
      })

      // await this.updateHtmlStr(this.getString())


      
    }

    getString() {


      
function extractKeyframes(cssStr) {
  // Non-greedy regex to capture @keyframes blocks properly
  const keyframeRegex = /@keyframes\s+[a-zA-Z0-9_-]+\s*{[\s\S]*?}\s*}/g;

  // Extract all keyframes
  const keyframes = cssStr.match(keyframeRegex) || [];

  // Remove them from the original string
  const cleanedCss = cssStr.replace(keyframeRegex, "").trim();

  // Return with keyframes at the top + cleaned css
  return keyframes.join("\n\n") + "\n\n" + cleanedCss;
}



        let str = ``;



        str+="<style>";
        str+=extractKeyframes(this.elementsStyle);
        str+="</style>";

        if (this.mode === "edit") {
            str += this.productionStyle;
        }

        this.elements.forEach(element => {
            str += element.getHtml();
        });


        this.htmlString = str;

        // console.log(this.htmlString);

        return this.htmlString;
    }



    genProductionHtml() {


      
function extractKeyframes(cssStr) {
  // Non-greedy regex to capture @keyframes blocks properly
  const keyframeRegex = /@keyframes\s+[a-zA-Z0-9_-]+\s*{[\s\S]*?}\s*}/g;

  // Extract all keyframes
  const keyframes = cssStr.match(keyframeRegex) || [];

  // Remove them from the original string
  const cleanedCss = cssStr.replace(keyframeRegex, "").trim();

  // Return with keyframes at the top + cleaned css
  return keyframes.join("\n\n") + "\n\n" + cleanedCss;
}



        let str = ``;



        str+="<style>";
        str+=extractKeyframes(this.elementsStyle);
        str+="</style>";

        if (this.mode === "edit") {
            str += this.productionStyle;
        }

        this.elements.forEach(element => {
            str += element.genProductionHtml();
        });



        // console.log(this.htmlString);

          return str;
    }

}
// export default class Canvas {
//     constructor(htmlString = ``, updateHtmlStr, elements, updateElements) {
//         this.htmlString = ``;
//         this.updateHtmlStr = updateHtmlStr;
//         this.elements = elements;
//         this.getString = this.getString.bind(this);
//         this.mode = "edit";//edit or view
//         this.updateElements = updateElements;
//         this.productionStyle = `
//         <style>
//         .production_objects{
            
//         }
//         .production_container:hover{
//             border: 0.5px solid black;

//         }
//             .production_object_options{
//                 display: none; 
//                 flex-direction: row;
//                 position: absolute;
//                 top: 0px;
//                 left: 0;
//                 background-color: rgba(255, 255, 255, 0.8);
//                 padding: 5px;
//                 z-index: 1000;
//                 gap: 5px;
//             }
//             .production_object_options div{
//                 padding: 2px 5px;
//                 cursor: pointer;
//             }
//             .production_container:hover .production_object_options {
//                 display: flex;
//             }   
//             .production_container{
//                 position: relative;
//                 border: 1px solid #ccc;
//             }
//         </style>
//         `





//         const handleMessage = async (event) => {
//             try {
//                 await this.elements[event.data.index].handleOptionSelect(event.data.option);
//                 this.updateHtmlStr(this.getString());
//             } catch (error) {
//             }
//         };

//         window.addEventListener("message", handleMessage);
//     }

//     addElement(element) {
//         try {
//             element.index = this.elements.length;
//             element.reGenHtmlStr();
//             // this.elements.push(element);
//             this.updateElements((prevElements) => {
//                 return [...prevElements, element];
//             })
//         } catch (error) {
//         }
//     }

//     getString() {
//         let str = ``;

//         if (this.mode === "edit") {
//             str += this.productionStyle;
//         }

//         this.elements.forEach(element => {
//             str += element.htmlString;
//         });


//         this.htmlString = str;

//         return this.htmlString;
//     }

// }