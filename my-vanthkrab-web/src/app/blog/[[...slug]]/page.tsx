"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import type {Post} from "@/types";
import ErrorPage from "@/app/error";
import Loading from "@/app/loading";

const Page = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await fetch('/api/posts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    })
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorPage error={error as Error} reset={() => window.location.reload()} />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
            <ul className="space-y-4">
                {data.map((post: Post) => (
                    <li key={post.id} className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700">{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;