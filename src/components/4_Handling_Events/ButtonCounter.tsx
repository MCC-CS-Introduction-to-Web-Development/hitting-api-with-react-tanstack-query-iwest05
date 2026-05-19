"use client";
import { MouseEvent } from "react";

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
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <h2 className="text-3xl font-bold text-[#2d2d7f] mb-6">{count}</h2>
                <button
                    type="button"
                    onClick={handleClick}
                    className="bg-blue-600 text-white px-5 py-2 rounded font-medium cursor-pointer shadow hover:bg-blue-700 transition-colors"
                >
                    Increment
                </button>
            </div>
            <div className="mt-auto pt-4">
                <h6 className="text-xs text-gray-400">Assignment 4</h6>
            </div>
        </div>
    );
};

export default ButtonCounter;