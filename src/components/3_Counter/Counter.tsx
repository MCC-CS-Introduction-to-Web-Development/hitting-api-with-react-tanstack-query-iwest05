"use client";
import { useState, MouseEvent, useEffect } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = (mouseClickEvent: MouseEvent<HTMLButtonElement>) => {
        mouseClickEvent.preventDefault();
        setCount(count + 1);
    };

    const handleDecrement = (mouseClickEvent: MouseEvent<HTMLButtonElement>) => {
        mouseClickEvent.preventDefault();
        setCount(count > 0 ? count - 1 : 0);
    };

    useEffect(() => {
        console.log(`Current count is ${count}`);
    }, [count]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#2d2d7f] mb-6">{count}</h2>
                <div className="flex gap-3 justify-center">
                    <button
                        type="button"
                        onClick={handleIncrement}
                        className="bg-blue-600 text-white px-5 py-2 rounded font-medium cursor-pointer shadow hover:bg-blue-700 transition-colors"
                    >
                        Increment
                    </button>
                    <button
                        type="button"
                        onClick={handleDecrement}
                        className="bg-blue-600 text-white px-5 py-2 rounded font-medium cursor-pointer shadow hover:bg-blue-700 transition-colors"
                    >
                        Decrement
                    </button>
                </div>
            </div>
            <div className="mt-auto pt-4">
                <h6 className="text-xs text-gray-400">Assignment 3</h6>
            </div>
        </div>
    );
};

export default Counter;