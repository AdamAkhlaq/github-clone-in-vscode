import { VSCODE_CLONE_SCHEME } from "./vscode-url";

export interface CloneTarget {
	// Stable identifier and the value the popup's <select> emits for this target.
	id: string;
	// Human-facing label shown in the "Open cloned repos in:" dropdown.
	label: string;
	// Base of the custom-scheme deep link this target clones through, e.g. VS
	// Code's `vscode://vscode.git/clone` (built by buildVscodeCloneUrl).
	urlScheme: string;
}

// ── Clone-target extension point ─────────────────────────────────────────────
// Single source of truth for the targets the popup offers. The popup builds its
// dropdown from this array, so adding a future target (VS Code Insiders,
// JetBrains/Cursor, "copy git URL", …) is one new entry here — no other file
// changes. VS Code is the only shipping target today; until a second one exists
// the popup is informational and the content script keeps its hardcoded VS Code
// deep link (see the persistence TODO in popup.ts).
export const CLONE_TARGETS: CloneTarget[] = [
	{
		id: "vscode",
		label: "VS Code",
		urlScheme: VSCODE_CLONE_SCHEME,
	},
];
