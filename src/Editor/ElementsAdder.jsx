import React, { useContext, useState } from 'react';
import GlobalVariables from './GlobalVariables.jsx';
// import { height, maxHeight, minHeight } from '@mui/system';


function ElementsAdder({ onClose, onElementSelect }) {
    const [selectedCategory, setSelectedCategory] = useState('intro');

    const { focusedElement, canvas } = useContext(GlobalVariables)

    // let {css} = useContext(GlobalVariables);

    // Sample elements data
    const [elements, updateElements] = useState({
        intro: [

        ],
        image: [

        ],
        textbox: [

        ],
        paragraph: [

        ],
        button: [

        ]
    });


    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        popup: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            width: '85%',
            maxWidth: '1000px',
            height: '75vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            overflow: 'hidden',
        },
        header: {
            padding: '18px 24px',
            backgroundColor: '#4a6fa5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
        },
        title: {
            margin: 0,
            fontSize: '20px',
            fontWeight: '600',
        },
        closeButton: {
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'background 0.2s',
            ':hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
            },
        },
        categories: {
            display: 'flex',
            overflowX: 'auto',
            padding: '14px 20px',
            backgroundColor: '#f5f7fa',
            gap: '10px',
            borderBottom: '1px solid #e0e4e9',
            scrollbarWidth: 'none', // Hide scrollbar in Firefox
            '::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar in Chrome/Safari
            },
        },
        categoryButton: {
            padding: '8px 18px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#e0e4e9',
            color: '#4a5568',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            flexShrink: 0, // Prevent buttons from shrinking
        },
        activeCategory: {
            backgroundColor: '#4a6fa5',
            color: 'white',
        },
        gallery: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '20px',
            padding: '24px',
            overflowY: 'auto',
            flex: 1,
        },
        elementCard: {
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
            border: '1px solid #e2e8f0',
            ':hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
            },
        },
        elementImage: {
            width: '100%',
            height: '140px',
            objectFit: 'cover',
            backgroundColor: '#f0f4f8',
        },
        elementName: {
            padding: '14px',
            color: '#2d3748',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',
            borderTop: '1px solid #edf2f7',
        },

    };

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Add New Element</h2>
                    <button
                        style={styles.closeButton}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div style={styles.categories}>
                    {Object.keys(elements).map(category => (
                        <button
                            key={category}
                            style={{
                                ...styles.categoryButton,
                                ...(selectedCategory === category ? styles.activeCategory : {})
                            }}
                            onClick={() => {
                                setSelectedCategory(category);
                                if (elements[(category.charAt(0).toUpperCase() + category.slice(1)).toLocaleLowerCase()].length === 0) {
                                    let xml = new XMLHttpRequest();
                                    xml.open("GET", (process.env.REACT_APP_BASE_URL + "/getelementadderoptions/?category=" + category.charAt(0).toUpperCase() + category.slice(1)));
                                    xml.send();
                                    xml.onload = () => {
                                        let data = JSON.parse(xml.response);
                                        console.log("data is as follows")
                                        console.log(data);
                                        elements[(category.charAt(0).toUpperCase() + category.slice(1)).toLocaleLowerCase()] = data;
                                        updateElements((prev) => {
                                            let updatedData = { ...prev };
                                            updatedData[(category.charAt(0).toUpperCase() + category.slice(1)).toLocaleLowerCase()] = data;

                                            return updatedData;
                                        })

                                    }
                                }

                            }}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

                <div style={styles.gallery}>
                    {elements[selectedCategory].map(element => (
                        <div
                            // key={element.id}
                            // style={styles.elementCard}
                            onClick={() => {
                                let xml = new XMLHttpRequest();
                                xml.open("GET", process.env.REACT_APP_BASE_URL + "/getelementadderbyid/?id=" + element.id);
                                xml.send();
                                xml.onload = async () => {
                                    console.log("data loaded successfully at element adder");
                                    // try {
                                    let data = JSON.parse(xml.response);
                                    let css = data.css;
                                    await canvas.addElementStyle('.' + element.id + css);
                                    console.log(css);
                                    console.log(canvas)
                                    window.parent.postMessage({ index: focusedElement.index, location: focusedElement.location, option: "add_new_element", elementId: element.id })
                                    onClose();
                                }

                            }}
                        >
                            <img
                                src={element.image}
                                alt={element.name}
                                style={styles.elementImage}
                            />
                            <div style={styles.elementName}>{element.name}</div>
                        </div>
                        // <div>{JSON.stringify(element)}</div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default ElementsAdder;