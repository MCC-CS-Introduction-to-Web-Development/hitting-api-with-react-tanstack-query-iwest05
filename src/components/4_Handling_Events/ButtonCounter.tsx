"use client";
import { MouseEvent } from "react";
import styles from './ButtonCounter.module.css';

interface ButtonCounterProps {
    count: number;
    onIncrement: () => void;
}

const ButtonCounter = ({ count, onIncrement }: ButtonCounterProps) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onIncrement();
    };

    return (
        <div className={styles.counterContainer}>
            <div className="counter-content">
                <h2>{count}</h2>
                <button className={styles.button} type="button" onClick={handleClick}>
                    Increment
                </button>
            </div>
            <div className={styles.footer}>
                <h6>Assignment 4</h6>
            </div>
        </div>
    )
}

export default ButtonCounter;