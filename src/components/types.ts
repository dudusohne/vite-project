export interface Pokemon {
    id: number;
    entry_number?: number;
    pokemon_species?: {
      name?: string;
      url?: string;
    };
    name?: string;
    color?: string;
    description?: any;
    abilities: {
        ability: {
            ability: {
                name: string;
                url?: string;
            }
        };
    };
    height?: number;
    weight?: number;
    types?: {
        type: {
            type: {
                name: string;
                url?: string;
            }
        }
    }
    base_experience?: number;
    img?: any
    clicked?: () => void;
}

