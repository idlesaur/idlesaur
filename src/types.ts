export type RequireOnly<T, K extends keyof T> = Pick<T, K> &
    Partial<Omit<T, K>>;

export type SessionUser = {
    id: string;
    name?: string | null;
    userName?: string | null;
    email?: string | null;
    image?: string | null;
};

export type HighScore = {
    key: string;
    rank: number;
    publicProfile: boolean;
    userName: string | null;
    score: number;
};
