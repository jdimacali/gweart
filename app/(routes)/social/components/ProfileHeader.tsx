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
      href={`https://instagram.com/${profile?.username}`}
      className="flex items-center justify-between p-4 rounded-xl
                 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800
                 hover:border-purple-500/30 transition-all duration-300
                 shadow-lg shadow-black/20 hover:shadow-purple-500/10
                 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 p-[2px] 
                       shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
            {profile?.profile_picture_url ? (
              <Image
                src={profile.profile_picture_url}
                alt="Profile"
                width={44}
                height={44}
                className="object-cover"
              />
            ) : (
              <Instagram className="w-5 h-5 text-purple-300" />
            )}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-zinc-100">
            @{profile?.username || "gwe_art"}
          </h2>
          <p className="text-sm text-zinc-400">
            {profile?.display_name || "Girl Wonder Extraordinaire"}
          </p>
        </div>
      </div>
      <Instagram className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
    </Link>
  );
};
