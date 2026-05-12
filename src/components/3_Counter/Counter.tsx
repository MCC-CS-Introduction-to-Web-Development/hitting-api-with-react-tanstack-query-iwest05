import { useState, MouseEvent, useEffect } from "react";
import './Counter.css';

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCount(count + 1);
    };

    const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCount(count > 0 ? count - 1 : 0);
    };

    useEffect(() => {
        console.log(`Current count is ${count}`);
    }, [count]);

    return (
        <div className="counter-container">
            <div className="counter-content">
                <h2>{count}</h2>
                <button className="button" type="button" onClick={handleIncrement}>
                    Increment
                </button>
                <button className="button" type="button" onClick={handleDecrement}>
                    Decrement
                </button>
            </div>
            <div className="footer">
                <h6>Assignment 3</h6>
            </div>
        </div>
    )
}

export default Counter;