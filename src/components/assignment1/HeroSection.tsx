import './HeroSection.css'
import Person from "../assignment2/Person";
import Counter from "../assignment3/Counter";

const HeroSection = () => (
    <>
        <div className="hero-wrapper">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Dolor</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Fames tempor vulputate duis nascetur mi rhoncus ac. In nibh sodales mauris felis sapien amet. Cras cras morbi ut sed leo volutpat sit cursus.</p>
                    <button className="hero-button">Discover</button>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80" alt="Flowers" />
                </div>
            </div>

            <div className="products-section">
                <div className="product-card">
                    <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&q=80" alt="Product 1" />
                    <h3>SkinCeuticals Phyto Corrective Hydrating + Calming Gel Serum</h3>
                    <p className="price">$70.00</p>
                </div>
                <div className="product-card">
                    <Person name={"Iain"} age={39} country={"US"} />
                </div>
                <div className="product-card">
                    <Counter />
                </div>
            </div>
        </div>
    </>
)

export default HeroSection