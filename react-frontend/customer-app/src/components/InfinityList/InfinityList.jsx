import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import Grid from "../Grid";
import ProductCard from "../ProductCard";

const InfinityList = (props) => {
  const perLoad = 8; // items each load

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  //number of load
  const [index, setIndex] = useState(0);

  //load again data, when data changed
  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  //scroll
  useEffect(() => {
    const loadData = () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          console.log("bottom reach");
          setLoad(true);
        }
      }
    };
    window.addEventListener("scroll", loadData);

    return () => {
      window.removeEventListener("scroll", loadData); // clean load data
    };
  }, [listRef]);

  //load all data
  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  return (
    <div ref={listRef}>
      <Grid col={4} mdCol={2} smCol={1} gap={20}>
        {data.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}            
            slug={item.slugProduct}                 
            price={Number(item.price)}
            discountValue={item.discountValue}
            promotionalPrice={item.promotionalPrice}
            colors={item.colors}
          />
        ))}
      </Grid>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

InfinityList.defaultProps = {
  data: [],
};

export default InfinityList;
