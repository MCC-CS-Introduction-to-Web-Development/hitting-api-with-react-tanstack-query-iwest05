"use client";
import styles from './Person.module.css'

interface PersonProps {
    name: string;
    age: number;
    country: string;
}

const Country = ({ country }: { country: string }) => {
    const flagUrl = `https://flagsapi.com/${country}/flat/64.png`;
    return (
        <div className={styles.countryFlag}>
            <img src={flagUrl} alt={`${country} Flag`} />
        </div>
    );
};

const Person = ({ name, age, country }: PersonProps) => {
    return (
        <div className={styles.counterContainer}>
            <div className={styles.counterContent}>
                <h2>{name}, {age} years old</h2>
                <p>Country: {country}</p>
                <Country country={country} />
            </div>
                <div className={styles.footer}>
                    <h6>Assignment 2</h6>
                </div>
        </div>
    );
};

export default Person;