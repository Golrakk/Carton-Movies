import _prefs from './prefs.json';

export interface Preferences {
    id: number;
    name: string;
}

export const prefs = _prefs as Preferences[];