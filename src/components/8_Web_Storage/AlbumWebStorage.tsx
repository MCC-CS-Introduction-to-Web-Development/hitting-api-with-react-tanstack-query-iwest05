"use client";

import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { albumsQuery, Album } from "@/app/queries/albums";

const DELETED_ALBUM_IDS_STORAGE_KEY = "webStorageDeletedAlbumIds";
const ALBUM_ORDER_STORAGE_KEY = "webStorageAlbumOrder";

const AlbumWebStorage = () => {
    const [deletedAlbumIds, setDeletedAlbumIds] = useState<number[]>([]);
    const [albumOrder, setAlbumOrder] = useState<number[]>([]);
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);
    const [positionInputValues, setPositionInputValues] = useState<Record<number, string>>({});

    const { data: fetchedAlbums = [], isLoading, isError } = useQuery(albumsQuery);

    useEffect(() => {
        const storedDeletedIds = localStorage.getItem(DELETED_ALBUM_IDS_STORAGE_KEY);
        const storedAlbumOrder = localStorage.getItem(ALBUM_ORDER_STORAGE_KEY);
        if (storedDeletedIds) setDeletedAlbumIds(JSON.parse(storedDeletedIds));
        if (storedAlbumOrder) setAlbumOrder(JSON.parse(storedAlbumOrder));
        setIsStorageLoaded(true);
    }, []);

    useEffect(() => {
        if (!isStorageLoaded) return;
        localStorage.setItem(DELETED_ALBUM_IDS_STORAGE_KEY, JSON.stringify(deletedAlbumIds));
    }, [deletedAlbumIds, isStorageLoaded]);

    useEffect(() => {
        if (!isStorageLoaded) return;
        localStorage.setItem(ALBUM_ORDER_STORAGE_KEY, JSON.stringify(albumOrder));
    }, [albumOrder, isStorageLoaded]);

    const orderedVisibleAlbums = useMemo(() => {
        const visibleAlbums = fetchedAlbums.filter(
            (album) => !deletedAlbumIds.includes(album.id)
        );

        if (albumOrder.length === 0) return visibleAlbums;

        const albumMap = new Map<number, Album>(
            visibleAlbums.map((album) => [album.id, album])
        );

        const orderedAlbums: Album[] = [];
        albumOrder.forEach((albumId) => {
            const foundAlbum = albumMap.get(albumId);
            if (foundAlbum) orderedAlbums.push(foundAlbum);
        });

        visibleAlbums.forEach((album) => {
            if (!albumOrder.includes(album.id)) orderedAlbums.push(album);
        });

        return orderedAlbums;
    }, [fetchedAlbums, deletedAlbumIds, albumOrder]);

    const removeAlbum = (albumId: number) => {
        setDeletedAlbumIds((previousDeletedIds) => [...previousDeletedIds, albumId]);
    };

    const getAlbumCurrentPosition = (albumId: number): number => {
        return orderedVisibleAlbums.findIndex((album) => album.id === albumId) + 1;
    };

    const handlePositionInputFocus = (albumId: number) => {
        setPositionInputValues((previousValues) => ({
            ...previousValues,
            [albumId]: String(getAlbumCurrentPosition(albumId)),
        }));
    };

    const handlePositionInputChange = (albumId: number, newValue: string) => {
        setPositionInputValues((previousValues) => ({
            ...previousValues,
            [albumId]: newValue,
        }));
    };

    const commitAlbumPosition = (albumId: number) => {
        const pendingInputValue = positionInputValues[albumId];
        if (pendingInputValue === undefined) return;

        const newPosition = parseInt(pendingInputValue, 10);
        if (isNaN(newPosition)) return;

        const currentOrderedIds = orderedVisibleAlbums.map((album) => album.id);
        const orderWithoutCurrentAlbum = currentOrderedIds.filter((id) => id !== albumId);
        const clampedPosition = Math.max(1, Math.min(newPosition, orderedVisibleAlbums.length));
        const newAlbumOrder = [...orderWithoutCurrentAlbum];
        newAlbumOrder.splice(clampedPosition - 1, 0, albumId);
        setAlbumOrder(newAlbumOrder);

        setPositionInputValues((previousValues) => {
            const updatedValues = { ...previousValues };
            delete updatedValues[albumId];
            return updatedValues;
        });
    };

    const handlePositionInputKeyDown = (
        albumId: number,
        keyboardEvent: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (keyboardEvent.key === "Enter") {
            commitAlbumPosition(albumId);
            keyboardEvent.currentTarget.blur();
        }
    };

    const resetAlbumsToDefault = () => {
        setAlbumOrder([]);
        setDeletedAlbumIds([]);
    };

    if (isLoading) {
        return <p className="p-8 text-center text-gray-500">Loading albums...</p>;
    }

    if (isError) {
        return <p className="p-8 text-center text-red-500">Failed to load albums.</p>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#2d2d7f]">
                    Albums ({orderedVisibleAlbums.length})
                </h1>
                <button
                    type="button"
                    onClick={resetAlbumsToDefault}
                    className="text-sm text-gray-400 hover:text-[#2d2d7f] underline transition-colors"
                >
                    Reset all
                </button>
            </div>

            {orderedVisibleAlbums.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg mb-4">All albums removed.</p>
                    <button
                        type="button"
                        onClick={resetAlbumsToDefault}
                        className="text-[#2d2d7f] underline text-sm hover:text-[#1f1f5a] transition-colors"
                    >
                        Restore all albums
                    </button>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {orderedVisibleAlbums.map((album) => {
                        const currentPosition = getAlbumCurrentPosition(album.id);
                        const pendingPositionValue = positionInputValues[album.id];
                        const displayedPositionValue =
                            pendingPositionValue !== undefined
                                ? pendingPositionValue
                                : String(currentPosition);

                        return (
                            <div
                                key={album.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-52 flex flex-col gap-3"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-400 mb-1">
                                            ID {album.id} · User {album.userId}
                                        </p>
                                        <p className="text-sm font-medium text-gray-800 capitalize leading-snug">
                                            {album.title}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeAlbum(album.id)}
                                        aria-label={`Remove album titled ${album.title}`}
                                        className="text-gray-300 hover:text-red-500 transition-colors text-xl leading-none flex-shrink-0 mt-0.5"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 border-t border-gray-100 pt-2">
                                    <label
                                        htmlFor={`position-input-album-${album.id}`}
                                        className="text-xs text-gray-400 whitespace-nowrap"
                                    >
                                        Position
                                    </label>
                                    <input
                                        id={`position-input-album-${album.id}`}
                                        type="number"
                                        min={1}
                                        max={orderedVisibleAlbums.length}
                                        value={displayedPositionValue}
                                        onFocus={() => handlePositionInputFocus(album.id)}
                                        onChange={(inputChangeEvent) =>
                                            handlePositionInputChange(
                                                album.id,
                                                inputChangeEvent.target.value
                                            )
                                        }
                                        onBlur={() => commitAlbumPosition(album.id)}
                                        onKeyDown={(keyboardEvent) =>
                                            handlePositionInputKeyDown(album.id, keyboardEvent)
                                        }
                                        className="w-16 border border-gray-200 rounded px-2 py-1 text-xs text-center focus:outline-none focus:ring-2 focus:ring-[#2d2d7f]"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AlbumWebStorage;
