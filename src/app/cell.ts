
export class Cell {
    i: number;
    j: number;
    value: number;
    notes: boolean[][];
    default: boolean;
    selected: HighlightLevel;
    greyedOut: boolean;
    status: Status;
}

export enum Status {
    NORMAL,
    INCORRECT

}

export enum HighlightLevel {
    NO_HIGHLIGHT,
    SELECTED,
    GHOST_SELECTED,
    HIGHLIGHTED
}

export function notHighlight(highlightLevel: HighlightLevel): HighlightLevel {
    switch (highlightLevel) {

        case HighlightLevel.NO_HIGHLIGHT:
            return HighlightLevel.SELECTED;
        case HighlightLevel.GHOST_SELECTED:
        case HighlightLevel.SELECTED:
            return HighlightLevel.NO_HIGHLIGHT;
        default:
            return HighlightLevel.NO_HIGHLIGHT;
    }
}
