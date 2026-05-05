interface PersonProps {
    name: string;
    age: number;
    country: string;
}

const Country = ({ country }: { country: string }) => {
    const flagUrl = `https://flagsapi.com/${country}/flat/64.png`;
    return (
        <div className="country-flag">
            <img src={flagUrl} alt={`${country} Flag`} />
        </div>
    );
};

const Person = ({ name, age, country }: PersonProps) => {
    return (
        <div className="person-card">
            <h2>{name}, {age} years old</h2>
            <p>Country: {country}</p>
            <Country country={country} />
        </div>
    );
};

export default Person;