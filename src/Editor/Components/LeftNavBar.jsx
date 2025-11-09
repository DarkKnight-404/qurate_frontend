import React, { useEffect, useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import GlobalVariables from '../GlobalVariables.jsx';
import { HeroSection } from '../Elements.jsx';

import ComputerIcon from '@mui/icons-material/Computer';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import { useNavigate } from 'react-router-dom';

function LeftNavBar({ initialCompId, updateDeployPopupVisibility, updateHtmlDeploymentStr }) {



  let [optionSelected, setOptionSelected] = React.useState(null);
  let { canvas, setIsAiVisible } = useContext(GlobalVariables);
  let [addSubOption, setAddSubOption] = React.useState(null);

  const navigate = useNavigate();






  const templatesData = [
    { id: "headersection", name: "Header Section" },
    { id: "herosection", name: "Hero Section" },
    { id: "gallerysection", name: "Gallery Section" },
    { id: "aboutus", name: "About Us" },
    { id: "portfolio", name: "Portfolio" },
    { id: "blog", name: "Blog" },
    { id: "stats", name: "Stats" },
    { id: "faq", name: "FAQ " },
    { id: "servicessection", name: "Service Section" }
  ];
  let [heroSection, updateHeroSection] = useState([]);


  let [elementsData, updateElementsData] = useState({
    "header_section": [],
    "headersection": [],
    "herosection": [],
    "servicessection": [],
    "gallerysection": [],
    "portfolio": [],
    "faq": [],
    "blog": [],
    "stats": [],
    "aboutus": [],
  });


  useEffect(() => {
    console.log("element data updated");
    console.log(elementsData);
  }, [elementsData])


  useEffect(() => {
    // alert(initialCompId)
    console.log("initialcompid in leftnavbar is " + initialCompId);


    async function operateRequest() {
      if (initialCompId!==undefined) {
        try {
          // ✅ Use fetch instead of XMLHttpRequest
          const res = await fetch(
            "https://qurate-backend.vercel.app/getcomponent/?id="+initialCompId,
            {
              method: "GET",
              credentials: "include"   // IMPORTANT
            }
          );
          const htmlElementMap = await res.json();

          const heroSection = new HeroSection(
            {
              tag: "div",
              id: "main_container",
              uid: htmlElementMap.id,
              classNames: `production_container ${htmlElementMap.id}`,
              children: [...htmlElementMap.htmlMap],
            }
          );

          let style = htmlElementMap.style;

          // ✅ Rename class function
          function renameClass(cssString, oldClass, newClass) {
            const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            // Match .oldClass when it's part of a selector (before { or , or : or space)
            const regex = new RegExp(`\\.${escapedOldClass}(?=[\\s\\.{:#>\\[,]|\\{|$)`, "g");

            return cssString.replace(regex, `.${newClass}`);
          }

          function renameId(cssString, oldId, newId) {
            // Escape special characters in the old ID
            const escapedOldId = oldId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            // Match #oldId when it's part of a selector (before { or , or : or space)
            const regex = new RegExp(`#${escapedOldId}(?=[\\s\\.{:#>\\[,]|\\{|$)`, "g");

            return cssString.replace(regex, `#${newId}`);
          }

          // ✅ Recursive class renamer
          function unifyIds() {
            console.log("class names for root");
            console.log(htmlElementMap.htmlMap[0].classNames)
            let finalStyle = style;

            let rootClassNames = htmlElementMap.htmlMap[0].classNames.split(" ");
            for (let i = 0; i < rootClassNames.length; i++) {
              if (rootClassNames[i] !== "production_container") {
                finalStyle = renameClass(finalStyle, rootClassNames[i], rootClassNames[i] + htmlElementMap.id);
              }
            }

            function updateIds(element) {
              if (!element || !element.children?.length) return;

              element.children.forEach((child) => {

                finalStyle = renameId(
                  finalStyle,
                  child.id,
                  child.id + htmlElementMap.id
                );

                child.classNames.split(" ").forEach((className) => {
                  if (className !== "production_container") {
                    finalStyle = renameClass(
                      finalStyle,
                      className,
                      className + htmlElementMap.id
                    );
                  }
                });
                updateIds(child);
              });
            }

            updateIds(htmlElementMap.htmlMap[0]);
            return finalStyle;
          }

          // ✅ Wait for recursion (even though it’s sync)
          let styleUid = unifyIds();
          styleUid = styleUid.trim();
          if (styleUid.startsWith("{")) styleUid = styleUid.slice(1);
          if (styleUid.endsWith("}")) styleUid = styleUid.slice(0, -1);

          console.log("final style is", styleUid);


          // ✅ Add to canvas after style is ready
          canvas.addElement(heroSection);
          canvas.addElementStyle(styleUid);
          // heroSection.assignClass(val.id);

          setOptionSelected(null);
        } catch (err) {
          console.error("Error loading component:", err);
        }
      }
    }

    operateRequest();

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCompId])

  return (
    <div style={{ zIndex: "1000", paddingTop: "30px", width: (optionSelected != null ? '600px' : '20px'), backgroundColor: '#f0f0f0', height: '100vh', position: 'fixed', padding: '10px', display: 'flex', flexDirection: 'row', gap: '20px', overflow: 'hidden', transition: 'width 0.3s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '20px' }}>


        <img style={{ width: "30px" }} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtAMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwUBBgcEAgj/xAA5EAABAwMBBgQDBgYCAwAAAAABAAIDBAUREgYhMUFRgRMyYXEUIpEHI0JSYqEVM1NywdGS8CU1Q//EABsBAQACAwEBAAAAAAAAAAAAAAAEBQECAwYH/8QAMBEBAAIBAgQEBAUFAQAAAAAAAAECAwQREiExQQUTIlEygZGxI6HR4fAUFWFxwST/2gAMAwEAAhEDEQA/AO4N4BBlAQEBAQEBAQEBAQEBBjKBqCADlBlAQEBAQRS+bsgkbwCDKAgICAgICAgICAgjlmZDG6SVzWMaMlzjgALMRMztDMRMztDTrz9o1sotTKCN1a8fiB0R/wDI7z2BVlh8Ly3je/pj81li8Ly2jiyTwx+app9qtpbuQ6l/h9BCf/pNn9hvJ+ixm/t+m5ZLTMu86PT4+1rS2K2ipeQ6r2n8Z5/BDCyNv75Kr7a3S25Y4iPmh5a7fDi2+rZYtzRh5ePzHmtOKJ5whT1SLLAgICAgil83ZBI3gEGUBAQEBAQEBAQEFNtJtFR7P03i1TtUj8+FC3zP/wBD1UjT6a+ottX69nfBp757bVcf2h2luF+qAKl2W5+7poz8jfU9T6lX+LDg0dZn6zK+w48Wm9OON7e76t9DHCRJVFr5eODwavO6/wAVy5/Rj5R90qMc9bc5XsMzPzZ9t689elmLVlsVqt4rRmCqp8/lydX0wuddHOXpMK7PqPK+Ksr+ktdXSfy6poHTBwpGPQajFO9Mm3yV+TU4snWq2iL9I8TTq/TwVrTj29fVDnbfk+1uwICAgil83ZBI3gEGUBAQEBBguAGSQB1KbiJtVTuOls8ZPQPC0jJSektuC3slyt2pkIKHa3aWm2doxI/ElTICIYAfMep6AKTptNbUW2jo64sM5LbQ4feLxU3CskqKuV0tVL5jyaOQA5ey9FWtMNeCnKFpOauKPLx/z90VHJ4AyM+I7i7mFRavUefO0fDH83XGk08Yq73+KVjBUDILg491AtjmeiTM7rWmrI24y1/7KLfSXnpLhaN2yWRornYpZGeMN4Y5+l3br2UHLoc++8fdA1GSMfxxOzdbdUVUYEVfE8dJDv8Aqu+nz5qTwZq/P9VLmpjn1Y5+S0yFZIrKAgICCKXzdkEjeAQZQEBAQYKDTdobs+asfTxuIhiOk4PmPNU2tzWvfgjpC60WmitIvMc5U/igDcRnkoUUjsn7PZRXqqoSBHIXx/03nI7dFJxZ8uPpO8I2bR48nbmuK3bO20dqlrJtQlYMNp/xPdyA/wC7leaP/wBduGvKe6pzaS+K209PdxW+3qqudZJXVz9c8h+UDg1vIDoF6rHSmGnDRv5kYq7Qq6Uhzi4uBd0J3qv12a0RwV7p3heKL282/bp+r2A4VS9BsniqNJ8qNdlpQysmlZGCGOccAvcAM+/JZ3aXjhjdePoK2iIdUQTQ43tfpIx6ghZjaUaubFkjasxLd9mNojU6aSvd97wZL+f0PqtLVU2t0Pl/iY+jagd612VbKAgICCKXzdkEjeAQZQEBAQVm0Fwkt9CHwRuknkeI4mtbklx9Oy55bTWvLqkabDXLfa07RHVzm70l8oozU1dK+KNxyXgtcBnmcZwoH9NMRvK+w6jT5J4KT/P8KZl2nZxIcP1DeseTWeiXwPSbzSiB0sj9AaN7TxPt1WcWjyZb8FI3lwzXrhpx3nk1K53KSvmdNMdLG+RudzQvZaLSU0eLgr17z7vO59XOW/FPRTSSmV+rf6Dou8zvKFfJvvMvGSYpSXDPP1XK0SttPkrem8LSjk1tzG84zvBKjXxUnrCfjz3r8MrWkgEszI3ysiDjjXJnS33xwHqol9PEc6pldbO3qhcV1juNqOK6kexh8sgOqNw9HDcoiRh1OLP8Fvl3+jbdh9pX0j2W24ya6WT5YnvOfCPQ/pRXeI6DjjzccbTHWPdu1Xs/bqkl3gCKTiHw/Kf9JEypcetzY++8f5WFJHLFC1k0niPbu14xn39Vq4XmJtMxGydGogICCKXzdkEjeAQZQEBAQfLmNcWlzQS05aSOBQRVMENRBJTzsD4pGlr2nmDxCMxM1neH57v7amx3erttQ3W6B+GPO7Wzi13cY75U/H4djy1i9Z2j7Jf9/wAuP03pEz7qaWofKdcj8gfRWmDBjwRtRWZ9bl1N+K8/J4Jp/E+VudC2m2/Jy4pSRREgHGVmEadREX2no+5qfxIyPxDePRbTXihdYN8c7w+LU/8Ah11jlrIC+OJ4E8Lgd7PxD3xvHZRL+qu0LHrG9XSdpNkJrI4VNK51Tbn72S8Swcg7/fNQseeL8p6s4M8ZPTPVuH2d3IVluktVXh7qcfJrGdUZ5dv8hR89OGd4RtZi4LRkq9F32It9TqfbwKSU8WNH3bu3LsuG7vp/FsuPlk9UfmtdnH1rKX4O5sIqafDdeciVvJwPNJRNXGKb8eGfTP5LlYRRAQEBBFL5uyCRvAIMoCAgICAg5/8AapsZNf6ZlytLM3KmaQYxu+Ij/L/cN+Pcjopmk1PlTtPSXHLji8buDO8bxDHI2TxGnBa5pBB6EK1m8RG8yj1x2mdq1/J66OkLntEm7JwAo39VXzIpCxzeFZ8ejvnvymI3iO+3dZx0+l7oebd/1UrHki17U9nn9Tgtj0+PP2tvHzhNVwsdpliIwRh3uFy0OfebY7dnuL6XbDjyx3iPrsvtpLNFV2W1bQ0TctlhbT1mOIlYNIcffGD7Dqo8X4clsftPJxw747zjt/uP9S7Bs7ip2at4mYHh1KxrmkZB+XCrb8rzsrsu9ck7KJtjOz+0FNWUQPwMz/De3+nq3Ae2V0m/HTaUvzozYprfrDcxwXBAZQEBAQEBBFL5uyCRvAIMoCAgICAgINb2j2Ls+0DjLVU/hVOMfEQHS8+/J3dN5S9Nrc2n+CeTnN8+y+824+PaJY7hG1wPh+STd6Hcfr2W1bbTutq+KYc1LY80bb8veGpTvkp75OKuKSDJILJWlpAHDcfZSsOoiubjlD1PhcZPBq6ak7zXbaY9+/3eOhqXNkMT3ZbIc7+RXLFltS8X+b0kY68Hl9ujqH2btZc7beLFUk+G9rZGfpJyCR7ENK31F9803qpfFMc4fKyx/r6Oi2SnfSWijppBh8ULGuA5EAZUe072mVHktxWmz2PYHjDgCPVatH0gICAgICAgil83ZBI3gEGUBAQEBAQEBBgjKDWNvqCxTWSeqv8ATteyBhMcjTpkDjwDXepxu4LfHjnJaKw6U1l9L66zs/O3zANznhxXbPgthnn0ek8O8Txa2m9eVo6w6d9k1SXbQs3/AM6lcD+x/wALlbnVt4x6tLE+0uxALm8qygICAgICAgIIpfN2QSN4BBlAQEBAQEBAQQ1dTDSU76iplZFEwZc95wAFmKzadoa2tFY3mXE9t9oqrayt8KijlNBTAuZG0bz1kd04c+HdXWnwVwV9XxSps+onPPp6Q1H4fWCzHLKk5cUZaTWWuk1ttJmjNXt9u7d/sdic++xux/Kgk1fUBefneK7S+i+K3idHEx3mP+u0rm8uICAgICAgICCKXzdkEjeAQZQEBAQEBAQfErntjcY2a3Abm5xlGJ325NYuWzVXfpQb5XuZStOWUlLuaP7nHifXHthS6aiuGPw45+8oV9NfNP4tuXtH/WubVQwxiPZXZWiGqQg1fhDeQOAc4/Uknp1UnT7z+Pnnl2/ZG1Mxv/T4I591TetlhbTbbTS4qLlU5kneOpwGtHRo+cn6qRp9Rx8WW3SOiNqcPlzTDXnaf59GxfZdZhQ1F3qgS6IVDqaF5HmDXHU4ehOPoqfJbil7XX34dPgwd4rEz9OToK5qoQEBAQEBAQEEUvm7IJG8AgygICAgICAgIIKyOaWAsp5RE927xCMlo6gdfdZrtE843a3i0xtV5bZaqO0QvFNGQXnVLK86nyHqTzW+TLfJ1c8WGmKNo/eVfT22c1NXeHRg3CZuinY8boW8Bn9iV0yZfRGKvSPu5afBE5vOy9+3tH6ytLTborVb4KKDJZC0N1OO9x5uPqTvXCZ3T82W2W83t3e1YcxAQEBAQEBAQRS+bsgkbwCDKAgICD5DweG9BgyNBAcQD0JQZLw3iQPcoMGRoGcjHXKB4rcZ1N+qA5wGMnGdyBkAHO7nvKA2Vrs6SDjoUASNLtIIJ6AoM6hpJ3YHqgat+EAOBOAg+kBAQEBBFL5uyCRvAIMoCAgFBqewTgIr0C4f+4qd2eHzIKXZyyWfaShudy2kYyouPxtRHNJLIWuog1xDWsOfu8NDTkYzx5oNZZUG6T7LzXa01N/aLZVlsTA0vlY2RgZKQ4jJLem/egx4Hx9ltUtLQsqLVXbQa6C2z1e5kYp3gsc7fo+YE6eXBGVlfdn44dnH0j7LT2RtbdKGB7qGs8V0jTJpznSNJGo448UYRbT0u1FRQ0x2jl8Kns9fSxQvhfj+IPdK1vjOHIBp4fmJQb1th/KnwM/+IrsAc90aD0GmjNXTuora6iLH6pJ9DIwGYORuO/O7iggpaVlrgpTV2+CTw3MZ8bAfncSQ0Odn5t5IzvPHmg+5XhuyFyJdjTFVgnPA6noPlramkuVxrqGF9Q4zNjlpwca/u26XDPAgneehPHAQenZ2lfS1FyZPJ4tQ+Zkk0nJzzG3OByHIDoEF2gICAgIIpfN2QSN4BBlAQEGDwQa/NsVs1UVclVNZaV88sniPkLd5dxz7oJLjsjYLpVPq661QSzyACRxGPExw1AebugsRbKIVcFW2ljE9PEYYnhuCxhxlo6DcPogr6vZOw1sc0dXaqaWOaf4iRjmfK6XBGvHDOCUHxQ7HbPW9j46G000DXyxyuDG4BfGSWH3BJwgtLhQU1ygEFdA2aIPa8McN2ppBaexAQfVVRU9WHCoibIHRPiOofgfjUO+Ag9BGQgr4bRQxOj0U+GxkGNmo6WkcMNzgYQfb7XRySukdACXPD3DJ0ucOZHAlB6Y4WRve9rAHSHU8jmcY/wABBiOFkcsj2Nw6QgvPUgYH7AIJkBAQEBBFL5uyCRvAIMoCAgICAgICAgICAgICAgICAgICAgil83ZBI3gEGUBAQEBAQEBAQEBAQEBAQEBAQEBAQRS+bsgkbwCDKAgICAgICAgICAgICAgICAgICAgIIpfN2Qf/2Q==" alt="" />

        <div style={{ marginTop: "100px" }} onClick={() => {
          setOptionSelected((prev) => {
            if (prev === "add") {
              return null;
            }
            return "add";
          });
        }} >
          <AddCircleOutlineIcon style={{ cursor: 'pointer', fontSize: '30px', color: '#555' }} />
        </div>
        <AutoAwesomeIcon style={{ cursor: "pointer" }}
          onClick={() => {
            setIsAiVisible(true);
          }}
        ></AutoAwesomeIcon>


        <SearchIcon style={{ cursor: 'pointer', fontSize: '30px', color: '#555' }} />

        <div>
          <ComputerIcon style={{ color: "black" }} />
        </div>
        <div>
          <MobileScreenShareIcon style={{ color: "black" }} />
        </div>
        <div>
          <MobileScreenShareIcon style={{ color: "black" }} onClick={() => { navigate("/dashboard") }} />
        </div>

        <div style={{ marginTop: "100px" }} onClick={() => {
          let str = canvas.genProductionHtml();
          console.log(str);
          // navigator.clipboard.writeText(str);
          updateHtmlDeploymentStr(str);
          updateDeployPopupVisibility(true);
        }} >
          <AddCircleOutlineIcon style={{ cursor: 'pointer', fontSize: '30px', color: '#555' }} />
        </div>

      </div>


      {/* left section options are here below */}
      <div style={{ width: 'fit-content', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'width 0.3s ease' }}>
        <div style={{ marginTop: '20px', textAlign: 'center', color: '#555', width: '100%', minWidth: '100%' }}>


          {templatesData.map((data, ind) => {
            return <div onClick={() => {
              // canvas.addElement(new Text("Hello World"));
              // canvas.addElement(new Text("Hello World2"));
              // updateHtmlStr(canvas.getString());
              // setOptionSelected(null);

              if (elementsData[data.id].length === 0) {
                let xml = new XMLHttpRequest();
                xml.open("GET", `https://qurate-backend.vercel.app/getComponentTemplates/?category=${data.id}`);
                xml.withCredentials = true;
                xml.send();
                xml.onload = () => {
                  updateHeroSection(JSON.parse(xml.response));
                  updateElementsData((prev) => {
                    let newElementsData = { ...prev };
                    newElementsData[data.id] = JSON.parse(xml.response);
                    return newElementsData;
                  })
                }
              }

              setAddSubOption((prev) => {
                if (prev === data.id) {
                  return null;
                }
                return data.id;
              });
            }} style={{ cursor: "pointer", border: "1px solid #ccc", padding: "5px 10px", borderRadius: "5px", width: "100%" }}>
              {data.name}
            </div>
          })}



        </div>
      </div>

      {/* let section rendered components which are loaded at click are rendered here below */}
      <div style={{ flex: 1, overflowY: "auto" }}>


        {templatesData.map((data, ind) => {
          return <div style={{ width: (addSubOption === data.id ? '100%' : '0px'), display: (addSubOption === data.id ? '' : 'none'), overflow: 'hidden', transition: 'all 1s ease', paddingBottom: "50px" }}>

            <h2 style={{ fontFamily: "Times New Roman", textAlign: "center" }}>Hero Section</h2>

            {/* {JSON.stringify(elementsData[data.id])} */}

            {elementsData[data.id].length === 0
              ? "loading"
              : elementsData[data.id].map((val) => (
                <div
                  key={val.id}
                  onClick={async () => {
                    try {
                      // ✅ Use fetch instead of XMLHttpRequest
                      const res = await fetch(
                        "https://qurate-backend.vercel.app/getcomponent/?id=" + val.id,
                        {
                          method: "GET",
                          credentials: "include"   // IMPORTANT
                        }
                      );
                      const htmlElementMap = await res.json();

                      const heroSection = new HeroSection(
                        {
                          tag: "div",
                          id: "main_container",
                          uid: htmlElementMap.id,
                          classNames: `production_container ${htmlElementMap.id}`,
                          children: [...htmlElementMap.htmlMap],
                        },
                        val.initialStyle
                      );

                      let style = htmlElementMap.style;

                      // ✅ Rename class function
                      function renameClass(cssString, oldClass, newClass) {
                        const escapedOldClass = oldClass.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                        // Match .oldClass when it's part of a selector (before { or , or : or space)
                        const regex = new RegExp(`\\.${escapedOldClass}(?=[\\s\\.{:#>\\[,]|\\{|$)`, "g");

                        return cssString.replace(regex, `.${newClass}`);
                      }

                      function renameId(cssString, oldId, newId) {
                        // Escape special characters in the old ID
                        const escapedOldId = oldId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                        // Match #oldId when it's part of a selector (before { or , or : or space)
                        const regex = new RegExp(`#${escapedOldId}(?=[\\s\\.{:#>\\[,]|\\{|$)`, "g");

                        return cssString.replace(regex, `#${newId}`);
                      }

                      // ✅ Recursive class renamer
                      function unifyIds() {
                        console.log("class names for root");
                        console.log(htmlElementMap.htmlMap[0].classNames)
                        let finalStyle = style;

                        let rootClassNames = htmlElementMap.htmlMap[0].classNames.split(" ");
                        for (let i = 0; i < rootClassNames.length; i++) {
                          if (rootClassNames[i] !== "production_container") {
                            finalStyle = renameClass(finalStyle, rootClassNames[i], rootClassNames[i] + htmlElementMap.id);
                          }
                        }

                        function updateIds(element) {
                          if (!element || !element.children?.length) return;

                          element.children.forEach((child) => {

                            finalStyle = renameId(
                              finalStyle,
                              child.id,
                              child.id + htmlElementMap.id
                            );

                            child.classNames.split(" ").forEach((className) => {
                              if (className !== "production_container") {
                                finalStyle = renameClass(
                                  finalStyle,
                                  className,
                                  className + htmlElementMap.id
                                );
                              }
                            });
                            updateIds(child);
                          });
                        }

                        updateIds(htmlElementMap.htmlMap[0]);
                        return finalStyle;
                      }

                      // ✅ Wait for recursion (even though it’s sync)
                      let styleUid = unifyIds();
                      styleUid = styleUid.trim();
                      if (styleUid.startsWith("{")) styleUid = styleUid.slice(1);
                      if (styleUid.endsWith("}")) styleUid = styleUid.slice(0, -1);

                      console.log("final style is", styleUid);


                      // ✅ Add to canvas after style is ready
                      canvas.addElement(heroSection);
                      canvas.addElementStyle(styleUid);
                      heroSection.assignClass(val.id);

                      setOptionSelected(null);
                    } catch (err) {
                      console.error("Error loading component:", err);
                    }
                  }}
                  style={{
                    borderBottom: "2px solid",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    paddingTop: "10px",
                    width: "100%",
                    textAlign: "center",
                    fontStyle: "italic",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingBottom: "20px",
                  }}
                >
                  {heroSection ? "" : ""}
                  {val.name}
                  {val.img ? (
                    <img
                      src={val.img.includes("http") ? val.img : "Components//" + val.img}
                      alt=""
                      style={{ width: "90%", margin: "auto" }}
                    />
                  ) : null}
                </div>
              ))}


          </div>
        })}



      </div>
    </div >
  )
}

export default LeftNavBar
