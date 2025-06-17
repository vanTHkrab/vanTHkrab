"use client";
import React from 'react';
import {useQuery} from "@tanstack/react-query";

interface Props {
    slug: string;
}

const PostContent = ({slug}: Props) => {
    const {data, error, isLoading} = useQuery({
        queryKey: ['post', slug],
        queryFn: async () => {
            const response = await fetch(`/api/posts/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.error || 'Failed to fetch post');
            }

            return response.json();
        },
        enabled: !!slug, // only fetch if slug is truthy
    });

    return (
        <></>
    );
};

export default PostContent;
