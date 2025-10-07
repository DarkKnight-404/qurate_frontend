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
                <div className="text_toolbar">
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
        switch (elementId) {
            case "h1" || "h2" || "h3" || 'h4' || 'h5' || 'h6' || 'p' || (element.innerText !== "" || undefined):
                options = [
                    // Alignment
                    { id: "left_align", display: "⯇", style: "text-align: left;" },
                    { id: "center_align", display: "≡", style: "text-align: center;" },
                    { id: "right_align", display: "⯈", style: "text-align: right;" },
                    { id: "justify", display: "≋", style: "text-align: justify;" },

                    // Font style
                    { id: "bold", display: "B", style: "font-weight: bold;" },
                    { id: "italic", display: "I", style: "font-style: italic;" },
                    { id: "underline", display: "U", style: "text-decoration: underline;" },
                    { id: "strike", display: "S̶", style: "text-decoration: line-through;" },

                    // Transform
                    { id: "uppercase", display: "A↑", style: "text-transform: uppercase;" },
                    { id: "lowercase", display: "a↓", style: "text-transform: lowercase;" },
                    { id: "capitalize", display: "Aa", style: "text-transform: capitalize;" },

                    // Effects
                    { id: "highlight", display: "🖍", style: "background-color: yellow;" },
                    { id: "shadow", display: "S", style: "text-shadow: 2px 2px 4px rgba(0,0,0,0.5);" },
                    { id: "outline", display: "O", style: "-webkit-text-stroke: 1px black; color: transparent;" },

                    // Quick font families
                    { id: "serif", display: "T", style: "font-family: 'Times New Roman', serif;" },
                    { id: "sans_serif", display: "S", style: "font-family: Arial, sans-serif;" },
                    { id: "monospace", display: "M", style: "font-family: monospace;" },

                    // Quick spacing
                    { id: "wide_spacing", display: "↔", style: "letter-spacing: 2px;" },
                    { id: "tight_spacing", display: "↔", style: "letter-spacing: -1px;" },
                    { id: "double_line", display: "↕", style: "line-height: 2;" }
                ];

                break;

            default:
                break;
        }
        if (element.children.length === 0) {
            options = [
                // delete
                { id: "left_align", display: "🗑️", style: "display: none;" },

                // Alignment
                { id: "left_align", display: "⯇", style: "text-align: left;" },
                { id: "center_align", display: "≡", style: "text-align: center;" },
                { id: "right_align", display: "⯈", style: "text-align: right;" },
                { id: "justify", display: "≋", style: "text-align: justify;" },

                // Font style
                { id: "bold", display: "B", style: "font-weight: bold;" },
                { id: "italic", display: "I", style: "font-style: italic;" },
                { id: "underline", display: "U", style: "text-decoration: underline;" },
                { id: "strike", display: "S̶", style: "text-decoration: line-through;" },

                // Transform
                { id: "uppercase", display: "A↑", style: "text-transform: uppercase;" },
                { id: "lowercase", display: "a↓", style: "text-transform: lowercase;" },
                { id: "capitalize", display: "Aa", style: "text-transform: capitalize;" },

                // Effects
                { id: "highlight", display: "🖍", style: "background-color: yellow;" },
                { id: "shadow", display: "S", style: "text-shadow: 2px 2px 4px rgba(0,0,0,0.5);" },
                { id: "outline", display: "O", style: "-webkit-text-stroke: 1px black; color: transparent;" },

                // Quick font families
                { id: "serif", display: "T", style: "font-family: 'Times New Roman', serif;" },
                { id: "sans_serif", display: "S", style: "font-family: Arial, sans-serif;" },
                { id: "monospace", display: "M", style: "font-family: monospace;" },

                // Quick spacing
                { id: "wide_spacing", display: "↔", style: "letter-spacing: 2px;" },
                { id: "tight_spacing", display: "↔", style: "letter-spacing: -1px;" },
                { id: "double_line", display: "↕", style: "line-height: 2;" }
            ];
        } else {
            options = [
                { id: "add_new_element", display: "+", style: "align-items: left; justify-content: left" },
                { id: "left_align", display: "🗑️", style: "display: none;" },
                ...options
            ]
        }

        options = [
            { id: "left_align", display: "🗑️", style: "display: none;" },
            ...options
        ]

        // window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "add_new_element", elementId: "component_0001"})'

        return `
        <div class="production_object_options" style="isolation: isolate;">
            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "make_editor_visible", elementId: "component_0001"})'
            '>e</div>
            
            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "", style: "display: none"})'
            '>🗑️</div>

            <div  line-height: 1" class="production_object_option" onclick='
                event.stopPropagation();
                window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "show_element_gallery", elementId: "component_0001"})'
            '>+</div>
            
            ${options.map(option => `
                <div style="${option.style} line-height: 1" class="production_object_option" onclick='
                    window.parent.postMessage({index: ${this.index}, location: "herosection:${elementId}",option: "", style: "${option.style}"})'
                '>${option.display}</div>
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
                elementStr += ` id="${element.id}"`;
            }

            if (element.id) {
                elementStr += ` contenteditable="true"`;
            }

            // Add classes
            if (element.classNames) {
                elementStr += ` class="production_container ${element.classNames}"`;
            }

            // Add style (assuming this.getStyle exists in the calling context)
            if (this.getStyle) {
                elementStr += ` style="${this.getStyle(element.id)}"`;
            }

            // Add onclick for interactive elements
            const clickableElements = ['button', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'header', 'a', 'nav'];
            if (clickableElements.includes(element.tag) && element.id && (element.id !== "main_container")) {
                const location = parentId ? `${parentId}:${element.id}` : element.id;
                elementStr += ` onclick='event.stopPropagation(); window.parent.postMessage({index: ${this.index}, location: "${location}", option: "setactiveelement"})'`;
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
        this.htmlMap = [
            [
                {
                    tag: "div",
                    id: "main_container",
                    classNames: "production_container _0001",
                    children: [
                        {
                            tag: "div",
                            id: "hero_image",
                            classNames: "production_container hero-image",
                            innerText: "",
                            children: [
                                {
                                    tag: "div",
                                    id: "hero_text",
                                    classNames: "production_container hero-text",
                                    innerText: "",
                                    children: [
                                        { tag: "h1", id: "hero_title", classNames: "production_container hero-title", innerText: "Welcome To Prometheus", children: [] },
                                        { tag: "div", id: "hero_subtitle", classNames: "production_container hero-subtitle", innerText: "Drag and Drop solution for your own sites", children: [] },
                                        { tag: "button", id: "hero_button", classNames: "production_container hero-button", innerText: "start", children: [] }
                                    ]
                                }
                            ]

                        }
                    ]
                }
            ]
            ,
            [
                {
                    "tag": "div",
                    "classNames": "production_container hero",
                    "id": "hero_section",
                    "children": [
                        {
                            "tag": "div",
                            "classNames": "production_container hero-content",
                            "id": "hero_content",
                            "children": [
                                {
                                    "tag": "h1",
                                    "classNames": "production_container",
                                    "id": "hero_header",
                                    "innerText": "Revolutionize Your Workflow",
                                    "attributes": {
                                        "contenteditable": "true",
                                        "onclick": `window.parent.postMessage({index: ${this.index}, location: 'herosection:hero_header', option: 'setactiveelement'})`
                                    },
                                    "children": []
                                },
                                {
                                    "tag": "p",
                                    "classNames": "production_container",
                                    "id": "hero_para",
                                    "innerText": "Boost productivity with our all-in-one solution. Seamless integration, powerful features, and intuitive design.",
                                    "attributes": {
                                        "contenteditable": "true",
                                        "onclick": `window.parent.postMessage({index: ${this.index}, location: 'herosection:hero_para', option: 'setactiveelement'})`
                                    },
                                    "children": []
                                },
                                {
                                    "tag": "button",
                                    "classNames": "production_container",
                                    "id": "hero_button",
                                    "innerText": "Get Started",
                                    "attributes": {
                                        "onclick": `window.parent.postMessage({index: ${this.index}, location: 'herosection:hero_button', option: 'setactiveelement'})`
                                    },
                                    "children": []
                                }
                            ]
                        },
                        {
                            "tag": "div",
                            "classNames": "production_container hero-image",
                            "id": "hero_image_div",
                            "children": [
                                {
                                    "tag": "img",
                                    "id": "hero_image",
                                    "src": "Components//UiImage.png",
                                    "alt": "Product Preview",
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        ]
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

    handleOptionSelect(data) {






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




    getToolbar() {
        // const handleMessage = (data) => {
        //     window.parent.postMessage(data, "*");
        // };
        // const sendToolbarAction = (style) => {
        //     handleMessage({ index: this.index, location: ("herosection:" + this.focusElement), option: "default_order_2:default_order_2", style: style });
        // };


        return <>
            <div className="text_toolbar">
                <div class="toolbar" style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    padding: '10px',
                    gap: '8px',
                    alignItems: 'center',
                    height: "2vh"
                }}>
                    Welcome To Qreate
                </div>
            </div>
            {/* {JSON.stringify(this)} */}

        </>
    }
}

export { Text2, Element, HeroSection };