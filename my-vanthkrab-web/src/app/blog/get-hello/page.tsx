"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import Loading from "@/app/loading";
import ErrorPage from "@/app/error";


const Page = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['hello'],
        queryFn: async () => {
            const response = await fetch('/api/hello');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage error={error} reset={() => window.location.reload()} />;
    }

    const { message, timestamp, status } = data;


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Hello Page</h1>
            <p className="mb-2">Message: {message}</p>
            <p className="mb-2">Timestamp: {new Date(timestamp).toLocaleString()}</p>
            <p className="mb-2">status: {status}</p>
        </div>
    );
};

export default Page;