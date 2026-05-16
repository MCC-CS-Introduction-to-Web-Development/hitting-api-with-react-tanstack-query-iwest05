"use client";

import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm, Controller } from 'react-hook-form';

interface FormData {
    title: string;
    ingredients: (string | undefined)[];
    instructions: string;
}

const RecipeForm = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        ingredients: [''],
        instructions: ''
    });


    const schema = yup.object().shape({
        title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
        ingredients: yup.array(yup.string()).required().min(1, 'At least one ingredient is required'),
        instructions: yup.string().required('Instructions are required').min(10, 'Instructions must be at least 10 characters')
    });

    const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: formData
    });


    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title Input */}
            <div>
                <label htmlFor="title">Title</label>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <input type="text" id="title" {...field} />
                    )}
                />
                {errors.title && <p>{errors.title.message}</p>}
            </div>

            {/* Ingredients Input */}
            <div>
                <label htmlFor="ingredients">Ingredients</label>
                <Controller
                    name="ingredients"
                    control={control}
                    render={() => (
                        <ul>
                            {formData.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <input
                                        type="text"
                                        value={ingredient}
                                        onChange={(e) => {
                                            const newIngredients = [...formData.ingredients];
                                            newIngredients[index] = e.target.value;
                                            setFormData({ ...formData, ingredients: newIngredients });
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                />
                {errors.ingredients && <p>{errors.ingredients.message}</p>}
            </div>

            {/* Instructions Input */}
            <div>
                <label htmlFor="instructions">Instructions</label>
                <Controller
                    name="instructions"
                    control={control}
                    render={({ field }) => (
                        <textarea id="instructions" {...field} />
                    )}
                />
                {errors.instructions && <p>{errors.instructions.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit">Submit</button>
        </form>
    );
};

export default RecipeForm;