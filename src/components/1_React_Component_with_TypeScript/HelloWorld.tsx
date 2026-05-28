"use client";

interface HelloMessageProps {
    name: string;
}

const HelloMessage = ({ name }: HelloMessageProps) => (
    <h1 className="w-full text-center text-[#333078] text-2xl font-semibold">
        Hello {name}
    </h1>
);

export default HelloMessage;