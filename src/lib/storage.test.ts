import { describe, expect, it } from "vitest";
import {
	loadSelectedTargetId,
	saveSelectedTargetId,
	watchSelectedTargetId,
} from "./storage";
import { DEFAULT_TARGET_ID } from "./clone-targets";

// Guards the popup against the window between adding the "storage" permission
// and reloading the extension, when chrome.storage is still undefined: the API
// must degrade silently rather than throw an uncaught rejection. `chrome` is
// undefined in the test environment, exercising exactly that path.
describe("storage without the chrome.storage API", () => {
	it("loads the default target id", async () => {
		expect(await loadSelectedTargetId()).toBe(DEFAULT_TARGET_ID);
	});

	it("resolves (does not throw) when saving", async () => {
		await expect(saveSelectedTargetId("cursor")).resolves.toBeUndefined();
	});

	it("is a no-op (does not throw) when watching", () => {
		expect(() => watchSelectedTargetId(() => {})).not.toThrow();
	});
});
