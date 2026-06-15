import { describe, expect, it } from "vitest";
import { buildCloneUrl } from "./clone-url";
import { CLONE_TARGETS } from "./clone-targets";

const VSCODE_SCHEME = "vscode://vscode.git/clone";

describe("buildCloneUrl", () => {
	it("builds the deep link for a normal owner/repo", () => {
		expect(buildCloneUrl(VSCODE_SCHEME, "facebook", "react")).toBe(
			"vscode://vscode.git/clone?url=https://github.com/facebook/react.git"
		);
	});

	it("accepts repo names with dots, underscores, and hyphens", () => {
		expect(buildCloneUrl(VSCODE_SCHEME, "my-org", "my.cool_repo-v2")).toBe(
			"vscode://vscode.git/clone?url=https://github.com/my-org/my.cool_repo-v2.git"
		);
	});

	it("honours the target's scheme without touching the rest of the link", () => {
		expect(
			buildCloneUrl("cursor://vscode.git/clone", "facebook", "react")
		).toBe(
			"cursor://vscode.git/clone?url=https://github.com/facebook/react.git"
		);
		expect(
			buildCloneUrl("vscode-insiders://vscode.git/clone", "facebook", "react")
		).toBe(
			"vscode-insiders://vscode.git/clone?url=https://github.com/facebook/react.git"
		);
	});

	it("builds a valid link for every registered clone target", () => {
		for (const target of CLONE_TARGETS) {
			expect(buildCloneUrl(target.urlScheme, "facebook", "react")).toBe(
				`${target.urlScheme}?url=https://github.com/facebook/react.git`
			);
		}
	});

	it.each([
		["empty owner", "", "react"],
		["empty repo", "facebook", ""],
		["whitespace in repo", "facebook", "re act"],
		["query character in repo", "facebook", "react?foo=bar"],
		["slash in owner", "face/book", "react"],
		["dot in owner", "face.book", "react"],
	])("returns null for %s", (_label, owner, repo) => {
		expect(buildCloneUrl(VSCODE_SCHEME, owner, repo)).toBeNull();
	});
});
