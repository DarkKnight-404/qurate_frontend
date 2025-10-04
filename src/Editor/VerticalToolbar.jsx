import React, { useContext, useState } from 'react';
// import './VerticalToolbar.css';
import GlobalVariables from './GlobalVariables.jsx';


const VerticalToolbar = ({ onStyleChange }) => {
    const [expandedSections, setExpandedSections] = useState({
        text: true,
        sizing: true,
        borders: true,
        shadow: true,
        layout: true
    });

    const [borderWidth, setBorderWidth] = useState('1');
    const [borderStyle, setBorderStyle] = useState('solid');
    const [borderColor, setBorderColor] = useState('#000000');
    const [shadowType, setShadowType] = useState('');
    const [shadowX, setShadowX] = useState(0);
    const [shadowY, setShadowY] = useState(0);
    const [shadowBlur, setShadowBlur] = useState(5);
    const [shadowSpread, setShadowSpread] = useState(0);
    const [shadowColor, setShadowColor] = useState('#000000');
    const [textColor, setTextColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fontFamily, setFontFamily] = useState('');
    const [fontSize, setFontSize] = useState('');

    let { activeElement, setVerScrollVisStatus } = useContext(GlobalVariables);

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const applyStyle = (styleString) => {
        if (onStyleChange && styleString) {
            onStyleChange(styleString);
        }
        window.parent.postMessage({ index: activeElement.index, location: ("herosection:" + activeElement.focusElement), option: "default_order_2:default_order_2", style: styleString });
    };

    const applyBorder = () => {
        applyStyle(`border: ${borderWidth}px ${borderStyle} ${borderColor}`);
    };

    const applyShadow = () => {
        applyStyle(
            `box-shadow: ${shadowType ? shadowType + ' ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
        );
    };

    const handleFontChange = (family) => {
        setFontFamily(family);
        applyStyle(`font-family: ${family}`);
    };

    const handleSizeChange = (size) => {
        setFontSize(size);
        applyStyle(`font-size: ${size}px`);
    };

    const handleTextColorChange = (color) => {
        setTextColor(color);
        applyStyle(`color: ${color}`);
    };

    const handleBgColorChange = (color) => {
        setBgColor(color);
        applyStyle(`background: ${color}`);
    };

    return (
        <div className="toolbar-container">
            <div className="toolbar-header">
                <span><i className="fas fa-paint-brush section-icon"></i> Editor Tools</span>
                <span style={{cursor: "pointer"}} onClick={()=>{setVerScrollVisStatus(false)}}>X</span>
            </div>

            <div className="search-box">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search tools..." />
            </div>

            <div className="toolbar-content">
                {/* Text Formatting Section */}
                <div className="toolbar-section">
                    <div
                        className="section-header"
                        onClick={() => toggleSection('text')}
                    >
                        <span><i className="fas fa-font section-icon"></i> Text Formatting</span>
                        <span>{expandedSections.text ? '▼' : '►'}</span>
                    </div>
                    {expandedSections.text && (
                        <div className="section-content">
                            <select
                                value={fontFamily}
                                onChange={e => handleFontChange(e.target.value)}
                            >
                                <option value="">Font Family</option>
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Times">Times</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Courier">Courier</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Palatino">Palatino</option>
                                <option value="Garamond">Garamond</option>
                                <option value="Bookman">Bookman</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="Trebuchet MS">Trebuchet MS</option>
                                <option value="Arial Black">Arial Black</option>
                                <option value="Impact">Impact</option>
                                <option value="Tahoma">Tahoma</option>
                                <option value="Geneva">Geneva</option>
                                <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                                <option value="Lucida Grande">Lucida Grande</option>
                                <option value="MS Sans Serif">MS Sans Serif</option>
                                <option value="MS Serif">MS Serif</option>
                                <option value="Symbol">Symbol</option>
                                <option value="Webdings">Webdings</option>
                                <option value="Wingdings">Wingdings</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Andale Mono">Andale Mono</option>
                                <option value="Consolas">Consolas</option>
                                <option value="Liberation Mono">Liberation Mono</option>
                                <option value="DejaVu Sans Mono">DejaVu Sans Mono</option>
                                <option value="Bitstream Vera Sans Mono">Bitstream Vera Sans Mono</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Open Sans">Open Sans</option>
                                <option value="Lato">Lato</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Raleway">Raleway</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Source Sans Pro">Source Sans Pro</option>
                                <option value="Oswald">Oswald</option>
                                <option value="Slabo 27px">Slabo 27px</option>
                                <option value="Merriweather">Merriweather</option>
                                <option value="Playfair Display">Playfair Display</option>
                                <option value="PT Sans">PT Sans</option>
                                <option value="Ubuntu">Ubuntu</option>
                                <option value="Nunito">Nunito</option>
                                <option value="Fira Sans">Fira Sans</option>
                                <option value="Noto Sans">Noto Sans</option>
                                <option value="Quicksand">Quicksand</option>
                                <option value="Rubik">Rubik</option>
                                <option value="Mukta">Mukta</option>
                                <option value="Arimo">Arimo</option>
                                <option value="Dosis">Dosis</option>
                                <option value="Work Sans">Work Sans</option>
                                <option value="Cabin">Cabin</option>
                                <option value="Karla">Karla</option>
                                <option value="Josefin Sans">Josefin Sans</option>
                                <option value="Inconsolata">Inconsolata</option>
                                <option value="Space Mono">Space Mono</option>
                                <option value="Cousine">Cousine</option>
                                <option value="Roboto Mono">Roboto Mono</option>
                                <option value="Fira Code">Fira Code</option>
                                <option value="Source Code Pro">Source Code Pro</option>
                                <option value="IBM Plex Mono">IBM Plex Mono</option>
                                <option value="Hack">Hack</option>
                                <option value="JetBrains Mono">JetBrains Mono</option>
                                <option value="Cascadia Code">Cascadia Code</option>
                                <option value="Anonymous Pro">Anonymous Pro</option>
                                <option value="Red Hat Mono">Red Hat Mono</option>
                                <option value="B612 Mono">B612 Mono</option>
                                <option value="Overpass Mono">Overpass Mono</option>
                                <option value="DM Mono">DM Mono</option>
                                <option value="PT Mono">PT Mono</option>
                                <option value="Nova Mono">Nova Mono</option>
                                <option value="Share Tech Mono">Share Tech Mono</option>
                                <option value="Major Mono Display">Major Mono Display</option>
                                <option value="Syne Mono">Syne Mono</option>
                                <option value="Chivo Mono">Chivo Mono</option>
                                <option value="Sometype Mono">Sometype Mono</option>
                                <option value="Geist Mono">Geist Mono</option>
                                <option value="Fragment Mono">Fragment Mono</option>
                            </select>

                            <select
                                value={fontSize}
                                onChange={e => handleSizeChange(e.target.value)}
                            >
                                <option value="">Font Size</option>
                                <option value="12">12px</option>
                                <option value="14">14px</option>
                                <option value="18">18px</option>
                                <option value="24">24px</option>
                            </select>

                            <div className="tool-group">
                                <button onClick={() => applyStyle("font-weight: bold")} title="Bold"><b>B</b></button>
                                <button onClick={() => applyStyle("font-style: italic")} title="Italic"><i>I</i></button>
                                <button onClick={() => applyStyle("text-decoration: underline")} title="Underline"><u>U</u></button>
                                <button onClick={() => applyStyle("text-decoration: line-through")} title="Strikethrough"><s>S</s></button>
                            </div>

                            <div className="compact-control">
                                <label>Text Color:</label>
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={e => handleTextColorChange(e.target.value)}
                                />
                            </div>

                            <div className="compact-control">
                                <label>BG Color:</label>
                                <input
                                    type="color"
                                    value={bgColor}
                                    onChange={e => handleBgColorChange(e.target.value)}
                                />
                            </div>

                            <div className="compact-control">
                                <label>Alignment:</label>
                                <button onClick={() => applyStyle("text-align: left")} title="Align Left">
                                    <i className="fas fa-align-left"></i>
                                </button>
                                <button onClick={() => applyStyle("text-align: center")} title="Center">
                                    <i className="fas fa-align-center"></i>
                                </button>
                                <button onClick={() => applyStyle("text-align: right")} title="Align Right">
                                    <i className="fas fa-align-right"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sizing Section */}
                <div className="toolbar-section">
                    <div
                        className="section-header"
                        onClick={() => toggleSection('sizing')}
                    >
                        <span><i className="fas fa-expand section-icon"></i> Sizing</span>
                        <span>{expandedSections.sizing ? '▼' : '►'}</span>
                    </div>
                    {expandedSections.sizing && (
                        <div className="section-content">
                            <div className="compact-control">
                                <label>Width:</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    onChange={e => applyStyle(`width: ${e.target.value}vw`)}
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="vw"
                                    onChange={e => applyStyle(`width: ${e.target.value}vw`)}
                                />
                            </div>

                            <div className="compact-control">
                                <label>Height:</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    onChange={e => applyStyle(`height: ${e.target.value}vh`)}
                                />
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="vh"
                                    onChange={e => applyStyle(`height: ${e.target.value}vh`)}
                                />
                            </div>

                            <div className="compact-control">
                                <label>Min-W:</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="px"
                                    onChange={e => applyStyle(`min-width: ${e.target.value}px`)}
                                />
                                <label>Max-W:</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="px"
                                    onChange={e => applyStyle(`max-width: ${e.target.value}px`)}
                                />
                            </div>

                            <div className="compact-control">
                                <label>Min-H:</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="px"
                                    onChange={e => applyStyle(`min-height: ${e.target.value}px`)}
                                />
                                <label>Max-H:</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="px"
                                    onChange={e => applyStyle(`max-height: ${e.target.value}px`)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Borders Section */}
                <div className="toolbar-section">
                    <div
                        className="section-header"
                        onClick={() => toggleSection('borders')}
                    >
                        <span><i className="fas fa-border-style section-icon"></i> Borders</span>
                        <span>{expandedSections.borders ? '▼' : '►'}</span>
                    </div>
                    {expandedSections.borders && (
                        <div className="section-content">
                            <div className="compact-control">
                                <label>Width:</label>
                                <input
                                    type="number"
                                    value={borderWidth}
                                    onChange={e => setBorderWidth(e.target.value)}
                                    min="0"
                                    max="20"
                                    placeholder="px"
                                />
                            </div>

                            <div className="compact-control">
                                <label>Style:</label>
                                <select
                                    value={borderStyle}
                                    onChange={e => setBorderStyle(e.target.value)}
                                >
                                    <option value="solid">Solid</option>
                                    <option value="dashed">Dashed</option>
                                    <option value="dotted">Dotted</option>
                                    <option value="double">Double</option>
                                    <option value="groove">Groove</option>
                                </select>
                            </div>

                            <div className="compact-control">
                                <label>Color:</label>
                                <input
                                    type="color"
                                    value={borderColor}
                                    onChange={e => setBorderColor(e.target.value)}
                                />
                            </div>

                            <div className="compact-control">
                                <label>Radius:</label>
                                <select onChange={e => applyStyle(`border-radius: ${e.target.value}px`)}>
                                    <option value="0">Sharp</option>
                                    <option value="4">Slight</option>
                                    <option value="8">Rounded</option>
                                    <option value="50">Circle</option>
                                </select>
                            </div>

                            <button className="apply-button" onClick={applyBorder}>Apply Border</button>
                        </div>
                    )}
                </div>

                {/* Shadow Section */}
                <div className="toolbar-section">
                    <div
                        className="section-header"
                        onClick={() => toggleSection('shadow')}
                    >
                        <span><i className="fas fa-box section-icon"></i> Shadow</span>
                        <span>{expandedSections.shadow ? '▼' : '►'}</span>
                    </div>
                    {expandedSections.shadow && (
                        <div className="section-content">
                            <div className="compact-control">
                                <label>Type:</label>
                                <select
                                    value={shadowType}
                                    onChange={e => setShadowType(e.target.value)}
                                >
                                    <option value="">Outer</option>
                                    <option value="inset">Inner</option>
                                </select>
                            </div>

                            <div className="compact-control">
                                <label>X:</label>
                                <input
                                    type="range"
                                    value={shadowX}
                                    onChange={e => setShadowX(e.target.value)}
                                    min="-20"
                                    max="20"
                                />
                                <span>{shadowX}px</span>
                            </div>

                            <div className="compact-control">
                                <label>Y:</label>
                                <input
                                    type="range"
                                    value={shadowY}
                                    onChange={e => setShadowY(e.target.value)}
                                    min="-20"
                                    max="20"
                                />
                                <span>{shadowY}px</span>
                            </div>

                            <div className="compact-control">
                                <label>Blur:</label>
                                <input
                                    type="range"
                                    value={shadowBlur}
                                    onChange={e => setShadowBlur(e.target.value)}
                                    min="0"
                                    max="50"
                                />
                                <span>{shadowBlur}px</span>
                            </div>

                            <div className="compact-control">
                                <label>Spread:</label>
                                <input
                                    type="range"
                                    value={shadowSpread}
                                    onChange={e => setShadowSpread(e.target.value)}
                                    min="0"
                                    max="20"
                                />
                                <span>{shadowSpread}px</span>
                            </div>

                            <div className="compact-control">
                                <label>Color:</label>
                                <input
                                    type="color"
                                    value={shadowColor}
                                    onChange={e => setShadowColor(e.target.value)}
                                />
                            </div>

                            <button className="apply-button" onClick={applyShadow}>Apply Shadow</button>
                        </div>
                    )}
                </div>

                {/* Layout Section */}
                <div className="toolbar-section">
                    <div
                        className="section-header"
                        onClick={() => toggleSection('layout')}
                    >
                        <span><i className="fas fa-th section-icon"></i> Layout</span>
                        <span>{expandedSections.layout ? '▼' : '►'}</span>
                    </div>
                    {expandedSections.layout && (
                        <div className="section-content">
                            <div className="tool-group">
                                <button onClick={() => applyStyle("display: block")} title="Block">
                                    <i className="fas fa-square"></i>
                                </button>
                                <button onClick={() => applyStyle("display: flex")} title="Flex">
                                    <i className="fas fa-th"></i>
                                </button>
                                <button onClick={() => applyStyle("display: grid")} title="Grid">
                                    <i className="fas fa-th-large"></i>
                                </button>
                            </div>

                            <div className="compact-control">
                                <label>Float:</label>
                                <button onClick={() => applyStyle("float: left")} title="Float Left">
                                    <i className="fas fa-arrow-to-left"></i>
                                </button>
                                <button onClick={() => applyStyle("float: right")} title="Float Right">
                                    <i className="fas fa-arrow-to-right"></i>
                                </button>
                            </div>

                            <div className="compact-control">
                                <label>Spacing:</label>
                                <button onClick={() => applyStyle("margin: 10px")} title="Add Margin">M+</button>
                                <button onClick={() => applyStyle("margin: 0")} title="Remove Margin">M-</button>
                                <button onClick={() => applyStyle("padding: 10px")} title="Add Padding">P+</button>
                                <button onClick={() => applyStyle("padding: 0")} title="Remove Padding">P-</button>
                            </div>

                            <div className="compact-control">
                                <label>Flex Direction:</label>
                                <button onClick={() => applyStyle("flex-direction: row")} title="Row">→</button>
                                <button onClick={() => applyStyle("flex-direction: column")} title="Column">↓</button>
                            </div>

                            <div className="compact-control">
                                <label>Justify:</label>
                                <select onChange={e => applyStyle(`justify-content: ${e.target.value}`)}>
                                    <option value="flex-start">Start</option>
                                    <option value="center">Center</option>
                                    <option value="flex-end">End</option>
                                    <option value="space-between">Between</option>
                                    <option value="space-around">Around</option>
                                </select>
                            </div>

                            <div className="compact-control">
                                <label>Align:</label>
                                <select onChange={e => applyStyle(`align-items: ${e.target.value}`)}>
                                    <option value="flex-start">Start</option>
                                    <option value="center">Center</option>
                                    <option value="flex-end">End</option>
                                    <option value="stretch">Stretch</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerticalToolbar;