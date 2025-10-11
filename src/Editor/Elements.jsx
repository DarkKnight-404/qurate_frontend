// class Text {
//     constructor(text, stringStyle) {
//         this.text = text;
//         this.stringStyle = stringStyle;
//         this.type = 'text';
//         this.options = [
//             { id: "h1", display: "h1" }
//             , { id: "h2", display: "h2" }
//             , { id: "h3", display: "h3" }
//             , { id: "p", display: "p" }
//             , { id: "span", display: "span" }
//             , { id: "fit_content", display: "[]" }
//         ];
//         this.index = -1;
//         this.selectedOption = "h2"; // Default option
//         this.fontStyle = "Calibri";
//         this.fontSize = "";
//         this.fontWeight = "";
//         this.isItalic = false;
//         this.isUnderline = false;
//         this.isStrikethrough = false;
//         this.isLeftAligned = false; // New property for left alignment
//         this.isRightAligned = false; // New property for right alignment
//         this.isCenterAligned = false; // New property for center alignment
//         this.isBullet = false; // New property for bullet points
//         this.isNumbered = false; // New property for numbered lists
//         this.fontColor = "black";
//         this.backgroundColor = "transparent";
//         this.htmlString = `
//     <div class="production_container">
//         <div class="production_object_options">
//             ${this.options.map(option => `
//                 <div class="production_object_option" onclick='
//                 window.parent.postMessage({index: ${this.index}, type: "text",option: "${option.id}"})'
//                 '>${option.display}</div>
//             `).join('')}+
//         </div>
//         <${this.selectedOption} class="production_objects">${this.text}</${this.selectedOption}>
//     </div>

//         `;
//         this.reGenHtmlStr = this.reGenHtmlStr.bind(this);
//         this.assignIndex = this.assignIndex.bind(this);
//         this.getToolbar = this.getToolbar.bind(this);
//         // this.handleMessage = this.handleMessage.bind(this);
//     }

//     reGenHtmlStr() {
//         this.htmlString = `
//     <div class="production_container">
//         <div class="production_object_options">
//             ${this.options.map(option => `
//                 <div class="production_object_option" onclick='
//                 window.parent.postMessage({index: ${this.index}, type: "text",option: "${option.id}"})'
//                 '>${option.display}</div>
//             `).join('')}+
//         </div>
//         <${this.selectedOption} class="production_objects" style="${this.stringStyle} font-family: ${this.fontStyle}; font-size: ${this.fontSize}px; font-weight: ${this.fontWeight}; ${this.isItalic ? 'font-style: italic;' : ''} ${this.isUnderline ? 'text-decoration: underline;' : ''} ${this.isStrikethrough ? 'text-decoration: line-through;' : ''} color: ${this.fontColor}; background: ${this.backgroundColor}; ${this.isLeftAligned ? 'text-align: left;' : ''} ${this.isRightAligned ? 'text-align: right;' : ''} ${this.isCenterAligned ? 'text-align: center;' : ''}">${this.text}</${this.selectedOption}>
//     </div>

//         `;
//     }

//     assignIndex(index) {
//         this.index = index;
//     }

//     getText() {
//         if (this.index === -1) {
//             return;
//         }
//         return this.text;
//     }

//     setText(newText) {
//         this.text = newText;
//     }





//     handleOptionSelect(option) {

//         // working in encoded data :
//         if (option.split(":").length > 1) {
//             let operand = option.split(":")[0];
//             let value = option.split(":")[1];
//             if (operand === "font_change") {
//                 this.fontStyle = value;
//                 this.reGenHtmlStr();
//                 return;
//             }
//             if (operand === "font_size_change") {
//                 this.fontSize = value;
//                 this.reGenHtmlStr();
//                 return;
//             }
//             if (operand === "color") {
//                 this.fontColor = value;
//                 this.reGenHtmlStr();
//                 return;
//             }
//             if (operand === "highlight") {
//                 this.backgroundColor = value;
//                 this.reGenHtmlStr();
//                 return;
//             }

//         }



//         if (option === "bold") {
//             if (this.fontWeight === "bold") {
//                 this.fontWeight = "";
//             }
//             else {
//                 this.fontWeight = "bold";
//             }
//             this.reGenHtmlStr();
//             return;
//         }

//         if (option === "italic") {
//             this.isItalic = !this.isItalic;
//             this.reGenHtmlStr();
//             return;
//         }

//         if (option === "underline") {
//             this.isUnderline = !this.isUnderline;
//             this.reGenHtmlStr();
//             return;
//         }

//         if (option === "strikethrough") {
//             this.isStrikethrough = !this.isStrikethrough;
//             this.reGenHtmlStr();
//             return;
//         }

//         if (option === "left_align") {
//             this.isLeftAligned = true;
//             this.isRightAligned = false;
//             this.isCenterAligned = false;
//             this.reGenHtmlStr();
//             return;
//         }

//         if (option === "right_align") {
//             this.isLeftAligned = false;
//             this.isRightAligned = true;
//             this.isCenterAligned = false;
//             this.reGenHtmlStr();
//             return;
//         }

//         if (option === "center_align") {
//             this.isLeftAligned = false;
//             this.isRightAligned = false;
//             this.isCenterAligned = true;
//             this.reGenHtmlStr();
//             return;
//         }

//         if (!this.options.find(opt => opt.id === option)) {
//             return;
//         }
//         this.selectedOption = option;
//         this.reGenHtmlStr();
//     }


//     getToolbar() {
//         const handleMessage = (event) => {
//             window.parent.postMessage({ index: this.index, type: "text", option: event.data.option }, "*");
//         };
//         return <>
//             <div className="text_toolbar">
//                 <div class="toolbar">
//                     <select onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "font_change:" + e.target.value } })}>
//                         <option>Calibri</option>
//                         <option>Arial</option>
//                         <option>Verdana</option>
//                         <option>Times New Roman</option>
//                         <option>Cursive</option>
//                     </select>

//                     <select onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "font_size_change:" + e.target.value } })}>
//                         <option>12</option>
//                         <option>14</option>
//                         <option>18</option>
//                         <option>24</option>
//                         <option>36</option>
//                         <option>48</option>
//                         <option>60</option>
//                     </select>

//                     <div class="divider"></div>

//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "bold" } })}><b>B</b></button>
//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "italic" } })}><i>I</i></button>
//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "underline" } })}><u>U</u></button>
//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "strikethrough" } })}><s>S</s></button>

//                     <div class="divider"></div>

//                     <label>Text Color: <input type="color" onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "color:" + e.target.value } })} /></label>
//                     <label>Highlight: <input type="color" value="#ffff00" onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "highlight:" + e.target.value } })} /></label>

//                     <div class="divider"></div>

//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "list" } })}>• List</button>
//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "numbered_list" } })}>1. List</button>

//                     <div class="divider"></div>

//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "left_align" } })}>⇤</button>
//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "right_align" } })}>⇥</button>
//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "center_align" } })}>☰</button>
//                     <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "toggle_numbered" } })}>≡</button>
//                 </div>
//             </div>
//             {/* {JSON.stringify(this)} */}

//         </>
//     }
// }

class Text2 {
    constructor(content) {
        this.content = content;
        // this.style = style;
        this.index = -1;
        this.style = [];
        this.selectedOption = "h2"; // Default option
        this.text = content;
        this.getToolbar = this.getToolbar.bind(this);
        this.htmlString = ``;
        this.reGenHtmlStr = this.reGenHtmlStr.bind(this);
        this.options = [
            { id: "h1", display: "h1" }
            , { id: "h2", display: "h2" }
            , { id: "h3", display: "h3" }
            , { id: "p", display: "p" }
            , { id: "span", display: "span" }
            , { id: "fit_content", display: "[]" }
        ];

    }

    assignIndex(index) {
        this.index = index;
    }

    assignStyle(elementId, styleString) {
        styleString.split(";").forEach((data) => {
            if (this.style[this.index + "_" + elementId] === undefined) {
                this.style[this.index + "_" + elementId] = [];
            }
            this.style[this.index + "_" + elementId].push({
                attribute: data.split(":")[0],
                value: data.split(":")[1]
            });
        });
    }

    getStyle(elementId) {
        let str = "";
        // alert(JSON.stringify(this.style))
        if (this.style[this.index + "_" + elementId]) {
            this.style[this.index + "_" + elementId].forEach((data) => {
                str += `${data.attribute}: ${data.value}; `;
            });
            return str;
        }
        // alert(str);
        return "color: red";
    }

    handleOptionSelect(option) {

        if (option === "h1") {
            this.selectedOption = "h1";
            this.reGenHtmlStr();
            return;
        }
        if (option === "h2") {
            this.selectedOption = "h2";
            this.reGenHtmlStr();
            return;
        }
        if (option === "h3") {
            this.selectedOption = "h3";
            this.reGenHtmlStr();
            return;
        }
        if (option === "p") {
            this.selectedOption = "p";
            this.reGenHtmlStr();
            return;
        }
        if (option === "span") {
            this.selectedOption = "span";
            this.reGenHtmlStr();
            return;
        }

        if (option.split(":").length > 1) {
            let operand = option.split(":")[0];
            let value = option.split(":")[1];
            if (operand === "font_change") {
                this.assignStyle("main", "font-family: " + value)
                // if (value === "Calibri") {
                //     this.assignStyle("main", "font-family: Calibri");
                //     this.reGenHtmlStr();
                //     return;
                // }
                // if (value === "Arial") {
                //     this.assignStyle("main", "font-family: Arial");
                //     this.reGenHtmlStr();
                //     return;
                // }
                // if (value === "Verdana") {
                //     this.assignStyle("main", "font-family: Verdana");
                //     this.reGenHtmlStr();
                //     return;
                // }
                // if (value === "Times New Roman") {
                //     this.assignStyle("main", "font-family: 'Times New Roman'");
                //     this.reGenHtmlStr();
                //     return;
                // }
                // if (value === "Cursive") {
                //     this.assignStyle("main", "font-family: Cursive");
                //     this.reGenHtmlStr();
                //     return;
                // }
            }

            if (operand === "font_size_change") {
                this.assignStyle("main", "font-size: " + value + "px");
            }
        }
        if (option === "Cursive") {
            this.assignStyle("main", "font-family: Cursive");
            this.reGenHtmlStr();
            return;
        }
    }

    reGenHtmlStr() {
        this.htmlString = `
    <div class="production_container">
        <div class="production_object_options">
            ${this.options.map(option => `
                <div class="production_object_option" onclick='
                window.parent.postMessage({index: ${this.index}, type: "text",option: "${option.id}"})'
                '>${option.display}</div>
            `).join('')}
        </div>
        <${this.selectedOption} id="${this.index}_main" class="production_objects" style="${this.getStyle("main")}">${this.text}</${this.selectedOption}>
    </div>`
    }

    getToolbar() {
        const handleMessage = (event) => {
            window.parent.postMessage({ index: this.index, type: "text", option: event.data.option }, "*");
        };

        if (this.index === -1) {
            return <>
                <div className="text_toolbar" style={{ display: "none" }}>
                    <div class="toolbar">
                        Welcome To Prometheus
                    </div>
                </div>
            </>
        }
        return <>
            <div className="text_toolbar">
                <div class="toolbar">
                    <select onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "font_change:" + e.target.value } })}>
                        <option>Calibri</option>
                        <option>Arial</option>
                        <option>Verdana</option>
                        <option>Times New Roman</option>
                        <option>Cursive</option>
                        <option>Fantasy</option>
                    </select>

                    <select onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "font_size_change:" + e.target.value } })}>
                        <option>12</option>
                        <option>14</option>
                        <option>18</option>
                        <option>24</option>
                        <option>36</option>
                        <option>48</option>
                        <option>60</option>
                    </select>

                    <div class="divider"></div>

                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "bold" } })}><b>B</b></button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "italic" } })}><i>I</i></button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "underline" } })}><u>U</u></button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "strikethrough" } })}><s>S</s></button>

                    <div class="divider"></div>

                    <label>Text Color: <input type="color" onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "color:" + e.target.value } })} /></label>
                    <label>Highlight: <input type="color" value="#ffff00" onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "highlight:" + e.target.value } })} /></label>

                    <div class="divider"></div>

                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "list" } })}>• List</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "numbered_list" } })}>1. List</button>

                    <div class="divider"></div>

                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "left_align" } })}>⇤</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "right_align" } })}>⇥</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "center_align" } })}>☰</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "toggle_numbered" } })}>≡</button>
                </div>
            </div>
            {/* {JSON.stringify(this)} */}

        </>
    }


    getHtml() {
        this.reGenHtmlStr();
        return this.htmlString;
    }
}


// let elementsData = {
//     "component_0001": {
//         tag: "div",
//         id: "component_0001",
//         classNames: "production_container component_0001",
//         children: [
//             {
//                 tag: "div",
//                 id: "elegant_paragraph",
//                 classNames: "production_container elegant-paragraph",
//                 children: [
//                     {
//                         tag: "div",
//                         id: "elegant_paragraph_one",
//                         classNames: "production_container",
//                         innerText: "In the quiet moments of dawn, when the world is still wrapped in the soft embrace of twilight, we find the purest form of inspiration. The subtle transition from night to day mirrors our own journeys—each sunrise offering a blank canvas, a fresh beginning where possibilities are as limitless as the horizon."
//                     },
//                     {
//                         tag: "div",
//                         id: "elegant_paragraph_two",
//                         classNames: "production_container",
//                         innerText: "Great ideas often come unannounced, like unexpected guests at the door of consciousness. They arrive without fanfare, settling into the mind with gentle persistence, transforming ordinary thoughts into extraordinary visions."
//                     },
//                     {
//                         tag: "div",
//                         id: "elegant_paragraph_author",
//                         classNames: "production_container author",
//                         innerText: "— Eleanor Montague"
//                     }
//                 ]
//             }
//         ]
//     }
// }


class HtmlString {
    constructor(htmlMap, initialStyle, classId) {
        this.elementId = "herosection";
        this.style = [];
        this.index = 0;
        this.getOptions = this.getOptions.bind(this);
        // this.classId
        //<div style="${this.getStyle("hero_image")}" class="production_container hero-image" >
        //   <div style="${this.getStyle("hero_text")}" class="production_container hero-text">
        //     <h1 style="${this.getStyle("hero_title")}" class="production_container hero-title" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_title", option: "setactiveelement"})'>I am John Doe</h1>
        //     <p style="${this.getStyle("hero_subtitle")}" class="production_container hero-subtitle" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_subtitle", option: "setactiveelement"})'>And I'm a Photographer</p>
        //     <button style="${this.getStyle("hero_button")}" class="production_container hero-button" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_button", option: "setactiveelement"})'>Hire me</button>
        //   </div>
        // </div>
        // this.htmlMap = htmlMap;
        // this.htmlString = `<div class="production_container ${this.className}" style="${this.dynamicHtml.getStyle("main_container")}">` + this.dynamicHtml.generateHTMLString() + "</div>";
        // 
        this.htmlMap = htmlMap;
        this.addNewElement = this.addNewElement.bind(this);
        this.elementsMap = {
            "test": "pass"
        };



        this.test = "pass";
        this.sendReRenderRequest = this.sendReRenderRequest();
    }

    sendReRenderRequest() {
        window.parent.postMessage({ index: "rerender", location: "rerender", option: "rerender" })

    }


    addNewElement(data) {
        let hasElementFound = false;
        let findElement = (element) => {
            if (hasElementFound === true) {
                return;
            }
            if (element.id === data.location.split(":")[1]) {
                hasElementFound = true;

                let elementId = data.elementId;
                let newElementIndex = 0;
                if (this.elementsMap[elementId] === undefined) {
                    newElementIndex = 0;
                    this.elementsMap[elementId] = 1;
                }
                else {
                    newElementIndex = this.elementsMap[elementId];
                    this.elementsMap[elementId]++;
                }



                let xml = new XMLHttpRequest();
                xml.open("GET", "https://qurate-backend.vercel.app/getelementadderbyid/?id=" + elementId);
                xml.send();
                xml.onload = () => {
                    let data = JSON.parse(xml.response);

                    let addElementHtmlMap = data.htmlMap;

                    let updatedElementMap = JSON.parse(JSON.stringify(addElementHtmlMap));
                    function updateId(element) {
                        element.id = element.id + "_" + newElementIndex;
                        if (element.children.length === 0) {
                            return;
                        }
                        element.children.forEach((val) => {
                            updateId(val);
                        })
                    }
                    updateId(updatedElementMap);



                    element.children.push({
                        "tag": "div",
                        "id": elementId + "_" + newElementIndex,
                        "classNames": "production_container " + elementId,
                        "children": [
                            updatedElementMap
                        ]
                    })




                    window.parent.postMessage({ index: "rerender", location: "rerender", option: "rerender" })


                }



            }
            if (element.children.length === 0) {
                return;
            }
            else {
                element.children.forEach(element => {
                    findElement(element);
                });
            }
        }
        findElement(this.htmlMap);
    }

    getOptions(element) {
        let elementId = element.id;
        let options = [{ id: "delete_element", display: "🗑️", style: "display: none;" }, { id: "left_align", display: "<", style: "align-items: left; justify-content: left" }, { id: "center_align", display: "=", style: "align-items: center; justify-content: center" }, { id: "right_align", display: ">", style: "align-items: right; justify-content: right" }];


        // window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "add_new_element", elementId: "component_0001"})'

        return `
        <div class="production_object_options" style="isolation: isolate;">

            ${(element.children.length === 0) ? `
            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "enable_text_editing", elementId: "component_0001"})'
            '>i</div>
                ` : ``}

            ${(element.tag === "img") ? `
            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "enable_image_editing", elementId: "component_0001"})'
            '>l</div>
                ` : ``}


            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "make_editor_visible", elementId: "component_0001"})'
            '>e</div>

            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "add_background_image", elementId: "component_0001"})'
            '>B</div>

            
            
            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "", style: "display: none"})'
            '>🗑️</div>

                        
            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "clone_element:${elementId}"})'
            '>
            C
            </div>

            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "show_element_gallery", elementId: "component_0001"})'
            '>+</div>
            
            ${options.map(option => `
                <div style="${option.style} line-height: 1" class="production_object_option" onclick='
                    window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "", style: "${option.style}"})'
                '

                >${option.display}</div>
            `).join('')}
            
        </div>
        `

    }

    assignStyle(elementId, styleString) {
        styleString.split(";").forEach((data) => {
            if (this.style[this.index + "_" + elementId] === undefined) {
                this.style[this.index + "_" + elementId] = [];
            }
            this.style[this.index + "_" + elementId].push({
                attribute: data.split(":")[0],
                value: data.split(":")[1]
            });
        });
    }

    getStyle(elementId) {
        let str = "";
        // alert(JSON.stringify(this.style))
        if (this.style[this.index + "_" + elementId]) {
            this.style[this.index + "_" + elementId].forEach((data) => {
                str += `${data.attribute}: ${data.value}; `;
            });
            return str;
        }
        // alert(str);
        return "";
    }

    generateHTMLString(data, sectionId = 'herosection') {
        // Recursive function to build HTML from the map
        const buildElement = (element, parentId = '') => {
            if (element.tag === "p") {
                element.tag = "div"
            }
            let elementStr = `<${element.tag}`;

            // Add ID
            if (element.id) {
                elementStr += ` id="${element.id}${this.htmlMap.uid}"`;
            }

            if (element.id) {
                elementStr += ` contenteditable="true"`;
            }

            // Add classes
            if (element.classNames) {
                let classNamesUid = element.classNames.split(" ").map(cls => { return cls + this.htmlMap.uid }).join(" ");
                elementStr += ` class="production_container ${classNamesUid}"`;
            }

            // Add style (assuming this.getStyle exists in the calling context)
            if (this.getStyle) {
                elementStr += ` style="${this.getStyle(element.id)} ${element.backgroundUrl ? `background-image: url(${element.backgroundUrl}); background-size: cover; background-position: center;` : ''}"`;
            }

            // Add onclick for interactive elements
            const clickableElements = ['button', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'header', 'a', 'nav'];

            if (element.children.find(val => val.src)) {
                if (clickableElements.includes(element.tag) && element.id && (element.id !== "main_container")) {
                    const location = parentId ? `${parentId}:${element.id}` : element.id;
                    elementStr += ` onclick='event.stopPropagation(); window.parent.postMessage({index: ${this.index}, location: "${location}", option: "setactiveelement"}); window.parent.postMessage({index: ${this.index}, location: "herosection:${element.children.find((val) => { return (val.src) })?.id}",option: "enable_image_editing", elementId: "component_0001"})'`;
                }
            }
            else {
                if (clickableElements.includes(element.tag) && element.id && (element.id !== "main_container")) {
                    const location = parentId ? `${parentId}:${element.id}` : element.id;
                    elementStr += ` onclick='event.stopPropagation(); window.parent.postMessage({index: ${this.index}, location: "${location}", option: "setactiveelement"});'`;
                }
            }


            if (element.tag === "img") {
                elementStr += `src="${element.src}"`
            }

            elementStr += '>';

            elementStr += this.getOptions(element);

            // Add inner text
            if (element.innerText) {
                elementStr += element.innerText;
            }

            // Process children
            if (element.children && element.children.length > 0) {
                element.children.forEach(child => {
                    elementStr += buildElement(child, element.id || parentId);
                });
            }

            elementStr += `</${element.tag}>`;
            return elementStr;
        };

        // Generate the full HTML string
        return `${buildElement(this.htmlMap, sectionId)}`;
    }

    assignIndex(index) {
        this.index = index;
    }

    // Example usage with your data:

}



class Element {
    constructor(htmlMap) {
        // properties to define element
        this.className = "default";
        this.index = -1;
        this.type = 1;
        this.htmlString = ``;


        // properties to generate html
        this.htmlMap = htmlMap;
        this.dynamicHtml = new HtmlString(htmlMap);
        this.style = this.dynamicHtml.style;


        // props and methods to handle live session
        this.focusElement = null;
        this.reGenHtmlStr = this.reGenHtmlStr.bind(this);
        this.getToolbar = this.getToolbar.bind(this);




    }

    assignClass(classId) {
        if (classId.split("_")[1] > 12) {
            this.type = 2;
        }
        this.className = classId;
        this.dynamicHtml.classId = classId;
    }

    assignIndex(index) {
        this.index = index;
        this.dynamicHtml.assignIndex(index);
    }


    handleOptionSelect(data) {



        console.log("event data is in element")
        console.log(data);



        let location = "not_defined";
        let option = data.option;
        // let index = data.index;

        if (data.location) {
            location = data.location.split(":")
        } else {
            return;
        }
        // if (location[0] != "herosection" || location[0] === "HeroSection") {
        //     return;
        // }





        // everything will eb calculate on the basis of the options 
        // categorisation of the components will be done on the basis of the no of elements after spliting with : 
        // single text options 


        let orderOfEvent = option.split(":")?.length || 1;
        if (option.length === 0 || !option) {
            orderOfEvent = 0;
        }


        if (orderOfEvent === 0) {
            this.dynamicHtml.assignStyle(location[1], data.style);
        }
        if (orderOfEvent === 1) {
            if (option === "add_new_element") {
                return;
            }
            if (option === "setactiveelement") {
                console.log("setting active element in element object");
                this.focusElement = location[1];
                console.log(this.focusElement)

                return;
            }
        }
        if (orderOfEvent === 2) {
            let operand = option.split(":")[0];
            let value = option.split(":")[1];

            if (operand === "main_container") {
                if (value === "left_align") {
                    this.dynamicHtml.assignStyle("hero_image", "justify-content: left")
                }
                if (value === "center_align") {
                    this.dynamicHtml.assignStyle("hero_image", "justify-content: center")
                }
                if (value === "right_align") {
                    this.dynamicHtml.assignStyle("hero_image", "justify-content: right")
                }
            }


            if (operand === "font_change") {
                this.dynamicHtml.assignStyle(this.focusElement, "font-family: " + value)
            }


        }









    }


    reGenHtmlStr() {


        this.htmlString = this.dynamicHtml.generateHTMLString();
        return;


        //         if (this.type === 1) {
        //             this.htmlString = `
        //     <div class="production_container ${this.className}" style="${this.getStyle("main_container")}">

        // ${this.getOptions("main_container")}

        // <div style="${this.getStyle("hero_image")}" class="production_container hero-image" >
        //   <div style="${this.getStyle("hero_text")}" class="production_container hero-text">
        //     <h1 style="${this.getStyle("hero_title")}" class="production_container hero-title" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_title", option: "setactiveelement"})'>I am John Doe</h1>
        //     <p style="${this.getStyle("hero_subtitle")}" class="production_container hero-subtitle" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_subtitle", option: "setactiveelement"})'>And I'm a Photographer</p>
        //     <button style="${this.getStyle("hero_button")}" class="production_container hero-button" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_button", option: "setactiveelement"})'>Hire me</button>
        //   </div>
        // </div>

        //         </div>`
        //         }
        //         else if (this.type === 2) {
        //             this.htmlString = `
        // <div class="production_container ${this.className}" style="${this.getStyle("main_container")}">

        // ${this.getOptions("main_container")}
        //         {/* <div style="${this.getStyle("hero_section")}" class="production_container hero">
        //   <div style="${this.getStyle("hero_content")}" class="production_container hero-content">
        //     <h1 style="${this.getStyle("hero_header")}" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_header", option: "setactiveelement"})' contenteditable="true" class="production_container">Revolutionize Your Workflow</h1>
        //     <p style="${this.getStyle("hero_para")}" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_para", option: "setactiveelement"})' contenteditable="true" class="production_container">Boost productivity with our all-in-one solution. Seamless integration, powerful features, and intuitive design.</p>
        //     <button style="${this.getStyle("hero_button")}" onclick='window.parent.postMessage({index: ${this.index}, location: "herosection:hero_button", option: "setactiveelement"})' class="production_container">Get Started</button>
        //   </div>
        //   <div style="${this.getStyle("hero_image_div")}" class="production_container hero-image">
        //     <img style="${this.getStyle("hero_image")}" src="Components//UiImage.png" alt="Product Preview">
        //   </div>
        // </div> */}

        //         </div>`
        //         }
    }

    getToolbar() {
        const handleMessage = (data) => {
            window.parent.postMessage(data, "*");
        };
        return <>
            <div className="text_toolbar">
                <div class="toolbar">
                    <select onChange={e => handleMessage({ index: this.index, location: ("HeroSection:" + this.focusElement), option: "font_change:" + e.target.value })}>
                        <option>Calibri</option>
                        <option>Arial</option>
                        <option>Verdana</option>
                        <option>Times New Roman</option>
                        <option>Cursive</option>
                        <option>Fantasy</option>
                    </select>

                    <select onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "font_size_change:" + e.target.value } })}>
                        <option>12</option>
                        <option>14</option>
                        <option>18</option>
                        <option>24</option>
                        <option>36</option>
                        <option>48</option>
                        <option>60</option>
                    </select>

                    <div class="divider"></div>

                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "bold" } })}><b>B</b></button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "italic" } })}><i>I</i></button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "underline" } })}><u>U</u></button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "strikethrough" } })}><s>S</s></button>

                    <div class="divider"></div>

                    <label>Text Color: <input type="color" onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "color:" + e.target.value } })} /></label>
                    <label>Highlight: <input type="color" value="#ffff00" onChange={e => handleMessage({ data: { index: this.index, type: "text", option: "highlight:" + e.target.value } })} /></label>

                    <div class="divider"></div>

                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "list" } })}>• List</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "numbered_list" } })}>1. List</button>

                    <div class="divider"></div>

                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "left_align" } })}>⇤</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "right_align" } })}>⇥</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "center_align" } })}>☰</button>
                    <button onClick={e => handleMessage({ data: { index: this.index, type: "text", option: "toggle_numbered" } })}>≡</button>
                </div>
            </div>
            {/* {JSON.stringify(this)} */}

        </>
    }


    getHtml() {
        this.reGenHtmlStr();
        return this.htmlString;
    }


    genProductionHtml(data, sectionId = 'herosection') {
        // Recursive function to build HTML from the map
        const buildElement = (element, parentId = '') => {
            if (element.tag === "p") {
                element.tag = "div"
            }
            let elementStr = `<${element.tag}`;

            // Add ID
            if (element.id) {
                elementStr += ` id="${element.id}${this.htmlMap.uid}"`;
            }

            if (element.id) {
                elementStr += ` contenteditable="true"`;
            }

            // Add classes
            if (element.classNames) {
                let classNamesUid = element.classNames.split(" ").map(cls => { return cls + this.htmlMap.uid }).join(" ");
                elementStr += ` class="production_container ${classNamesUid}"`;
            }

            // Add style (assuming this.getStyle exists in the calling context)
            if (this.getStyle) {
                elementStr += ` style="${this.getStyle(element.id)} ${element.backgroundUrl ? `background-image: url(${element.backgroundUrl}); background-size: cover; background-position: center;` : ''}"`;
            }

            // Add onclick for interactive elements
            // const clickableElements = ['button', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'header', 'a', 'nav'];
            // if (clickableElements.includes(element.tag) && element.id && (element.id !== "main_container")) {
            //     const location = parentId ? `${parentId}:${element.id}` : element.id;
            //     elementStr += ` onclick='event.stopPropagation(); window.parent.postMessage({index: ${this.index}, location: "${location}", option: "setactiveelement"})'`;
            // }

            if (element.tag === "img") {
                elementStr += `src="${element.src}"`
            }

            elementStr += '>';

            // elementStr += this.getOptions(element);

            // Add inner text
            if (element.innerText) {
                elementStr += element.innerText;
            }

            // Process children
            if (element.children && element.children.length > 0) {
                element.children.forEach(child => {
                    elementStr += buildElement(child, element.id || parentId);
                });
            }

            elementStr += `</${element.tag}>`;
            return elementStr;
        };

        // Generate the full HTML string
        return `${buildElement(this.htmlMap)}`;
    }
}


class HeroSection extends Element {

    constructor(htmlMap) {
        super(htmlMap);
        // this.getToolbar = this.getToolbar;
        // this.handleOptionSelect = this.handleOptionSelect;
        // this.setState = this.setState;
        this.state = {
            gradientStart: '#ffffff',
            gradientEnd: '#000000',
            gradientDirection: 'to right'
        };
        this.addNewElement = this.dynamicHtml.addNewElement;
    }
    setState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        // If you need to re-render after state change:
    }


    findElement(elementId) {
        function checkElement(element) {
            if (element.id === elementId) {
                return element;
            }
            element.children.forEach((child) => {
                console.log(child.id);
                return checkElement(child);
            });
        }
        return checkElement(this.htmlMap);
    }

    changeText(elementId, newtext) {
        function checkElement(element) {
            // if((element.id+this.htmlMap.uid) === elementId){
            //     console.log("element found")
            //     console.log(element);
            //     return element;
            // }
            console.log(element);
            if (element.id === elementId) {
                console.log("element found-----------------------------------------------")
                console.log(element);
                element.innerText = newtext;
                return;
            }
            element.children.forEach((child) => {
                console.log(child.id);
                return checkElement(child);
            });
        }
        checkElement(this.htmlMap);
    }

    updateText(elementId, newtext) {
        alert("updating text in herosection" + JSON.stringify(elementId) + newtext)
        console.log("updating text in herosection")
        // findElement(this.htmlMap);
        console.log(this.findElement(elementId))
        this.changeText(elementId, newtext);
        console.log(elementId, newtext)
    }



    setBackgroundUrl(elementId, newtext) {
        function checkElement(element) {
            // if((element.id+this.htmlMap.uid) === elementId){
            //     console.log("element found")
            //     console.log(element);
            //     return element;
            // }
            console.log(element);
            if (element.id === elementId) {
                console.log("element found-----------------------------------------------")
                console.log(element);
                element.backgroundUrl = newtext;
                return;
            }
            element.children.forEach((child) => {
                console.log(child.id);
                return checkElement(child);
            });
        }
        checkElement(this.htmlMap);
    }

    addBackgroundImg(elementId, newUrl) {
        console.log("setting background img")
        this.setBackgroundUrl(elementId,newUrl);
    }




    changeImgUrl(elementId, newUrl) {
        function checkElement(element) {
            // if((element.id+this.htmlMap.uid) === elementId){
            //     console.log("element found")
            //     console.log(element);
            //     return element;
            // }
            console.log(element);
            if (element.id === elementId) {
                console.log("element found-----------------------------------------------")
                console.log(element);
                element.src = newUrl;
                return;
            }
            element.children.forEach((child) => {
                console.log(child.id);
                return checkElement(child);
            });
        }
        checkElement(this.htmlMap);
    }

    updateImgUrl(elementId, newUrl) {
        alert("updating url in herosection" + JSON.stringify(elementId) + newUrl)
        console.log("updating url in herosection")
        // findElement(this.htmlMap);
        // console.log(this.findElement(elementId))
        this.changeImgUrl(elementId, newUrl);
        console.log(elementId, newUrl)
    }

    handleOptionSelect(data) {


        console.log("request recieved at the element ");
        console.log(data);





        let location = "not_defined";
        let option = data.option;
        // let index = data.index;

        if (data.location) {
            location = data.location.split(":")
        } else {
            return;
        }
        // if (location[0] != "herosection" || location[0] === "HeroSection") {
        //     return;
        // }





        // everything will eb calculate on the basis of the options 
        // categorisation of the components will be done on the basis of the no of elements after spliting with : 
        // single text options 


        let orderOfEvent = option.split(":")?.length || 1;
        if (option.length === 0 || !option) {
            orderOfEvent = 0;
        }


        if (orderOfEvent === 0) {
            this.dynamicHtml.assignStyle(location[1], data.style);
            setTimeout(() => { this.reGenHtmlStr() }, 1000);
        }
        if (orderOfEvent === 1) {
            if (option === "add_new_element") {
                this.addNewElement(data);
            }
            if (option === "setactiveelement") {
                console.log("request recieved at the element to set active element from canvas ");
                this.focusElement = location[1];
                console.log(this.focusElement);
                return;
            }
        }
        if (orderOfEvent === 2) {


            if (data.style) {
                this.dynamicHtml.assignStyle(this.focusElement, data.style);
                return;
            }


            let operand = option.split(":")[0];
            let value = option.split(":")[1];

            console.log(operand + "," + value);

            if (operand === "main_container") {
                if (value === "left_align") {
                    this.dynamicHtml.assignStyle("hero_image", "justify-content: left")
                }
                if (value === "center_align") {
                    this.dynamicHtml.assignStyle("hero_image", "justify-content: center")
                }
                if (value === "right_align") {
                    this.dynamicHtml.assignStyle("hero_image", "justify-content: right")
                }
            }


            if (operand === "font_change") {
                this.dynamicHtml.assignStyle(this.focusElement, "font-family: " + value)
            }


            if (operand === "clone_element") {

                console.log("clone function activated");
                console.log(this.htmlMap)

                // function getCopy(ele) {
                //     let copy = { ...ele };

                //     function genUniqueId(element) {
                //         if (element.children && element.children.length === 0) {
                //             return;
                //         }
                //         element.children.forEach((child) => {
                //             child.id = child.id + "_" + Date.now();
                //         })
                //     }

                //     genUniqueId(copy);
                //     console.log(copy)
                //     return copy;

                // }

                function getUniqueId(ele) {
                    if (ele.children.length === 0) {
                        return;
                    }
                    ele.children.forEach((child) => {
                        child.id = child.id + "_" + Date.now();
                        getUniqueId(child);
                    })
                }

                function deepClone(obj) {
                    return JSON.parse(JSON.stringify(obj));
                }

                function cloneElement(parent, id) {
                    // console.log("inside itt ")
                    // console.log(parent)
                    // console.log(id);
                    parent.children.forEach((ele) => {
                        console.log(ele.id);
                        if (ele.id === id) {
                            // console.log("parent found ")
                            // console.log("parent befoer cloning element")
                            // console.log(parent);

                            let copyEle = deepClone(ele);
                            getUniqueId(copyEle);

                            copyEle.id = copyEle.id + "_" + Date.now();


                            parent.children = [...parent.children, copyEle];
                            // console.log("after cloning element")
                            // console.log(parent);
                        }
                        else if (ele.children.length === 0) {
                            return;
                        }
                        else {
                            cloneElement(ele, id)
                        }
                    })
                }

                cloneElement(this.htmlMap, value)


                // console.log(id)





            }

        }









    }




    getToolbar() {
        // const handleMessage = (data) => {
        //     window.parent.postMessage(data, "*");
        // };
        // const sendToolbarAction = (style) => {
        //     handleMessage({ index: this.index, location: ("herosection:" + this.focusElement), option: "default_order_2:default_order_2", style: style });
        // };


        return <>
            <div className="text_toolbar" style={{ display: "none" }}>

            </div>
            {/* {JSON.stringify(this)} */}

        </>
    }
}

export { Text2, Element, HeroSection };