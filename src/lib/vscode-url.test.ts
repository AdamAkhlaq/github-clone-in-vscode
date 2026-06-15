import { describe, expect, it } from "vitest";
import { buildVscodeCloneUrl } from "./vscode-url";

describe("buildVscodeCloneUrl", () => {
	it("builds the deep link for a normal owner/repo", () => {
		expect(buildVscodeCloneUrl("facebook", "react")).toBe(
			"vscode://vscode.git/clone?url=https://github.com/facebook/react.git"
		);
	});

	it("accepts repo names with dots, underscores, and hyphens", () => {
		expect(buildVscodeCloneUrl("my-org", "my.cool_repo-v2")).toBe(
			"vscode://vscode.git/clone?url=https://github.com/my-org/my.cool_repo-v2.git"
		);
	});

	it.each([
		["empty owner", "", "react"],
		["empty repo", "facebook", ""],
		["whitespace in repo", "facebook", "re act"],
		["query character in repo", "facebook", "react?foo=bar"],
		["slash in owner", "face/book", "react"],
		["dot in owner", "face.book", "react"],
	])("returns null for %s", (_label, owner, repo) => {
		expect(buildVscodeCloneUrl(owner, repo)).toBeNull();
	});
});
