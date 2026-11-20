import type * as React from "react";

/**
 * Rows = states, columns = variants (or any second axis). Used by the `States` stories.
 * The top-left header cell is labelled so the a11y check doesn't flag an empty <th>.
 */
export function StateGrid<R extends string, C extends string>({
  rows,
  columns,
  corner = "state",
  renderCell,
}: {
  rows: readonly R[];
  columns: readonly C[];
  corner?: string;
  renderCell: (row: R, column: C) => React.ReactNode;
}) {
  return (
    <table className="border-separate border-spacing-x-3 border-spacing-y-2 text-sm">
      <thead>
        <tr>
          <th className="pr-2 text-left font-medium text-muted-foreground">{corner}</th>
          {columns.map((column) => (
            <th key={column} className="text-left font-medium text-muted-foreground">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row}>
            <th className="pr-2 text-left font-medium text-muted-foreground">{row}</th>
            {columns.map((column) => (
              <td key={column}>{renderCell(row, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** `parameters.pseudo` that forces states on elements carrying `data-pseudo="<state>"`. */
export const pseudoByAttribute = {
  hover: ['[data-pseudo="hover"]'],
  focusVisible: ['[data-pseudo="focus-visible"]'],
  active: ['[data-pseudo="active"]'],
};

/** Inline SVG portrait so stories never request images from the network. */
export function avatarDataUri(initials: string, hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="hsl(${hue} 70% 55%)"/><text x="50%" y="54%" font-family="sans-serif" font-size="38" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Overlay stories that start open: keep them out of the Docs page (they'd stack modals there). */
export const openOverlayStory: { tags: string[]; parameters: { layout: "fullscreen" } } = {
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
};
