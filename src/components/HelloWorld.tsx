import './HelloWorld.css'

interface HelloMessageProps {
    name: string;
}

const HelloMessage = ({ name }: HelloMessageProps) => (
    <h1 className={'Hello'}>Hello {name}</h1>
);

export default HelloMessage;