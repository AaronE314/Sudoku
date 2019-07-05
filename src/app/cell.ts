
export class Cell {
    i: number;
    j: number;
    value: number;
    notes: boolean[][];
    default: boolean;
    selected: HighlightLevel;
}

export enum HighlightLevel {
    NO_HIGHLIGHT = 1,
    SELECTED = 2,
    GHOST_SELECTED = 3,
    GREYED_OUT = 4,
    HIGHLIGHTED = 5
}

export function notHighlight(highlightLevel: HighlightLevel): HighlightLevel {
    switch (highlightLevel) {

        case HighlightLevel.NO_HIGHLIGHT:
            return HighlightLevel.SELECTED;
        case HighlightLevel.GHOST_SELECTED:
        case HighlightLevel.GREYED_OUT:
        case HighlightLevel.SELECTED:
            return HighlightLevel.NO_HIGHLIGHT;
        default:
            return HighlightLevel.NO_HIGHLIGHT;
    }
}
