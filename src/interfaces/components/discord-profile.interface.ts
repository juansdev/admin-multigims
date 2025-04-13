export interface IDiscordProfileProps {
    username: string;
    handle: string;
    status: string;
    aboutMe: string[];
    birthDate: string;
    roles: Array<{ name: string; color: string }>;
    avatarUrl: string;
    bannerUrl: string;
    spotifyData: {
        songTitle: string;
        artist: string;
        album: string;
        albumCover: string;
        currentTime: string;
        totalDuration: string;
    };
}