import { MouseEvent } from "react";
import './ButtonCounter.css';

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
        <div className="counter-container">
            <div className="counter-content">
                <h2>{count}</h2>
                <button className="button" type="button" onClick={handleClick}>
                    Increment
                </button>
            </div>
            <div className="footer">
                <h6>Assignment 4</h6>
            </div>
        </div>
    )
}

export default ButtonCounter;