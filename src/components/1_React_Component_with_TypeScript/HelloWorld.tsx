"use client";
import styles from './HelloWorld.module.css'

interface HelloMessageProps {
    name: string;
}

const HelloMessage = ({ name }: HelloMessageProps) => (
    <h1 className={styles.Hello}>Hello {name}</h1>
);

export default HelloMessage;