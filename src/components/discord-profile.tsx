import React from 'react';
import SpotifyCard from './spotify-card';
import RoleTag from './role-tag';
import {User, Monitor} from 'lucide-react';
import {IDiscordProfileProps} from "@/interfaces/components/discord-profile.interface";
import Image from "next/image";

const DiscordProfile: React.FC<IDiscordProfileProps> = ({
                                                            username,
                                                            handle,
                                                            status,
                                                            aboutMe,
                                                            birthDate,
                                                            roles,
                                                            avatarUrl,
                                                            bannerUrl,
                                                            spotifyData
                                                        }) => {
    return (
        <div className="w-full max-w-md mx-auto overflow-hidden rounded-lg bg-discord-dark-blue">
            {/* Banner and Avatar */}
            <div className="relative h-28 bg-cover bg-center" style={{backgroundImage: `url(${bannerUrl})`}}>
                <div className="absolute bottom-0 transform translate-y-1/2 left-4">
                    <div className="relative">
                        <Image
                            src={avatarUrl}
                            alt={username}
                            width={80}
                            height={80}
                            className="w-20 h-20 rounded-full border-4 border-discord-dark-blue"
                        />
                        <div
                            className="absolute bottom-0 right-0 w-5 h-5 bg-discord-green rounded-full border-2 border-discord-dark-blue"></div>
                    </div>
                </div>
            </div>

            {/* User Info */}
            <div className="mt-12 px-4">
                <div className="bg-discord-card-bg rounded-lg p-4">
                    <h2 className="text-white text-xl font-bold">{username}</h2>
                    <p className="text-discord-text-secondary text-sm">{handle}</p>
                    <p className="text-white mt-1">{status}</p>

                    <div className="mt-3 border-t border-gray-700 pt-3">
                        <h3 className="text-white font-bold text-sm uppercase">ABOUT ME</h3>
                        {aboutMe.map((line, i) => (
                            <p key={i} className="text-discord-text-secondary text-sm mt-1">{line}</p>
                        ))}
                    </div>

                    <div className="mt-3 flex gap-2">
                        <User size={16} className="text-discord-text-secondary"/>
                        <Monitor size={16} className="text-discord-text-secondary"/>
                    </div>

                    <div className="mt-3 border-t border-gray-700 pt-3">
                        <h3 className="text-white font-bold text-sm uppercase">IN THIS WORLD SINCE</h3>
                        <p className="text-discord-text-secondary text-sm mt-1">{birthDate}</p>
                    </div>

                    <SpotifyCard {...spotifyData} />

                    <div className="mt-3 border-t border-gray-700 pt-3">
                        <h3 className="text-white font-bold text-sm uppercase mb-2">ROLES</h3>
                        <div className="flex flex-wrap gap-2">
                            {roles.map((role, i) => (
                                <RoleTag key={i} label={role.name} color={role.color}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscordProfile;