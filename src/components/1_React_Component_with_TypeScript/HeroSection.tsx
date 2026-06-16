"use client";
import { useState } from "react";
import Link from "next/link";
import Person from "../2_Nested_Components_with_Props/Person";
import Counter from "../3_Counter/Counter";
import ButtonCounter from "../4_Handling_Events/ButtonCounter";

const HeroSection = () => {
    const [count, setCount] = useState(0);
    const handleIncrement = () => setCount(count + 1);

    return (
        <div className="bg-[#f5f5f5]">
            {/* Hero Banner */}
            <div className="flex items-center gap-10 px-10 py-16 max-w-6xl mx-auto bg-white">
                <div className="flex-1 pr-5">
                    <h1 className="text-[#2d2d7f] text-4xl font-bold mb-5">Dolor</h1>
                    <p className="text-gray-500 text-base leading-relaxed mb-8">
                        Lorem ipsum dolor sit amet consectetur. Fames tempor vulputate duis nascetur mi rhoncus ac.
                        In nibh sodales mauris felis sapien amet. Cras cras morbi ut sed leo volutpat sit cursus.
                    </p>
                    <button className="bg-[#2d2d7f] text-white px-8 py-3 font-semibold rounded cursor-pointer transition-colors hover:bg-[#1f1f5a]">
                        Discover
                    </button>
                </div>
                <div className="flex-1 overflow-hidden rounded-lg">
                    <img
                        src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80"
                        alt="Flowers"
                        className="w-1/2 block mx-auto"
                    />
                </div>
            </div>

            {/* Cards Grid */}
            <div className="flex gap-8 px-10 py-16 max-w-6xl mx-auto justify-center flex-wrap">

                {/* Static Product Card */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1">
                    <img
                        src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&q=80"
                        alt="Product 1"
                        className="w-full h-60 object-cover rounded mb-4"
                    />
                    <h3 className="text-[#2d2d7f] text-base font-semibold leading-snug my-4">
                        SkinCeuticals Phyto Corrective Hydrating + Calming Gel Serum
                    </h3>
                    <p className="text-[#2d2d7f] text-lg font-bold mt-2">$70.00</p>
                </div>

                {/* Assignment 2 — Person */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1">
                    <Person name="Iain" age={39} country="US" />
                </div>

                {/* Assignment 3 — Counter */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1">
                    <Counter />
                </div>

                {/* Assignment 4 — ButtonCounter */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1">
                    <ButtonCounter count={count} onIncrement={handleIncrement} />
                </div>

                {/* Recipe Form Link Card */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4">
                    <h3 className="text-[#2d2d7f] text-base font-semibold">Recipe Form</h3>
                    <Link
                        href="/recipes"
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors"
                    >
                        Go to Recipes
                    </Link>
                    <p className="text-gray-500 text-sm">Assignment 5</p>
                </div>
                {/* Axios Data Pull Card */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4">
                    <Link
                        href="/dataPull"
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors"
                    >
                        Go to Data
                    </Link>
                    <p className="text-gray-500 text-sm">Assignment 6</p>
                </div>
                {/* Infinite List Card */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4">
                    <Link
                        href="/infiniteList"
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors"
                    >
                        Go to Infinite List
                    </Link>
                    <p className="text-gray-500 text-sm">Assignment 7</p>
                </div>
                {/* Web Storage Card */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4">
                    <h3 className="text-[#2d2d7f] text-base font-semibold">Web Storage</h3>
                    <Link
                        href="/webStorage"
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors"
                    >
                        Go to Web Storage
                    </Link>
                    <p className="text-gray-500 text-sm">Assignment 8</p>
                </div>
                {/* External Pages Card */}
                <div className="bg-white p-5 rounded-lg text-center w-72 shadow-md transition-transform hover:-translate-y-1 flex flex-col items-center justify-center gap-4">
                    <p className="text-gray-500 text-sm">External Links</p>
                    <Link
                        href="https://www.buildcores.com/"
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors"
                        target="_blank"
                    >
                        Build Core Computers
                    </Link>
                    <Link
                        href="https://tosdr.org/en"
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors"
                        target="_blank"
                    >
                        Terms TLDR
                    </Link>
                    <p className="text-gray-500 text-sm">Assignment 8</p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;