// GitHub logins are alphanumeric with hyphens; repository names additionally
// allow dots and underscores. These patterns describe GitHub's name format and
// serve as the shared allow-list for both detecting repository URLs
// (repository.ts) and rejecting segments that could break out of the editor's
// clone deep link (clone-url.ts).
export const OWNER_PATTERN = /^[A-Za-z0-9-]+$/;
export const REPO_PATTERN = /^[A-Za-z0-9._-]+$/;
