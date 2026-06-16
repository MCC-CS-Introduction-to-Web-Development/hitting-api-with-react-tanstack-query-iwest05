"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { albumsQuery, NewAlbum, createAlbum } from "@/app/queries/albums";



const DataDisplay = () => {
    // Form state
    const [formData, setFormData] = useState<NewAlbum>({ userId: "", title: "" });
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);
    const [submitSuccess, setSubmitSuccess] = useState<string | undefined>(undefined);

    const { data: albums = [], isLoading, isError } = useQuery(albumsQuery)
    const { mutateAsync, isPending } = useMutation({ mutationFn: createAlbum });

    const handleChange = (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [inputChangeEvent.target.name]: inputChangeEvent.target.value });
    };

    const handleSubmit = async (formSubmitEvent: SyntheticEvent) => {
        formSubmitEvent.preventDefault();
        setSubmitError(undefined);
        setSubmitSuccess(undefined);

        if (!formData.userId || !formData.title.trim()) {
            setSubmitError("User ID and title are required.");
            return;
        }

        try {
            const album = await mutateAsync(formData);
            setFormData({ userId: "", title: "" });
            setSubmitSuccess(`Album "${album.title}" added (id: ${album.id}).`);
        } catch {
            setSubmitError("Failed to add album. Please try again.");
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-[#2d2d7f] mb-4">Add Album</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            User ID
                        </label>
                        <input
                            type="number"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            placeholder="e.g. 1"
                            min="1"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d7f]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Album Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter album title"
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d2d7f]"
                        />
                    </div>
                    {submitError && (
                        <p className="text-red-500 text-sm">{submitError}</p>
                    )}
                    {submitSuccess && (
                        <p className="text-green-600 text-sm">{submitSuccess}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? "Adding..." : "Add Album"}
                    </button>
                </form>
            </div>

            {/* Albums Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-bold text-[#2d2d7f] p-6 pb-4">Albums</h2>
                {isLoading && (
                    <p className="text-gray-500 text-sm px-6 pb-6">Loading albums...</p>
                )}
                {isError && (
                    <p className="text-red-500 text-sm px-6 pb-6">{isError}</p>
                )}
                {!isLoading && !isError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#2d2d7f] text-white">
                            <tr>
                                <th className="text-left px-4 py-3 font-semibold w-16">ID</th>
                                <th className="text-left px-4 py-3 font-semibold w-20">User ID</th>
                                <th className="text-left px-4 py-3 font-semibold">Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            {albums.map((album, albumRowIndex) => (
                                <tr
                                    key={album.id}
                                    className={albumRowIndex % 2 === 0 ? "bg-white" : "bg-[#f6f5f9]"}
                                >
                                    <td className="px-4 py-3 text-gray-500">{album.id}</td>
                                    <td className="px-4 py-3 text-gray-500">{album.userId}</td>
                                    <td className="px-4 py-3 text-gray-700 capitalize">{album.title}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataDisplay;