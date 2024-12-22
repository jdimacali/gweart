"use client";

import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { InstagramPost, InstagramProfile } from "@/types";
import { ProfileHeader } from "./ProfileHeader";
import { PostCard } from "./PostCard";

const InstagramFeed = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch("/api/social");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setPosts(data.posts.slice(0, 4));
        setProfile(data.profile);

        const indices: Record<string, number> = {};
        data.posts.forEach((post: InstagramPost) => {
          indices[post.id] = 0;
        });
        setCurrentImageIndex(indices);
      } catch (err) {
        setError("Failed to load Instagram posts");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-zinc-800/50 rounded-xl backdrop-blur-sm border border-purple-500/20 overflow-hidden"
          >
            <Skeleton className="h-[400px] w-full" />
            <div className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !posts.length) {
    return (
      <div className="w-full max-w-md mx-auto bg-zinc-800/50 p-8 rounded-xl backdrop-blur-sm border border-purple-500/20 text-center">
        <Instagram className="w-12 h-12 mx-auto mb-4 text-purple-400 opacity-50" />
        <p className="text-gray-400">
          {error || "No Instagram posts available"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto space-y-8">
      <ProfileHeader profile={profile} />

      <div className="space-y-8">
        {posts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            className="block transition-transform hover:-translate-y-1 duration-300"
          >
            {post.media_type === "VIDEO" ? (
              <PostCard
                post={post}
                currentIndex={currentImageIndex[post.id]}
                onPrevImage={() => {
                  setCurrentImageIndex((prev) => ({
                    ...prev,
                    [post.id]:
                      (prev[post.id] - 1 + post.children!.data.length) %
                      post.children!.data.length,
                  }));
                }}
                onNextImage={() => {
                  setCurrentImageIndex((prev) => ({
                    ...prev,
                    [post.id]: (prev[post.id] + 1) % post.children!.data.length,
                  }));
                }}
              />
            ) : (
              <Link
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PostCard
                  post={post}
                  currentIndex={currentImageIndex[post.id]}
                  onPrevImage={() => {
                    setCurrentImageIndex((prev) => ({
                      ...prev,
                      [post.id]:
                        (prev[post.id] - 1 + post.children!.data.length) %
                        post.children!.data.length,
                    }));
                  }}
                  onNextImage={() => {
                    setCurrentImageIndex((prev) => ({
                      ...prev,
                      [post.id]:
                        (prev[post.id] + 1) % post.children!.data.length,
                    }));
                  }}
                />
              </Link>
            )}
          </div>
        ))}

        {posts[3] && (
          <div className="relative mt-12">
            <PostCard
              post={{
                ...posts[3],
                media_type: "IMAGE",
                media_url:
                  posts[3].media_type === "CAROUSEL_ALBUM"
                    ? posts[3].children?.data[0]?.media_url || ""
                    : posts[3].media_url || "",
              }}
              currentIndex={0}
              onPrevImage={() => {}}
              onNextImage={() => {}}
              preview
            />

            <Link
              href="https://www.instagram.com/gwe_art/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-0 bottom-24 mx-auto w-max px-6 py-3
                bg-gradient-to-r from-[#405DE6] to-[#C13584] 
                text-white font-medium rounded-full 
                shadow-lg backdrop-blur-sm border border-white/10
                transition-all duration-300 hover:shadow-[0_4px_12px_rgba(193,53,132,0.4)] 
                hover:scale-[1.02]
                flex items-center gap-2 z-10"
            >
              <span>See More on Instagram</span>
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstagramFeed;
