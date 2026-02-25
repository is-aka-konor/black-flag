import ActivitySheet from "./activity-sheet.mjs";

/**
 * Application for configuring Damage activities.
 */
export default class DamageSheet extends ActivitySheet {
	/** @override */
	static DEFAULT_OPTIONS = {
		classes: ["damage-activity"]
	};

	/* <><><><> <><><><> <><><><> <><><><> */

	/** @inheritDoc */
	static PARTS = {
		...super.PARTS,
		effect: {
			template: "systems/black-flag-ru/templates/activity/damage-effect.hbs",
			templates: [
				"systems/black-flag-ru/templates/activity/parts/activity-effects.hbs",
				"systems/black-flag-ru/templates/activity/parts/damage-damage.hbs",
				"systems/black-flag-ru/templates/activity/parts/damage-part.hbs",
				"systems/black-flag-ru/templates/activity/parts/damage-parts.hbs"
			]
		}
	};
}
