import React from "react";
import GoodsItem from "./GoodsItem";

const GoodsList = ({ items }) => {
  return (
    <div>
      {items.map((item, i) => (
        <GoodsItem key={i} item={item} />
      ))}
    </div>
  );
};

export default GoodsList;
