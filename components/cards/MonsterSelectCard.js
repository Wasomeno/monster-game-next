import React, { useEffect, useState } from "react";
import { useRef } from "react";

const MonsterSelectCard = ({
  monster,
  level,
  exp,
  expCap,
  energy,
  energyCap,
  onClick,
}) => {
  const cardRef = useRef(null);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (monster) {
      const monsterImage = new Image();
      monsterImage.src = "/monsters/" + (parseInt(monster) + 1) + ".png";
      monsterImage.onload = () => {
        setImage(monsterImage);
      };
    }
  }, [monster]);

  useEffect(() => {
    if (image && cardRef) {
      const card = cardRef.current;
      var wrh = image.height / image.width;
      if (image.height > image.width) {
        wrh = image.width / image.height;
      }
      var newWidth = card.clientWidth;
      var newHeight = newWidth / wrh;
      if (newHeight > card.clientHeight) {
        newHeight = card.clientHeight;
        newWidth = newHeight * wrh;
      }
      setWidth(newWidth);
      setHeight(newHeight);
    }
  }, [image, cardRef]);

  return (
    <div
      id="monster-card"
      className="col-3 card m-1 d-flex justify-content-center align-items-center align-self-start"
      onClick={onClick}
      ref={cardRef}
    >
      <div className="h-50 m-1 d-flex align-items-center">
        <img
          className="p-3"
          src={"/monsters/" + (parseInt(monster) + 1) + ".png"}
          alt="monster-img"
          width={width / 1.5}
          height={height / 2}
        />
      </div>

      <div className="card-body py-1" style={{ color: "#EEEEEE" }}>
        <h5 className="card-title fw-bold text-center" id="text">
          Monster #{monster}
        </h5>
        <div className="text-start">
          <h5 id="text">Level : {level} / 10</h5>
          <h5 id="text">
            Exp : {exp} / {expCap}
          </h5>
          <h5 id="text">
            Energy : {energy} / {energyCap}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MonsterSelectCard;
