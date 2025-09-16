"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (document.readyState === "complete") setLoading(false);
        else {
            const handleLoad = () => setLoading(false);
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    if (loading) {
        return (
            <div className="bg-loader">
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <p>Memuat...</p>
            </div>
        );
    }

    return children;
}
