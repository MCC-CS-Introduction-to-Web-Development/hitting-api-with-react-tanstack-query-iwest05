import RecipeForm from "@/components/5_Recipes/RecipeForm";
import Link from "next/link";

export default function RecipesPage() {
    return (
        <main className="min-h-screen bg-[#f6f5f9] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-xl">
                <Link
                    href="/"
                    className="inline-flex items-center text-[#2d2d7f] text-sm font-medium mb-6 hover:underline"
                >
                    ← Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-[#2d2d7f] mb-8">Add a Recipe</h1>
                <RecipeForm />
            </div>
        </main>
    );
}