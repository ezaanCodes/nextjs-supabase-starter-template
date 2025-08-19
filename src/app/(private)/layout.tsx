"use client"
import useAuth from "@/hooks/useAuth";

import { AuthContext, AuthProvider } from "@/components/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivatePagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const { user, loading } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            return router.replace("/")
        }

    }, [user, loading])

    if (loading && !user) return null

    return (<>{children}</>);
}
