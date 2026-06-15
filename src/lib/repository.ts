import { OWNER_PATTERN, REPO_PATTERN } from "./github-names";

export interface RepositoryInfo {
	owner: string;
	repo: string;
	isRepository: boolean;
}

// GitHub reserves these first path segments for its own pages, so an
// `/<segment>/<segment>`-shaped URL whose owner is one of them (e.g.
// `/marketplace/actions`, `/settings/profile`) is never a repository. They all
// satisfy OWNER_PATTERN, so the charset check alone can't exclude them.
const RESERVED_OWNERS = new Set([
	"orgs",
	"users",
	"settings",
	"notifications",
	"marketplace",
	"sponsors",
	"explore",
	"topics",
	"trending",
	"collections",
	"features",
	"pricing",
	"about",
	"apps",
	"codespaces",
	"dashboard",
	"new",
	"login",
	"join",
]);

export class RepositoryDetector {
	// Defaults read the live location so callers stay parameter-free; tests pass
	// explicit values to exercise every URL shape without a live page.
	static detect(
		href: string = window.location.href,
		pathname: string = window.location.pathname
	): RepositoryInfo {
		if (!href.includes("github.com")) {
			return { owner: "", repo: "", isRepository: false };
		}

		const [owner = "", repo = ""] = pathname.slice(1).split("/");

		// Allow-list, not deny-list: confirm a repository only when the first two
		// segments look like a real owner/repo — both match GitHub's name charset
		// and the owner isn't a reserved route. This rejects profiles, the root,
		// and reserved pages without enumerating every non-repo URL shape.
		const isRepository =
			OWNER_PATTERN.test(owner) &&
			REPO_PATTERN.test(repo) &&
			!RESERVED_OWNERS.has(owner.toLowerCase());

		return {
			owner: isRepository ? owner : "",
			repo: isRepository ? repo : "",
			isRepository,
		};
	}
}
