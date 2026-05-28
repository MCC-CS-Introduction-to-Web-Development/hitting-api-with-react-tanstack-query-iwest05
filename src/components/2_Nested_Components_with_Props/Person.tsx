"use client";

interface PersonProps {
    name: string;
    age: number;
    country: string;
}

const Country = ({ country }: { country: string }) => (
    <div className="flex justify-center">
        <img
            src={`https://flagsapi.com/${country}/flat/64.png`}
            alt={`${country} Flag`}
            className="w-16 h-16"
        />
    </div>
);

const Person = ({ name, age, country }: PersonProps) => (
    <div className="flex flex-col h-full">
        <div className="flex-1">
            <h2 className="text-lg font-semibold text-[#2d2d7f] mb-2">{name}, {age} years old</h2>
            <p className="text-gray-500 text-sm mb-4">Country: {country}</p>
            <Country country={country} />
        </div>
        <div className="mt-auto pt-4">
            <h6 className="text-xs text-gray-400">Assignment 2</h6>
        </div>
    </div>
);

export default Person;