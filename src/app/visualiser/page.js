"use client";
import React, { useState, useEffect, useRef } from "react";
import { getBubbleSortAnimations } from "../utils/BubbleSort";

import styles from "./style.module.scss";

const DEFAULT_ARRAY_SIZE = 50;
const DEFAULT_ANIMATION_SPEED = 80;

const ARRAY_MIN_VALUE = 10;
const ARRAY_MAX_VALUE = 500;

const Visualiser = () => {
  const [sizeArray, setSizeArray] = useState(DEFAULT_ARRAY_SIZE);
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [disabled, setDisabled] = useState(false);
  const [array, setArray] = useState([]);
  const arrayBarsRef = useRef([]);

  useEffect(() => {
    const newArray = [];
    for (let i = 0; i < sizeArray; i++) {
      newArray.push(randomIntFromInterval(ARRAY_MIN_VALUE, ARRAY_MAX_VALUE));
    }
    setArray(newArray);
  }, [sizeArray]);

  useEffect(() => {
    arrayBarsRef.current = arrayBarsRef.current.slice(0, sizeArray); // Update array bar refs when array size changes
  }, [sizeArray, array]);

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

  const animateSorting = (animations) => {
    setDisabled(true);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBarsRef.current[barOneIdx].style;
        const barTwoStyle = arrayBarsRef.current[barTwoIdx].style;
        const color = i % 3 === 0 ? "#57cc99" : "#7209b7";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * (101 - animationSpeed));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne, barTwoIdx, newHeightTwo] =
            animations[i];
          const barOneStyle = arrayBarsRef.current[barOneIdx].style;
          barOneStyle.height = `${newHeightOne}px`;
          const barTwoStyle = arrayBarsRef.current[barTwoIdx].style;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * (101 - animationSpeed));
      }
    }
    setTimeout(() => {
      setDisabled(false);
    }, animations.length * (101 - animationSpeed));
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array, sizeArray);
    animateSorting(animations);
  };

  const barWidth = sizeArray > 50 ? 12 : sizeArray > 25 ? 17 : 24;

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
              disabled={disabled}
              max={100}
              value={sizeArray}
              onChange={(e) => {
                setSizeArray(e.target.value);
              }}
            />
          </div>
          <div className={styles.speed}>
            <label htmlFor="">Speed of Animation</label>
            <input
              type="range"
              className={styles.slider}
              min={10}
              disabled={disabled}
              max={100}
              value={animationSpeed}
              onChange={(e) => {
                setAnimationSpeed(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btn}
            disabled={disabled}
            onClick={resetArray}
          >
            Generate New Array
          </button>
          <button
            className={styles.btn}
            disabled={disabled}
            onClick={bubbleSort}
          >
            Bubble Sort
          </button>
          <button className={styles.btn} disabled={disabled}>
            Selection Sort
          </button>
          <button className={styles.btn} disabled={disabled}>
            Quick Sort
          </button>
          <button className={styles.btn} disabled={disabled}>
            Heap Sort
          </button>
          <button className={styles.btn} disabled={disabled}>
            Insertion Sort
          </button>
        </div>
      </section>
      <section className={styles.content}>
        {array.map((value, index) => {
          return (
            <div
              ref={(el) => (arrayBarsRef.current[index] = el)}
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
