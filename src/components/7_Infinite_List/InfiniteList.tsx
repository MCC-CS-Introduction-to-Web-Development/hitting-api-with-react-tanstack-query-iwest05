"use client";

import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";
const LIMIT = 12;

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

interface ApiObject {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

const InfiniteList = () => {
    const [products, setProducts] = useState<ApiObject[]>([]);
    const offsetRef = useRef(10);
    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const [initialized, setInitialized] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async (currentOffset: number): Promise<void> => {
        if (loadingRef.current || !hasMoreRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        try {
            const response = await axios.get<ApiObject[]>(BASE_URL, {
                params: { offset: currentOffset, limit: LIMIT },
            });
            const data = response.data;
            if (data.length < LIMIT) {
                hasMoreRef.current = false;
                setHasMore(false);
            }
            setProducts((previousProductList) => [...previousProductList, ...data]);
            offsetRef.current += LIMIT;
        } catch (productFetchError) {
            console.error("Failed to fetch products:", productFetchError);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts(offsetRef.current).then(() => setInitialized(true));
    }, []);

    useEffect(() => {
        if (!initialized) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((intersectionObserverEntries) => {
            if (intersectionObserverEntries[0].isIntersecting) {
                fetchProducts(offsetRef.current);
            }
        });

        if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);

        return () => observerRef.current?.disconnect();
    }, [initialized, fetchProducts]);

    const getFirstValidImage = (images: string[]) => {
        return images.find((imageUrl) => imageUrl.startsWith("http")) ?? null;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => {
                    const productImageUrl = getFirstValidImage(product.images);
                    return (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                            {productImageUrl && (
                                <img
                                    src={productImageUrl}
                                    alt={product.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-3 flex flex-col flex-1">
                                <p className="font-semibold text-sm leading-snug mb-1">{product.title}</p>
                                <p className="text-xs text-gray-500 mb-2">{product.category.name}</p>
                                <p className="mt-auto font-bold text-blue-600">${product.price}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div ref={sentinelRef} className="h-px" />

            {loading && <p className="text-center py-4 text-gray-500">Loading...</p>}
            {!hasMore && <p className="text-center py-4 text-gray-400">No more products.</p>}

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg transition-colors"
            >
                ↑ Top
            </button>
        </div>
    );
}

export default InfiniteList;