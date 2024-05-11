import * as chroma from "chroma.ts";

/**
 * Generate a random color written life that #FE109C
 */
export function generateRandomColor(): string {
        return chroma.random().toString();
}

/**
 * Build a color range from a list of colors
 * @param colors First color boundary
 * @param scaleRange Range of colors to create, default value = 10
 */
export function buildColorRangeFromList(colors: string[], scaleRange: number = 10): string[] {
        if (colors.length === 0) {
                return ['#FFFFFF'];
        }
        return chroma.scale(colors)
            .colors(scaleRange);
}
