import { afterEach, describe, expect, it } from "vitest";
import { detectBranch } from "./branch";

// Builds a detached document whose markup mirrors the relevant bits of GitHub's
// file-navigation header, so the switcher read can be exercised without a live
// page. `branchControls` is raw HTML for the elements bearing the git-branch
// octicon (the ref switcher, and optionally the "N Branches" overview link).
function docWith(branchControls: string): Document {
	const parsed = new DOMParser().parseFromString(
		`<!doctype html><body>${branchControls}</body>`,
		"text/html"
	);
	return parsed;
}

const octicon = '<svg class="octicon octicon-git-branch"></svg>';
const emptyDoc = () => docWith("");

afterEach(() => {
	document.body.innerHTML = "";
});

describe("detectBranch", () => {
	it("reads the current ref from the switcher on the repo root", () => {
		const doc = docWith(`<button>${octicon}<span>main</span></button>`);
		// No /tree/ in the URL on the root, so this only resolves via the switcher.
		expect(detectBranch("/facebook/react", doc)).toBe("main");
	});

	it("prefers the switcher over the URL ref segment", () => {
		const doc = docWith(`<button>${octicon}<span>develop</span></button>`);
		expect(detectBranch("/facebook/react/tree/main", doc)).toBe("develop");
	});

	it("skips the 'N Branches' overview link and uses the ref switcher", () => {
		const doc = docWith(
			`<a href="/facebook/react/branches">${octicon} 12 Branches</a>` +
				`<button>${octicon}<span>main</span></button>`
		);
		expect(detectBranch("/facebook/react", doc)).toBe("main");
	});

	it("keeps a nested ref intact when read from the switcher", () => {
		const doc = docWith(`<button>${octicon}<span>release/v2</span></button>`);
		expect(detectBranch("/my-org/repo", doc)).toBe("release/v2");
	});

	it("falls back to the /tree/<branch> URL segment", () => {
		expect(detectBranch("/facebook/react/tree/canary", emptyDoc())).toBe(
			"canary"
		);
	});

	it("reads the branch from a /blob/<branch>/<path> file view", () => {
		expect(
			detectBranch(
				"/facebook/react/blob/main/packages/react/index.js",
				emptyDoc()
			)
		).toBe("main");
	});

	it("takes the ref segment when browsing a subdirectory of a branch", () => {
		expect(detectBranch("/facebook/react/tree/main/packages", emptyDoc())).toBe(
			"main"
		);
	});

	it("returns null when neither the switcher nor the URL names a ref", () => {
		expect(detectBranch("/facebook/react", emptyDoc())).toBeNull();
	});
});
