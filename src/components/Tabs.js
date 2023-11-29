import React, { useState, useEffect } from "react";
import { CiPizza } from "react-icons/ci";
import { GiFruitBowl, GiNoodles, GiCheckMark } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { fetchTabData } from "../service";

function Tabs(props) {
  const [active, setActive] = useState("Pizza");
  const [tabData, setTabData] = useState("");
  const [tabLabel, setTabLabel] = useState([
    {
      name: "Pizza",
      icons: <CiPizza />,
      id: "1b6dfeaf0988f96b187c7c9bb69a14fa",
    },
    {
      name: "Noodles",
      icons: <GiNoodles />,
      id: "77c41731c83b90e9800fc7189595494d",
    },
    {
      name: "Dessert",
      icons: <GiFruitBowl />,
      id: "dd4e837be97de03a05b94fc97957dac7",
    },
    {
      name: "Ice Cream",
      icons: <MdOutlineIcecream />,
      id: "480fd56ab4d71c204c2b75e16edbbd21",
    },
  ]);

  const handleClick = (name, id) => {
    setActive(name);
    fetchTabData(id).then((Response) => {
      setTabData(Response);
      props.setLoader(false);
    });
  };

  useEffect(() => {
    fetchTabData(tabLabel[0].id).then((Response) => {
      setTabData(Response);
      props.setLoader(false);
    });
  }, []);
  return (
    <div className="container">
      <h1 className="recipeHeading">What would you like to have!</h1>
      <div className="tabs">
        {tabLabel.map((item, index) => (
          <div
            onClick={() => (
              handleClick(item.name, item.id), props.setLoader(true)
            )}
            key={index}
            className={`tablist ${active === item.name ? "active" : ""}`}
          >
            {item.icons}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="recipe_banner">
        {tabData !== "" && (
          <>
            <div className="left-col">
              <span className="badge">
                {tabData.recipe.cuisineType[0].toUpperCase()}
              </span>
              <h1>{tabData.recipe.label}</h1>
              <p>
                <strong>Recipe by:</strong>
                <small>{tabData.recipe.source}</small>
              </p>
              <h3>Ingredients</h3>
              <div className="ingredients">
                <ul>
                  {tabData.recipe.ingredientLines.map((list, index) => (
                    <li key={index}>
                      <GiCheckMark size="18px" color="#6fcb9f" />
                      &nbsp;<span>{list}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right-col">
              <div className="image-wrapper">
                <img src={tabData.recipe.image} alt={tabData.recipe.label} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Tabs;
