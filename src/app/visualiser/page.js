"use client";
import React, { useState, useEffect, useRef } from "react";

import styles from "./style.module.scss";

const DEFAULT_ARRAY_SIZE = 50;
const ARRAY_MIN_VALUE = 10;
const ARRAY_MAX_VALUE = 500;

const Visualiser = () => {
  const [sizeArray, setSizeArray] = useState(DEFAULT_ARRAY_SIZE);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i <= sizeArray; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  }, [sizeArray]);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < sizeArray; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const barWidth = sizeArray > 50 ? 12 : sizeArray > 25 ? 17 : 24;

  console.log(array);
  return (
    <div className={styles.visualiser}>
      <section className={styles.header}>
        <div className={styles.sliders}>
          <div className={styles.size}>
            <label htmlFor="">Size of Array</label>
            <input
              type="range"
              className={styles.slider}
              min={10}
              max={100}
              value={sizeArray}
              onChange={(e) => {
                setSizeArray(e.target.value);
              }}
            />
          </div>
          <div className={styles.speed}>
            <label htmlFor="">Speed of Animation</label>
            <input type="range" className={styles.slider} min={10} max={100} />
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.btn} onClick={resetArray}>
            Generate New Array
          </button>
          <button className={styles.btn}>Bubble Sort</button>
          <button className={styles.btn}>Selection Sort</button>
          <button className={styles.btn}>Quick Sort</button>
          <button className={styles.btn}>Heap Sort</button>
          <button className={styles.btn}>Insertion Sort</button>
        </div>
      </section>
      <section className={styles.content}>
        {array.map((value, index) => {
          return (
            <div
              className={styles.arrayBar}
              key={index}
              style={{
                height: `${value}px`,
                width: `${barWidth}px`,
              }}
            ></div>
          );
        })}
      </section>
    </div>
  );
};

export default Visualiser;
