"use client";

import axios from "axios";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

const ALL_ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums";

interface Album {
    userId: number;
    id: number;
    title: string;
}

interface NewAlbum {
    userId: string;
    title: string;
}

const DataDisplay = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);

    // Form state
    const [formData, setFormData] = useState<NewAlbum>({ userId: "", title: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);
    const [submitSuccess, setSubmitSuccess] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function fetchAlbums() {
            try {
                const response = await axios.get<Album[]>(ALL_ALBUMS_URL);
                setAlbums(response.data);
            } catch (e) {
                setError("Failed to load albums. Please refresh.");
            } finally {
                setLoading(false);
            }
        }
        fetchAlbums();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setSubmitError(undefined);
        setSubmitSuccess(undefined);

        if (!formData.userId || !formData.title.trim()) {
            setSubmitError("User ID and title are required.");
            return;
        }

        setSubmitting(true);
        try {
            const response = await axios.post<Album>(ALL_ALBUMS_URL, {
                userId: Number(formData.userId),
                title: formData.title.trim(),
            });
            setAlbums([response.data, ...albums]);
            setFormData({ userId: "", title: "" });
            setSubmitSuccess(`Album "${response.data.title}" added (id: ${response.data.id}).`);
        } catch (e) {
            setSubmitError("Failed to add album. Please try again.");
        } finally {
            setSubmitting(false);
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
                        disabled={submitting}
                        className="bg-[#2d2d7f] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-[#1f1f5a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Adding..." : "Add Album"}
                    </button>
                </form>
            </div>

            {/* Albums Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-bold text-[#2d2d7f] p-6 pb-4">Albums</h2>
                {loading && (
                    <p className="text-gray-500 text-sm px-6 pb-6">Loading albums...</p>
                )}
                {error && (
                    <p className="text-red-500 text-sm px-6 pb-6">{error}</p>
                )}
                {!loading && !error && (
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
                            {albums.map((album, index) => (
                                <tr
                                    key={album.id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-[#f6f5f9]"}
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