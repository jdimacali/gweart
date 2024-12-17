import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InstagramProfile } from "@/types/instagram";

interface ProfileHeaderProps {
  profile: InstagramProfile | null;
}

export const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  return (
    <Link
      href="https://www.instagram.com/gwe_art/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between mb-6 hover:opacity-90 transition-opacity"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
            {profile?.profile_picture_url ? (
              <Image
                src={profile.profile_picture_url}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            ) : (
              <Instagram className="w-5 h-5 text-purple-300" />
            )}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-purple-100">@{profile?.username || 'gwe_art'}</h2>
          <p className="text-xs text-gray-400">{profile?.display_name || 'Girl Wonder Extraordinaire'}</p>
        </div>
      </div>
      <Instagram className="w-6 h-6 text-purple-300" />
    </Link>
  );
}; 