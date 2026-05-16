"use client";
import { useState } from "react";
import Person from "../2_Nested_Components_with_Props/Person";
import Counter from "../3_Counter/Counter";
import ButtonCounter from "../4_Handling_Events/ButtonCounter";
import styles from './HeroSection.module.css'
import RecipeForm from "@/components/5_Recipes/RecipeForm";


const HeroSection = () => {
    const [count, setCount] = useState(0);
    const handleIncrement = () => setCount(count + 1);

    return (
        <>
        <div className={styles.heroWrapper}>
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1>Dolor</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Fames tempor vulputate duis nascetur mi rhoncus ac. In
                        nibh sodales mauris felis sapien amet. Cras cras morbi ut sed leo volutpat sit cursus.</p>
                    <button className={styles.heroButton}>Discover</button>
                </div>
                <div className={styles.heroImage}>
                    <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80" alt="Flowers"/>
                </div>
            </div>

            <div className={styles.productSection}>
                <div className={styles.productCard}>
                    <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&q=80" alt="Product 1"/>
                    <h3>SkinCeuticals Phyto Corrective Hydrating + Calming Gel Serum</h3>
                    <p className={styles.price}>$70.00</p>
                </div>
                <div className={styles.productCard}>
                    <Person name={"Iain"} age={39} country={"US"}/>
                </div>
                <div className={styles.productCard}>
                    <Counter />
                </div>
                <div className={styles.productCard}>
                    <ButtonCounter count={count} onIncrement={handleIncrement} />
                </div>
                <div className={styles.productCard}>
                    <RecipeForm />
                </div>
            </div>
        </div>
    </>
    )
}

export default HeroSection