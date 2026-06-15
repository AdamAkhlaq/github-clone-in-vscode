import { OWNER_PATTERN, REPO_PATTERN } from "./github-names";

// owner/repo come straight from location.pathname, so a segment containing `?`,
// `#`, `&`, or whitespace would break out of the query and inject parameters
// into VS Code's protocol handler. Reject anything outside GitHub's name charset
// rather than hand a malformed URL to the handler.

/**
 * Builds the `vscode://vscode.git/clone` deep link for an owner/repo pair, or
 * returns null when either segment is invalid. Both segments are validated and
 * `encodeURIComponent`-escaped so the link can never be malformed or carry
 * injected query parameters.
 */
export function buildVscodeCloneUrl(
	owner: string,
	repo: string
): string | null {
	if (!OWNER_PATTERN.test(owner) || !REPO_PATTERN.test(repo)) {
		return null;
	}

	const cloneUrl = `https://github.com/${encodeURIComponent(
		owner
	)}/${encodeURIComponent(repo)}.git`;
	return `vscode://vscode.git/clone?url=${cloneUrl}`;
}
