export interface RepositoryInfo {
	owner: string;
	repo: string;
	isRepository: boolean;
}

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

		const pathSegments = pathname.slice(1).split("/");
		if (pathSegments.length < 2) {
			return { owner: "", repo: "", isRepository: false };
		}

		const [owner, repo] = pathSegments;
		const excludedPaths = ["orgs", "users", "settings", "notifications"];

		// pathSegments.length is already >= 2 here (guarded above).
		const isRepository =
			repo !== "" && !repo.includes("?") && !excludedPaths.includes(owner);

		return { owner, repo, isRepository };
	}
}
