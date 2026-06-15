import { CLONE_TARGETS } from "./lib/clone-targets";

// Toolbar-popup behaviour: build the "Open cloned repos in:" dropdown from the
// shared CLONE_TARGETS list so adding a target is a one-place change. Today that
// is only VS Code, followed by a disabled hint that more are planned.
//
// TODO(persistence): when a second target ships, persist the user's choice
// (likely chrome.storage) and feed it into the content script's deep link. That
// needs a new permission, so it is intentionally deferred — the popup stays
// permission-neutral and purely informational while VS Code is the lone target.

function populateTargetSelect(select: HTMLSelectElement): void {
	for (const target of CLONE_TARGETS) {
		const option = document.createElement("option");
		option.value = target.id;
		option.textContent = target.label;
		select.appendChild(option);
	}

	// Forward-looking signal, not a real choice: disabled so it can't be picked
	// and never fakes support for a target that doesn't exist yet.
	const comingSoon = document.createElement("option");
	comingSoon.textContent = "More coming soon…";
	comingSoon.disabled = true;
	select.appendChild(comingSoon);
}

const select = document.getElementById("clone-target");
if (select instanceof HTMLSelectElement) {
	populateTargetSelect(select);
}
