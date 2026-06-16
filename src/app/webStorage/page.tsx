import Link from "next/link";
import AlbumWebStorage from "../../components/8_Web_Storage/AlbumWebStorage";

export default function WebStoragePage() {
    return (
        <main className="min-h-screen bg-[#f6f5f9] px-6 py-16">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-[#2d2d7f] text-sm font-medium mb-6 hover:underline"
                >
                    ← Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-[#2d2d7f] mb-8">Web Storage</h1>
                <AlbumWebStorage />
            </div>
        </main>
    );
}
