import axios from "axios";

export interface Album {
    userId: number;
    id: number;
    title: string;
}

export interface NewAlbum {
    userId: string;
    title: string;
}

const ALL_ALBUMS_URL = "https://jsonplaceholder.typicode.com/albums";

export const albumsQuery = {
    queryKey: ["albums"],
    queryFn: () => axios.get<Album[]>(ALL_ALBUMS_URL).then(res => res.data),
}

export const createAlbum = (newAlbum: NewAlbum) =>
    axios.post<Album>(ALL_ALBUMS_URL, {
        userId: Number(newAlbum.userId),
        title: newAlbum.title.trim(),
    }).then(res => res.data);