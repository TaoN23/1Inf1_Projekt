 /**
 * Die verschiedenen Sprite Typen
 * @enum {string}
 */
export enum SpriteTypes {
    VOID = 'Void',
    WALL = 'Wall',
    BABA = 'Baba',
    FLAG = 'Flag',
    IS = 'Is',
    T_BABA = 'T_Baba',
    T_WALL = 'T_Wall',
    T_FLAG = 'T_Flag',
    T_WIN = 'T_Win',
    T_YOU = 'T_You',
    T_STOP = 'T_Stop',
}


/**
 * Die Text-Objekte
 * @enum {SpriteTypes}
 */
export enum SpriteTextObjectType{
    T_BABA = SpriteTypes.T_BABA,
    T_WALL = SpriteTypes.T_WALL,
    T_FLAG = SpriteTypes.T_FLAG,
}

/**
 * Abbildung der Spritetextobjekte auf entsprechende Spritetypen
 * @constant
 * @type {object}
 */
export const SpriteTextObjectTypes: any = {
    'T_Baba': SpriteTypes.T_BABA,
    'T_Wall': SpriteTypes.T_WALL,
    'T_Flag': SpriteTypes.T_FLAG,
}


/**
 * Abbildung der Spritetext-Verb-Objekte auf entsprechende Spritetypen
 * @constant
 * @type {object}
 */
export const SpriteTextVerbObjectTypes: any= {
    'T_Win': SpriteTypes.T_WIN,
    'T_You': SpriteTypes.T_YOU,
    'T_Stop': SpriteTypes.T_STOP,
}


/**
 * Abbildung der Spritetexte auf entsprechende Spritetypen
 * @constant
 * @type {object}
 */
export const SpriteTextToSprite: any = {
    'T_Baba' : SpriteTypes.BABA,
    'T_Wall' : SpriteTypes.WALL,
    'T_Flag' : SpriteTypes.FLAG,
}



/**
 * Abbildung der beweglichen Sprites auf entsprechende Spritetypen.
 * @constant
 * @type {object}
 */
export const moveAble: any = {
    'T_Baba' : SpriteTypes.BABA,
    'T_Wall' : SpriteTypes.WALL,
    'T_Flag' : SpriteTypes.FLAG,
    'T_You' : SpriteTypes.T_YOU,
    'Is' : SpriteTypes.IS,
    'T_Stop' : SpriteTypes.T_STOP,
}