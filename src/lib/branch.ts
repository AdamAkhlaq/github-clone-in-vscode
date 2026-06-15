// The .zip archive URL needs the ref the user is looking at so the download
// matches GitHub's own "Download ZIP" (and lands a clean `repo-<branch>.zip`
// filename). We read it from the live page rather than guess: the ref switcher
// in GitHub's file-navigation header is the one place that names the current
// branch unambiguously, including on the repo root where the URL omits it.
//
// Detection is best-effort by design — every caller falls back to the
// name-agnostic `HEAD` archive when this returns null (see buildArchiveUrl), so
// a missed read degrades to "default branch" rather than breaking the download.

/**
 * Resolves the branch the page is showing, or null when it can't be determined.
 * Tries the ref-switcher button first (authoritative, and present even on the
 * repo root), then the `/tree|blob/<branch>` URL segment as a fallback. Defaults
 * read the live document/location so callers stay parameter-free; tests pass
 * explicit values to exercise every shape without a live page.
 */
export function detectBranch(
	pathname: string = window.location.pathname,
	doc: Document = document
): string | null {
	return readBranchFromSwitcher(doc) ?? readBranchFromUrl(pathname);
}

/**
 * Reads the current ref from GitHub's branch/tag switcher. The git-branch
 * octicon is a stable class (unlike Primer's rotating module hashes), so we find
 * it and take its enclosing control's text. The same octicon also labels the
 * "N Branches" overview link, whose text carries a digit/space — so we skip any
 * candidate that isn't a bare, whitespace-free ref and try the next.
 */
function readBranchFromSwitcher(doc: Document): string | null {
	const octicons = Array.from(doc.querySelectorAll(".octicon-git-branch"));
	for (const octicon of octicons) {
		const host = octicon.closest("button, summary, a");
		const text = host?.textContent?.trim();
		// Refs never contain whitespace; bundled label text ("12 Branches") does.
		if (text && !/\s/.test(text)) {
			return text;
		}
	}
	return null;
}

/**
 * Pulls the branch from a `/<owner>/<repo>/(tree|blob)/<branch>[/…]` path. Only
 * the first segment after tree/blob is taken, so a ref containing "/" resolves
 * correctly only via the switcher above; this fallback covers the common
 * single-segment case when the switcher can't be read.
 */
function readBranchFromUrl(pathname: string): string | null {
	const segments = pathname.split("/").filter(Boolean);
	const isRefView = segments[2] === "tree" || segments[2] === "blob";
	return isRefView && segments[3] ? segments[3] : null;
}
