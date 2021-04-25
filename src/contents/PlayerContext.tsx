import { createContext, useState, ReactNode, useContext } from 'react';


type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffline: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    togglePlay: () => void;
    toogleLoop: () => void;
    toogleShuffle: () => void;
    setIsPlayingState: (state: boolean) => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;

};


export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffline, setIsShuffline] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }

    function togglePlay() {
        setIsPlaying(!isPlaying);
    }

    function toogleLoop() {
        setIsLooping(!isLooping);
    }

    function toogleShuffle() {
        setIsShuffline(!isShuffline);
    }

    function setIsPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

    function playNext() {
        if (isShuffline) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            isLooping,
            isShuffline,
            play,
            playList,
            playNext,
            playPrevious,
            isPlaying,
            togglePlay,
            setIsPlayingState,
            hasNext,
            hasPrevious,
            toogleLoop,
            toogleShuffle,
            clearPlayerState
        }}>

            {children}
        </PlayerContext.Provider>
    )
}


export const usePlayer = () => {
    return useContext(PlayerContext);
}