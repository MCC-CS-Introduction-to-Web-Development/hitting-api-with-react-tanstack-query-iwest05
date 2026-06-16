"use client";

import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

interface FormData {
    title: string;
    ingredients: (string | undefined)[];
    instructions: string;
}

const schema = yup.object().shape({
    title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
    ingredients: yup.array(yup.string()).required().min(1, 'At least one ingredient is required'),
    instructions: yup.string().required('Instructions are required').min(10, 'Instructions must be at least 10 characters'),
});

const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d7f]";
const labelClass = "block text-sm font-medium text-[#2d2d7f] mb-1";
const errorClass = "text-red-500 text-xs mt-1";

const RecipeForm = () => {
    const [ingredients, setIngredients] = useState<string[]>(['']);

    const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: { title: '', ingredients: [''], instructions: '' },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-8 flex flex-col gap-6">

            {/* Title */}
            <div>
                <label htmlFor="title" className={labelClass}>Title</label>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                        <input type="text" id="title" {...field} className={inputClass} placeholder="Recipe name" />
                    )}
                />
                {errors.title && <p className={errorClass}>{errors.title.message}</p>}
            </div>

            {/* Ingredients */}
            <div>
                <label className={labelClass}>Ingredients</label>
                <Controller
                    name="ingredients"
                    control={control}
                    render={() => (
                        <ul className="flex flex-col gap-2">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={ingredient}
                                        className={inputClass}
                                        placeholder={`Ingredient ${index + 1}`}
                                        onChange={(ingredientChangeEvent) => {
                                            const updated = [...ingredients];
                                            updated[index] = ingredientChangeEvent.target.value;
                                            setIngredients(updated);
                                        }}
                                    />
                                    {ingredients.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => setIngredients(ingredients.filter((_, ingredientIndex) => ingredientIndex !== index))}
                                            className="text-red-400 hover:text-red-600 text-sm px-2"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                />
                <button
                    type="button"
                    onClick={() => setIngredients([...ingredients, ''])}
                    className="mt-2 text-sm text-[#2d2d7f] hover:underline"
                >
                    + Add ingredient
                </button>
                {errors.ingredients && <p className={errorClass}>{errors.ingredients.message}</p>}
            </div>

            {/* Instructions */}
            <div>
                <label htmlFor="instructions" className={labelClass}>Instructions</label>
                <Controller
                    name="instructions"
                    control={control}
                    render={({ field }) => (
                        <textarea
                            id="instructions"
                            {...field}
                            rows={5}
                            className={inputClass}
                            placeholder="Describe the steps..."
                        />
                    )}
                />
                {errors.instructions && <p className={errorClass}>{errors.instructions.message}</p>}
            </div>

            <button
                type="submit"
                className="bg-[#2d2d7f] text-white py-3 rounded font-semibold hover:bg-[#1f1f5a] transition-colors"
            >
                Submit Recipe
            </button>
        </form>
    );
};

export default RecipeForm;