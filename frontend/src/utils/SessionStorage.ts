const read = <T>(key: string): T | null => {
    const value = window.sessionStorage.getItem(key);

    if (value) {
        return JSON.parse(value) as T;
    }

    return null;
};

const write = <T>(key: string, value: T) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
};

const remove = (key: string) => window.sessionStorage.removeItem(key);

const SessionStorage = { read, write, remove };

export default SessionStorage;
