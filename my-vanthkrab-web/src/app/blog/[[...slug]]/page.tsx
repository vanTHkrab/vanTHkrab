import React from 'react';
import PostContent from "@/components/post-content";

interface Props {
    params: Promise<{ slug: string }>;
}

const BlogPage: React.FC<Props> = async ({params}: Props) => {
    const {slug} = await params;
    console.log('Blog slug:', slug);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Blog Post</h1>
            <p className="text-gray-700">This is a blog post with slug: {slug}</p>
            <PostContent slug={slug}/>
        </div>
    );
};

export default BlogPage;