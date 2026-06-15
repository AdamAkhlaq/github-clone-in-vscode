import { OWNER_PATTERN, REPO_PATTERN } from "./github-names";

// owner/repo come straight from location.pathname, so a segment containing `?`,
// `#`, `&`, or whitespace would break out of the query and inject parameters
// into the editor's protocol handler. Reject anything outside GitHub's name
// charset rather than hand a malformed URL to the handler.

/**
 * Builds an editor clone deep link (`<scheme>?url=…`) for an owner/repo pair,
 * or returns null when either segment is invalid. `scheme` is the full base of
 * the target's clone handler, e.g. `vscode://vscode.git/clone` or
 * `cursor://vscode.git/clone` (see CLONE_TARGETS). Both path segments are
 * validated and `encodeURIComponent`-escaped so the link can never be malformed
 * or carry injected query parameters.
 */
export function buildCloneUrl(
	scheme: string,
	owner: string,
	repo: string
): string | null {
	if (!OWNER_PATTERN.test(owner) || !REPO_PATTERN.test(repo)) {
		return null;
	}

	const cloneUrl = `https://github.com/${encodeURIComponent(
		owner
	)}/${encodeURIComponent(repo)}.git`;
	return `${scheme}?url=${cloneUrl}`;
}
