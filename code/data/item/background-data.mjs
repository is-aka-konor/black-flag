import ItemDataModel from "../abstract/item-data-model.mjs";
import AdvancementTemplate from "./templates/advancement-template.mjs";
import ConceptTemplate from "./templates/concept-template.mjs";
import DescriptionTemplate from "./templates/description-template.mjs";

const BACKGROUND_ADVANCEMENT_TITLE_KEYS = {
	"Skill Proficiencies": "BF.Advancement.DefaultTitle.Background.SkillProficiencies",
	"Additional Proficiencies": "BF.Advancement.DefaultTitle.Background.AdditionalProficiencies",
	Talent: "BF.Advancement.DefaultTitle.Background.Talent"
};

/**
 * Data definition for Background items.
 * @mixes {AdvancementTemplate}
 * @mixes {ConceptTemplate}
 * @mixes {DescriptionTemplate}
 */
export default class BackgroundData extends ItemDataModel.mixin(
	AdvancementTemplate,
	ConceptTemplate,
	DescriptionTemplate
) {
	/* <><><><> <><><><> <><><><> <><><><> */
	/*         Model Configuration         */
	/* <><><><> <><><><> <><><><> <><><><> */

	/** @override */
	static LOCALIZATION_PREFIXES = ["BF.SOURCE"];

	/* <><><><> <><><><> <><><><> <><><><> */

	/** @inheritDoc */
	static metadata = Object.freeze(
		foundry.utils.mergeObject(
			super.metadata,
			{
				type: "background",
				category: "concept",
				legacyMixin: false,
				localization: "BF.Item.Type.Background",
				icon: "fa-solid fa-person-digging",
				img: "systems/black-flag-ru/artwork/types/background.svg",
				accentColor: "#0000aa",
				hasEffects: false,
				register: true
			},
			{ inplace: false }
		)
	);

	/* <><><><> <><><><> <><><><> <><><><> */
	/*            Data Migration           */
	/* <><><><> <><><><> <><><><> <><><><> */

	/** @inheritDoc */
	static migrateData(source) {
		super.migrateData(source);
		this._migrateSource(source);
		const advancement = source.system?.advancement;
		if (!advancement || typeof advancement !== "object") return;
		for (const entry of Object.values(advancement)) {
			if (!entry || typeof entry !== "object" || typeof entry.title !== "string") continue;
			entry.title = BACKGROUND_ADVANCEMENT_TITLE_KEYS[entry.title] ?? entry.title;
		}
	}

	/* <><><><> <><><><> <><><><> <><><><> */
	/*           Data Preparation          */
	/* <><><><> <><><><> <><><><> <><><><> */

	/** @inheritDoc */
	prepareDerivedData() {
		super.prepareDerivedData();
		this.prepareDescription();
	}

	/* <><><><> <><><><> <><><><> <><><><> */
	/*        Socket Event Handlers        */
	/* <><><><> <><><><> <><><><> <><><><> */

	/** @inheritDoc */
	async _preCreate(data, options, user) {
		if ((await super._preCreate(data, options, user)) === false) return false;
			if (data._id || foundry.utils.hasProperty(data, "system.advancement")) return;
			this._createInitialAdvancement([
				{
					type: "trait",
					title: "BF.Advancement.DefaultTitle.Background.SkillProficiencies",
					configuration: { choices: [{ count: 2, pool: "skills:*" }] }
				},
				{ type: "trait", title: "BF.Advancement.DefaultTitle.Background.AdditionalProficiencies" },
				{
					type: "chooseFeatures",
					title: "BF.Advancement.DefaultTitle.Background.Talent",
					configuration: {
						choices: { 0: 1 },
						allowDrops: false,
					type: "talent"
				}
			}
		]);
	}

	/* <><><><> <><><><> <><><><> <><><><> */

	/** @inheritDoc */
	async _onCreate(data, options, userId) {
		await super._onCreate(data, options, userId);
		this._onCreateApplyAdvancement(data, options, userId);
	}

	/* <><><><> <><><><> <><><><> <><><><> */

	/** @inheritDoc */
	async _onDelete(options, userId) {
		await super._onDelete(options, userId);
		this._onDeleteRevertAdvancement(options, userId);
	}
}
