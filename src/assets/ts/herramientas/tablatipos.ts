import { tipo } from '../abstract/valores';

export const tipos= [
    [ tipo.NUMBER, tipo.STRING, tipo.NUMBER, tipo.NULL, tipo.NULL ],
    [ tipo.STRING, tipo.STRING, tipo.STRING, tipo.STRING, tipo.STRING ],
    [ tipo.NUMBER, tipo.STRING, tipo.BOOLEAN, tipo.NULL, tipo.NULL ],
    [ tipo.NULL, tipo.STRING, tipo.NULL, tipo.NULL, tipo.NULL ],
    [ tipo.NULL, tipo.STRING, tipo.NULL, tipo.NULL, tipo.ARRAY ]
]