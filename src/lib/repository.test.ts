import { describe, expect, it } from "vitest";
import { RepositoryDetector } from "./repository";

describe("RepositoryDetector.detect", () => {
	it("detects a repository from an owner/repo URL", () => {
		expect(
			RepositoryDetector.detect(
				"https://github.com/facebook/react",
				"/facebook/react"
			)
		).toEqual({ owner: "facebook", repo: "react", isRepository: true });
	});

	it("detects a repository from a deeper repo sub-page", () => {
		expect(
			RepositoryDetector.detect(
				"https://github.com/facebook/react/issues/42",
				"/facebook/react/issues/42"
			)
		).toEqual({ owner: "facebook", repo: "react", isRepository: true });
	});

	it("treats non-github.com hosts as non-repositories", () => {
		expect(
			RepositoryDetector.detect(
				"https://example.com/facebook/react",
				"/facebook/react"
			)
		).toEqual({ owner: "", repo: "", isRepository: false });
	});

	it("rejects single-segment paths such as a user profile", () => {
		expect(
			RepositoryDetector.detect("https://github.com/facebook", "/facebook")
		).toEqual({ owner: "", repo: "", isRepository: false });
	});

	it("rejects the github.com root", () => {
		expect(RepositoryDetector.detect("https://github.com/", "/")).toEqual({
			owner: "",
			repo: "",
			isRepository: false,
		});
	});

	it("rejects an empty repo segment (trailing slash)", () => {
		const result = RepositoryDetector.detect(
			"https://github.com/facebook/",
			"/facebook/"
		);
		expect(result.isRepository).toBe(false);
	});

	it("detects repo names containing dots, underscores, and hyphens", () => {
		expect(
			RepositoryDetector.detect(
				"https://github.com/my-org/my.repo_name-1",
				"/my-org/my.repo_name-1"
			)
		).toEqual({ owner: "my-org", repo: "my.repo_name-1", isRepository: true });
	});

	it.each([
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
	])("excludes the reserved top-level route %s", (reserved) => {
		const result = RepositoryDetector.detect(
			`https://github.com/${reserved}/anything`,
			`/${reserved}/anything`
		);
		expect(result.isRepository).toBe(false);
	});

	it("excludes a reserved route regardless of casing", () => {
		const result = RepositoryDetector.detect(
			"https://github.com/Marketplace/actions",
			"/Marketplace/actions"
		);
		expect(result.isRepository).toBe(false);
	});

	it("rejects an owner segment outside GitHub's name charset", () => {
		const result = RepositoryDetector.detect(
			"https://github.com/foo~bar/repo",
			"/foo~bar/repo"
		);
		expect(result.isRepository).toBe(false);
	});
});
