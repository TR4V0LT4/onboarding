import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, char, varchar, text, timestamp, tinyint, date, int, index, unique, foreignKey, bigint, datetime, mysqlEnum, decimal, float, longtext, double, time, mediumtext, json } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const about_medindex = mysqlTable("about_medindex", {
	id: char("id", { length: 36 }).notNull(),
	title: varchar("title", { length: 255 }),
	description: text("description"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		about_medindex_id: primaryKey({ columns: [table.id], name: "about_medindex_id"}),
	}
});

export const achats = mysqlTable("achats", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		achats_id: primaryKey({ columns: [table.id], name: "achats_id"}),
	}
});

export const actualite_like = mysqlTable("actualite_like", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	actualite_id: char("actualite_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		actualite_like_id: primaryKey({ columns: [table.id], name: "actualite_like_id"}),
	}
});

export const actualities = mysqlTable("actualities", {
	id: char("id", { length: 36 }).notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	content: text("content"),
	produit_id: char("produit_id", { length: 36 }),
	image: varchar("image", { length: 255 }),
	updated_by: char("updated_by", { length: 36 }),
	created_by: char("created_by", { length: 36 }),
	status: tinyint("status").default(1).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	end_date: date("end_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	start_date: date("start_date", { mode: 'string' }),
	libelle: text("libelle"),
	type: text("type"),
	source: text("source"),
	link: text("link"),
	preview: text("preview"),
	logo: text("logo"),
	image_web: text("image_web"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		actualities_id: primaryKey({ columns: [table.id], name: "actualities_id"}),
	}
});

export const actualities_destinations = mysqlTable("actualities_destinations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	destinations_id: int("destinations_id").notNull(),
	actualities_id: char("actualities_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		actualities_destinations_id: primaryKey({ columns: [table.id], name: "actualities_destinations_id"}),
	}
});

export const admin_menu = mysqlTable("admin_menu", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	parent_id: int("parent_id").default(0).notNull(),
	order: int("order").default(0).notNull(),
	title: varchar("title", { length: 50 }).notNull(),
	icon: varchar("icon", { length: 50 }).notNull(),
	uri: varchar("uri", { length: 191 }),
	permission: varchar("permission", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		admin_menu_id: primaryKey({ columns: [table.id], name: "admin_menu_id"}),
	}
});

export const admin_operation_log = mysqlTable("admin_operation_log", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	path: varchar("path", { length: 191 }).notNull(),
	method: varchar("method", { length: 10 }).notNull(),
	ip: varchar("ip", { length: 191 }).notNull(),
	input: text("input").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		user_id_idx: index("user_id_idx").on(table.user_id),
		admin_operation_log_id: primaryKey({ columns: [table.id], name: "admin_operation_log_id"}),
	}
});

export const admin_permissions = mysqlTable("admin_permissions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	slug: varchar("slug", { length: 50 }).notNull(),
	http_method: varchar("http_method", { length: 191 }),
	http_path: text("http_path"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		admin_permissions_id: primaryKey({ columns: [table.id], name: "admin_permissions_id"}),
		admin_permissions_name_unique: unique("admin_permissions_name_unique").on(table.name),
		admin_permissions_slug_unique: unique("admin_permissions_slug_unique").on(table.slug),
	}
});

export const admin_role_menu = mysqlTable("admin_role_menu", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	role_id: int("role_id").notNull(),
	menu_id: int("menu_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		role_id_menu_id_idx: index("role_id_menu_id_idx").on(table.role_id, table.menu_id),
		admin_role_menu_my_row_id: primaryKey({ columns: [table.my_row_id], name: "admin_role_menu_my_row_id"}),
	}
});

export const admin_role_permissions = mysqlTable("admin_role_permissions", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	role_id: int("role_id").notNull(),
	permission_id: int("permission_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		role_id_permission_id_idx: index("role_id_permission_id_idx").on(table.role_id, table.permission_id),
		admin_role_permissions_my_row_id: primaryKey({ columns: [table.my_row_id], name: "admin_role_permissions_my_row_id"}),
	}
});

export const admin_role_users = mysqlTable("admin_role_users", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	role_id: int("role_id").notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		role_id_user_id_idx: index("role_id_user_id_idx").on(table.role_id, table.user_id),
		admin_role_users_my_row_id: primaryKey({ columns: [table.my_row_id], name: "admin_role_users_my_row_id"}),
	}
});

export const admin_roles = mysqlTable("admin_roles", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	slug: varchar("slug", { length: 50 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		admin_roles_id: primaryKey({ columns: [table.id], name: "admin_roles_id"}),
		admin_roles_name_unique: unique("admin_roles_name_unique").on(table.name),
		admin_roles_slug_unique: unique("admin_roles_slug_unique").on(table.slug),
	}
});

export const admin_user_permissions = mysqlTable("admin_user_permissions", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	permission_id: int("permission_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		user_id_permission_id_idx: index("user_id_permission_id_idx").on(table.user_id, table.permission_id),
		admin_user_permissions_my_row_id: primaryKey({ columns: [table.my_row_id], name: "admin_user_permissions_my_row_id"}),
	}
});

export const admin_users = mysqlTable("admin_users", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	username: varchar("username", { length: 190 }).notNull(),
	password: varchar("password", { length: 60 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	avatar: varchar("avatar", { length: 191 }),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		admin_users_id: primaryKey({ columns: [table.id], name: "admin_users_id"}),
		admin_users_username_unique: unique("admin_users_username_unique").on(table.username),
	}
});

export const adverse_effects = mysqlTable("adverse_effects", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	pathology_id: char("pathology_id", { length: 36 }).references(() => pathologies.id),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	system_adverse_effect_id: char("system_adverse_effect_id", { length: 36 }),
	type: text("type"),
	frequency: text("frequency"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
},
(table) => {
	return {
		adverse_effects_my_row_id: primaryKey({ columns: [table.my_row_id], name: "adverse_effects_my_row_id"}),
	}
});

export const affectationroles = mysqlTable("affectationroles", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }),
	cree_par: char("cree_par", { length: 36 }),
	id_action: bigint("id_action", { mode: "number" }),
	state: int("state").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		affectationroles_id: primaryKey({ columns: [table.id], name: "affectationroles_id"}),
	}
});

export const agenda = mysqlTable("agenda", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	titre: varchar("titre", { length: 191 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	jour: date("jour", { mode: 'string' }).notNull(),
	description: text("description").notNull(),
	event_id: int("event_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		agenda_id: primaryKey({ columns: [table.id], name: "agenda_id"}),
	}
});

export const ages = mysqlTable("ages", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		ages_id: primaryKey({ columns: [table.id], name: "ages_id"}),
	}
});

export const alt_ids_company = mysqlTable("alt_ids_company", {
	id: char("id", { length: 36 }).notNull(),
	company_id: char("company_id", { length: 36 }).notNull().references(() => companies.id),
	type: varchar("type", { length: 255 }),
	value: varchar("value", { length: 255 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		alt_ids_company_id: primaryKey({ columns: [table.id], name: "alt_ids_company_id"}),
	}
});

export const alt_name_suppliers = mysqlTable("alt_name_suppliers", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	supplier_id: char("supplier_id", { length: 36 }).references(() => suppliers.id),
	name: text("name"),
	referrer_type: mysqlEnum("referrer_type", ['blink','sobrus']),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		alt_name_suppliers_my_row_id: primaryKey({ columns: [table.my_row_id], name: "alt_name_suppliers_my_row_id"}),
	}
});

export const alt_name_wholesalers = mysqlTable("alt_name_wholesalers", {
	id: char("id", { length: 36 }).notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }).references(() => companies.id),
	name: text("name"),
	referrer_type: mysqlEnum("referrer_type", ['blink','sobrus','sentence_similarity']).default('sentence_similarity'),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		alt_name_wholesalers_id: primaryKey({ columns: [table.id], name: "alt_name_wholesalers_id"}),
	}
});

export const alt_names = mysqlTable("alt_names", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	name: varchar("name", { length: 255 }),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	company_id: char("company_id", { length: 36 }).references(() => companies.id),
	referrer_type: mysqlEnum("referrer_type", ['direct partner','integration partner','lab','wholesaler','sobrus','ANAM']),
	source: text("source"),
},
(table) => {
	return {
		alt_names_id: primaryKey({ columns: [table.id], name: "alt_names_id"}),
	}
});

export const alt_products = mysqlTable("alt_products", {
	id: char("id", { length: 36 }).notNull(),
	name: text("name").notNull(),
	source: text("source"),
	code_bar: text("code_bar"),
	presentation: text("presentation"),
	description: text("description"),
	nfc_code: text("nfc_code"),
	atc_code: text("atc_code"),
	is_generic: tinyint("is_generic"),
	pph: double("pph", { precision: 8, scale: 2 }),
	ppgro: double("ppgro", { precision: 8, scale: 2 }),
	ppv: double("ppv", { precision: 8, scale: 2 }),
	ph: double("ph", { precision: 8, scale: 2 }),
	tva: double("tva", { precision: 8, scale: 2 }),
	molecule: text("molecule"),
	laboratory: text("laboratory"),
	dosage: varchar("dosage", { length: 191 }),
	unit: text("unit"),
	brand_name: text("brand_name"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	code_product: text("code_product"),
	wholesaler_id: char("wholesaler_id", { length: 36 }).references(() => companies.id),
	ppvr: double("ppvr", { precision: 8, scale: 2 }),
	phr: double("phr", { precision: 8, scale: 2 }),
	type_med: text("type_med"),
	classe_therapeutique: text("classe_therapeutique"),
	check: tinyint("check").default(0),
	table: text("table"),
	remboursement: tinyint("remboursement"),
},
(table) => {
	return {
		alt_products_id: primaryKey({ columns: [table.id], name: "alt_products_id"}),
	}
});

export const animation = mysqlTable("animation", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	type: varchar("type", { length: 191 }),
	parrainage_id: int("parrainage_id"),
	date_debut: datetime("date_debut", { mode: 'string'}),
	date_fin: datetime("date_fin", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		animation_id: primaryKey({ columns: [table.id], name: "animation_id"}),
	}
});

export const animation_winners = mysqlTable("animation_winners", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	animation_id: int("animation_id"),
	gift_id: int("gift_id"),
	cms_users_id: char("cms_users_id", { length: 36 }),
	qr_code_id: int("qr_code_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		animation_winners_id: primaryKey({ columns: [table.id], name: "animation_winners_id"}),
	}
});

export const answer_zone_labels = mysqlTable("answer_zone_labels", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	question_id: int("question_id").notNull(),
	answer_zone_id: int("answer_zone_id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		answer_zone_labels_id: primaryKey({ columns: [table.id], name: "answer_zone_labels_id"}),
	}
});

export const answer_zones = mysqlTable("answer_zones", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		answer_zones_id: primaryKey({ columns: [table.id], name: "answer_zones_id"}),
	}
});

export const answers = mysqlTable("answers", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	question_id: int("question_id").notNull(),
	parent_id: int("parent_id"),
	name: varchar("name", { length: 191 }).notNull(),
	is_correct: tinyint("is_correct").default(0).notNull(),
	position: int("position"),
	initial_position: int("initial_position"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	answer_zone_id: int("answer_zone_id"),
},
(table) => {
	return {
		answers_id: primaryKey({ columns: [table.id], name: "answers_id"}),
	}
});

export const apikeys = mysqlTable("apikeys", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	api_key: varchar("api_key", { length: 255 }).notNull(),
	rate_limit: int("rate_limit").default(60).notNull(),
	credit_limit: int("credit_limit").default(60).notNull(),
	request_limit: int("request_limit").default(5000).notNull(),
	active: tinyint("active").default(1).notNull(),
	name: varchar("name", { length: 255 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		apikeys_my_row_id: primaryKey({ columns: [table.my_row_id], name: "apikeys_my_row_id"}),
	}
});

export const app_consultations_log = mysqlTable("app_consultations_log", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: int("cms_users_id").notNull(),
	consultation_id: int("consultation_id"),
	type: varchar("type", { length: 191 }),
	table_name: varchar("table_name", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		app_consultations_log_id: primaryKey({ columns: [table.id], name: "app_consultations_log_id"}),
	}
});

export const associations = mysqlTable("associations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	reductions_id: int("reductions_id").notNull(),
	element_id: int("element_id").notNull(),
	packs_id: int("packs_id"),
	type: varchar("type", { length: 191 }).notNull(),
	price_min: double("price_min", { precision: 8, scale: 2 }),
	price_max: double("price_max", { precision: 8, scale: 2 }),
	qty_min: double("qty_min", { precision: 8, scale: 2 }),
	qty_max: double("qty_max", { precision: 8, scale: 2 }),
	qte_ob: double("qte_ob", { precision: 8, scale: 2 }),
	escompte: double("escompte", { precision: 8, scale: 2 }),
	apply_qty_ob: varchar("apply_qty_ob", { length: 191 }),
	apply_qty: varchar("apply_qty", { length: 191 }),
	apply_price: varchar("apply_price", { length: 191 }),
},
(table) => {
	return {
		associations_id: primaryKey({ columns: [table.id], name: "associations_id"}),
	}
});

export const associations_reductions = mysqlTable("associations_reductions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	associations_id: int("associations_id").notNull(),
	reduction_types_id: int("reduction_types_id").notNull(),
	operator: varchar("operator", { length: 191 }).notNull(),
	products_id: int("products_id"),
	value: double("value", { precision: 8, scale: 2 }).notNull(),
	price_min: double("price_min", { precision: 8, scale: 2 }),
	price_max: double("price_max", { precision: 8, scale: 2 }),
	qty_min: double("qty_min", { precision: 8, scale: 2 }),
	qty_max: double("qty_max", { precision: 8, scale: 2 }),
	qte_ob: double("qte_ob", { precision: 8, scale: 2 }),
	apply_qty_ob: varchar("apply_qty_ob", { length: 191 }),
	apply_qty: varchar("apply_qty", { length: 191 }),
	apply_price: varchar("apply_price", { length: 191 }),
},
(table) => {
	return {
		associations_reductions_id: primaryKey({ columns: [table.id], name: "associations_reductions_id"}),
	}
});

export const atcs = mysqlTable("atcs", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	english_label: text("english_label"),
	french_label: text("french_label"),
},
(table) => {
	return {
		atcs_id: primaryKey({ columns: [table.id], name: "atcs_id"}),
	}
});

export const attribute_option_groups = mysqlTable("attribute_option_groups", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	gift_id: int("gift_id").notNull(),
	attribute_option_id: int("attribute_option_id").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		attribute_option_groups_id: primaryKey({ columns: [table.id], name: "attribute_option_groups_id"}),
	}
});

export const attribute_options = mysqlTable("attribute_options", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	attribute_id: int("attribute_id").notNull(),
	sort_order: int("sort_order"),
	name: varchar("name", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		attribute_options_id: primaryKey({ columns: [table.id], name: "attribute_options_id"}),
	}
});

export const attributes = mysqlTable("attributes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	code: varchar("code", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }),
	type: varchar("type", { length: 191 }).notNull(),
	position: int("position"),
	is_filterable: int("is_filterable").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		attributes_id: primaryKey({ columns: [table.id], name: "attributes_id"}),
	}
});

export const auto_notifications = mysqlTable("auto_notifications", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	type: varchar("type", { length: 191 }).notNull(),
	element: varchar("element", { length: 191 }).notNull(),
	elements_id: varchar("elements_id", { length: 191 }).notNull(),
	destination: varchar("destination", { length: 191 }).notNull(),
	date_diffusion: datetime("date_diffusion", { mode: 'string'}).notNull(),
	content: text("content").notNull(),
	statut: tinyint("statut").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		auto_notifications_id: primaryKey({ columns: [table.id], name: "auto_notifications_id"}),
	}
});

export const avoir_emis = mysqlTable("avoir_emis", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	fournisseur_id: char("fournisseur_id", { length: 36 }),
	creer_par: char("creer_par", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	statu: int("statu"),
	state: int("state").default(0),
	reference: varchar("reference", { length: 45 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		avoir_emis_id: primaryKey({ columns: [table.id], name: "avoir_emis_id"}),
	}
});

export const avoir_recus = mysqlTable("avoir_recus", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	avoiremis_id: bigint("avoiremis_id", { mode: "number" }).notNull(),
	fournisseur_id: char("fournisseur_id", { length: 36 }),
	creer_par: char("creer_par", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	reference: varchar("reference", { length: 45 }),
	mode_paiement: int("mode_paiement").default(0),
	state: tinyint("state").default(0),
	archive: tinyint("archive").default(0).notNull(),
	date_archivage: timestamp("date_archivage", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		avoir_recus_id: primaryKey({ columns: [table.id], name: "avoir_recus_id"}),
	}
});

export const bl_scan = mysqlTable("bl_scan", {
	id: char("id", { length: 36 }).notNull(),
	company_id: char("company_id", { length: 36 }).notNull(),
	pdf_path: text("pdf_path"),
	scan_json: text("scan_json"),
	bl_json: text("bl_json"),
	error_json: text("error_json"),
	delivery_id: int("delivery_id").notNull(),
	reference: text("reference").notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }).notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	status: mysqlEnum("status", ['uploaded','pdf_generated','scanned','converted','erroner','validated']).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	total_rectified: decimal("total_rectified", { precision: 8, scale: 2 }).default('0.00'),
},
(table) => {
	return {
		bl_scan_id: primaryKey({ columns: [table.id], name: "bl_scan_id"}),
	}
});

export const bl_scan_paths = mysqlTable("bl_scan_paths", {
	id: char("id", { length: 36 }).notNull(),
	bl_scan_id: char("bl_scan_id", { length: 36 }).notNull(),
	path: varchar("path", { length: 255 }).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		bl_scan_paths_id: primaryKey({ columns: [table.id], name: "bl_scan_paths_id"}),
	}
});

export const blink_generated_grossiste_ids = mysqlTable("blink_generated_grossiste_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		blink_generated_grossiste_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "blink_generated_grossiste_ids_my_row_id"}),
	}
});

export const blink_generated_laboratories_ids = mysqlTable("blink_generated_laboratories_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		blink_generated_laboratories_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "blink_generated_laboratories_ids_my_row_id"}),
	}
});

export const blink_generated_pharmacies_ids = mysqlTable("blink_generated_pharmacies_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		blink_generated_pharmacies_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "blink_generated_pharmacies_ids_my_row_id"}),
	}
});

export const blink_generated_users_ids = mysqlTable("blink_generated_users_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		blink_generated_users_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "blink_generated_users_ids_my_row_id"}),
	}
});

export const boards = mysqlTable("boards", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	name: text("name"),
	user_id: char("user_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		boards_my_row_id: primaryKey({ columns: [table.my_row_id], name: "boards_my_row_id"}),
	}
});

export const bonlivraisons = mysqlTable("bonlivraisons", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	quantite: int("quantite").notNull(),
	montant_ht: varchar("montant_ht", { length: 255 }),
	montant_TTC: varchar("montant_TTC", { length: 255 }).notNull(),
	montant_PU: varchar("montant_PU", { length: 255 }).notNull(),
	TVA: varchar("TVA", { length: 255 }).notNull(),
	remise: varchar("remise", { length: 255 }),
	etat: varchar("etat", { length: 255 }).notNull(),
	fournisseurs_id: char("fournisseurs_id", { length: 36 }).notNull(),
	commandes_id: varchar("commandes_id", { length: 255 }),
	ecart_qte_total: varchar("ecart_qte_total", { length: 255 }).notNull(),
	ecart_prix_total: varchar("ecart_prix_total", { length: 255 }).notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}),
	date_bonlivraison: datetime("date_bonlivraison", { mode: 'string'}),
	creer_par: char("creer_par", { length: 36 }),
	total_rectifier: decimal("total_rectifier", { precision: 10, scale: 2 }),
	state: int("state").default(1),
	archive: tinyint("archive").default(0).notNull(),
	date_archivage: timestamp("date_archivage", { mode: 'string' }),
	credit: double("credit", { precision: 10, scale: 2 }),
	montant_payé: double("montant_payé", { precision: 10, scale: 2 }).notNull(),
	etat_paiement: int("etat_paiement").notNull(),
	qte_update: int("qte_update").default(0),
	reference: varchar("reference", { length: 45 }).notNull(),
	type_remise: int("type_remise").default(-1),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		bonlivraisons_id: primaryKey({ columns: [table.id], name: "bonlivraisons_id"}),
	}
});

export const caisse = mysqlTable("caisse", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	premier_vente_id: int("premier_vente_id"),
	dernier_vente_id: int("dernier_vente_id"),
	montant_sys: int("montant_sys"),
	montant_caisse: int("montant_caisse"),
	gane: int("gane"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		caisse_id: primaryKey({ columns: [table.id], name: "caisse_id"}),
	}
});

export const caisses = mysqlTable("caisses", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	premier_vente_id: int("premier_vente_id"),
	dernier_vente_id: int("dernier_vente_id"),
	montant_sys: double("montant_sys", { precision: 10, scale: 2 }),
	montant_caisse: double("montant_caisse", { precision: 10, scale: 2 }),
	gane: int("gane"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	commentaire: varchar("commentaire", { length: 222 }),
	derniere_alimentation_id: int("derniere_alimentation_id"),
	dernier_retour_vente_id: int("dernier_retour_vente_id"),
	total_espèce: double("total_espèce", { precision: 10, scale: 2 }).notNull(),
	total_lettre_change: double("total_lettre_change", { precision: 10, scale: 2 }).notNull(),
	total_carte_bancaire: double("total_carte_bancaire", { precision: 10, scale: 2 }).notNull(),
	total_chéque: double("total_chéque", { precision: 10, scale: 2 }).notNull(),
	premiere_alimentation_id: int("premiere_alimentation_id"),
	premier_retourvente_id: int("premier_retourvente_id"),
	montant_démarrage: double("montant_démarrage", { precision: 10, scale: 2 }).notNull(),
	reference: varchar("reference", { length: 45 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		caisses_id: primaryKey({ columns: [table.id], name: "caisses_id"}),
	}
});

export const calendars = mysqlTable("calendars", {
	id: int("id").autoincrement().notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	comment: text("comment").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default('0000-00-00 00:00:00').notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	user_id: char("user_id", { length: 36 }).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		calendars_id: primaryKey({ columns: [table.id], name: "calendars_id"}),
	}
});

export const cart_lignes = mysqlTable("cart_lignes", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	carts_id: int("carts_id").notNull(),
	offers_id: int("offers_id").notNull(),
	packs_id: int("packs_id").notNull(),
	products_id: int("products_id").notNull(),
	qty: int("qty").notNull(),
	price: int("price").notNull(),
	remise_type: int("remise_type"),
	remise_value: int("remise_value"),
	remise_product: int("remise_product"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cart_lignes_id: primaryKey({ columns: [table.id], name: "cart_lignes_id"}),
	}
});

export const carts = mysqlTable("carts", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	total_offers: int("total_offers").default(0).notNull(),
	total_products: int("total_products").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		carts_id: primaryKey({ columns: [table.id], name: "carts_id"}),
	}
});

export const cgu_histories = mysqlTable("cgu_histories", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull().references(() => users.id),
	cgu_id: bigint("cgu_id", { mode: "number", unsigned: true }).notNull().references(() => general_conditions.id),
	accepted: tinyint("accepted").default(0),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cgu_histories_my_row_id: primaryKey({ columns: [table.my_row_id], name: "cgu_histories_my_row_id"}),
	}
});

export const check_products = mysqlTable("check_products", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	check_product_lab: tinyint("check_product_lab").default(0),
	check_name: tinyint("check_name").default(0),
	check_description: tinyint("check_description").default(0),
	check_presentation: tinyint("check_presentation").default(0),
	check_atc_code: tinyint("check_atc_code").default(0),
	check_nfc_code: tinyint("check_nfc_code").default(0),
	check_brand_name: tinyint("check_brand_name").default(0),
	check_pharmacy_id: tinyint("check_pharmacy_id").default(0),
	check_reimbursable: tinyint("check_reimbursable").default(0),
	check_source: tinyint("check_source").default(0),
	check_codes: tinyint("check_codes").default(0),
	check_prices: tinyint("check_prices").default(0),
	check_categories: tinyint("check_categories").default(0),
	check_molecules: tinyint("check_molecules").default(0),
	check_active: tinyint("check_active").default(0),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	is_active_product_lab: tinyint("is_active_product_lab").default(0),
	is_active_name: tinyint("is_active_name").default(0),
	is_active_description: tinyint("is_active_description").default(0),
	is_active_presentation: tinyint("is_active_presentation").default(0),
	is_active_atc_code: tinyint("is_active_atc_code").default(0),
	is_active_nfc_code: tinyint("is_active_nfc_code").default(0),
	is_active_brand_name: tinyint("is_active_brand_name").default(0),
	is_active_pharmacy_id: tinyint("is_active_pharmacy_id").default(0),
	is_active_reimbursable: tinyint("is_active_reimbursable").default(0),
	is_active_source: tinyint("is_active_source").default(0),
	is_active_codes: tinyint("is_active_codes").default(0),
	is_active_prices: tinyint("is_active_prices").default(0),
	is_active_categories: tinyint("is_active_categories").default(0),
	is_active_molecules: tinyint("is_active_molecules").default(0),
	is_active_active: tinyint("is_active_active").default(0),
},
(table) => {
	return {
		check_products_my_row_id: primaryKey({ columns: [table.my_row_id], name: "check_products_my_row_id"}),
	}
});

export const cities = mysqlTable("cities", {
	id: char("id", { length: 36 }).notNull(),
	country_id: char("country_id", { length: 36 }).notNull(),
	region_id: bigint("region_id", { mode: "number" }),
	name: varchar("name", { length: 255 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	pre_id: bigint("pre_id", { mode: "number" }),
	cmd_id: bigint("cmd_id", { mode: "number" }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		cities_id: primaryKey({ columns: [table.id], name: "cities_id"}),
	}
});

export const classes = mysqlTable("classes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		classes_id: primaryKey({ columns: [table.id], name: "classes_id"}),
	}
});

export const clients = mysqlTable("clients", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	cin: varchar("cin", { length: 255 }),
	cnss: varchar("cnss", { length: 255 }),
	type_insurance: varchar("type_insurance", { length: 255 }).default('cnss'),
	email: varchar("email", { length: 255 }),
	archive: tinyint("archive").default(0).notNull(),
	type: varchar("type", { length: 255 }).default('Client régulier'),
	game: varchar("game", { length: 255 }),
	tele: varchar("tele", { length: 255 }),
	ville: char("ville", { length: 36 }),
	adresse: varchar("adresse", { length: 255 }),
	code_postale: varchar("code_postale", { length: 255 }),
	plafan_credit: decimal("plafan_credit", { precision: 10, scale: 2 }).default('0.00'),
	organisme: varchar("organisme", { length: 255 }),
	num_immatriculation: varchar("num_immatriculation", { length: 255 }),
	num_affiliation: varchar("num_affiliation", { length: 255 }),
	pays: char("pays", { length: 36 }),
	description: varchar("description", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }),
	fav: int("fav").default(0),
	image: varchar("image", { length: 222 }),
	credit: decimal("credit", { precision: 10, scale: 2 }).default('0.00').notNull(),
	medecin_tr: varchar("medecin_tr", { length: 123 }),
	modifier_par: char("modifier_par", { length: 36 }),
	first_name: varchar("first_name", { length: 255 }),
	credit_init: float("credit_init"),
	sold_init: float("sold_init"),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	passage: int("passage").default(0),
},
(table) => {
	return {
		clients_id: primaryKey({ columns: [table.id], name: "clients_id"}),
	}
});

export const cmd_generated_cities_ids = mysqlTable("cmd_generated_cities_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		cmd_generated_cities_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "cmd_generated_cities_ids_my_row_id"}),
	}
});

export const cmd_generated_grossiste_ids = mysqlTable("cmd_generated_grossiste_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		cmd_generated_grossiste_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "cmd_generated_grossiste_ids_my_row_id"}),
	}
});

export const cmd_generated_lab_ids = mysqlTable("cmd_generated_lab_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		cmd_generated_lab_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "cmd_generated_lab_ids_my_row_id"}),
	}
});

export const cmd_generated_pharmacy_ids = mysqlTable("cmd_generated_pharmacy_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		cmd_generated_pharmacy_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "cmd_generated_pharmacy_ids_my_row_id"}),
	}
});

export const cmd_generated_user_admin_ids = mysqlTable("cmd_generated_user_admin_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		cmd_generated_user_admin_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "cmd_generated_user_admin_ids_my_row_id"}),
	}
});

export const cmd_generated_user_ids = mysqlTable("cmd_generated_user_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		cmd_generated_user_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "cmd_generated_user_ids_my_row_id"}),
	}
});

export const cms_apicustom = mysqlTable("cms_apicustom", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	permalink: varchar("permalink", { length: 191 }),
	tabel: varchar("tabel", { length: 191 }),
	aksi: varchar("aksi", { length: 191 }),
	kolom: varchar("kolom", { length: 191 }),
	orderby: varchar("orderby", { length: 191 }),
	sub_query_1: varchar("sub_query_1", { length: 191 }),
	sql_where: varchar("sql_where", { length: 191 }),
	nama: varchar("nama", { length: 191 }),
	keterangan: varchar("keterangan", { length: 191 }),
	parameter: varchar("parameter", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	method_type: varchar("method_type", { length: 25 }),
	parameters: longtext("parameters"),
	responses: longtext("responses"),
},
(table) => {
	return {
		cms_apicustom_id: primaryKey({ columns: [table.id], name: "cms_apicustom_id"}),
	}
});

export const cms_apikey = mysqlTable("cms_apikey", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	screetkey: varchar("screetkey", { length: 191 }),
	hit: int("hit"),
	status: varchar("status", { length: 25 }).default('active').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_apikey_id: primaryKey({ columns: [table.id], name: "cms_apikey_id"}),
	}
});

export const cms_dashboard = mysqlTable("cms_dashboard", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	id_cms_privileges: int("id_cms_privileges"),
	content: longtext("content"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_dashboard_id: primaryKey({ columns: [table.id], name: "cms_dashboard_id"}),
	}
});

export const cms_email_queues = mysqlTable("cms_email_queues", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	send_at: datetime("send_at", { mode: 'string'}),
	email_recipient: varchar("email_recipient", { length: 191 }),
	email_from_email: varchar("email_from_email", { length: 191 }),
	email_from_name: varchar("email_from_name", { length: 191 }),
	email_cc_email: varchar("email_cc_email", { length: 191 }),
	email_subject: varchar("email_subject", { length: 191 }),
	email_content: text("email_content"),
	email_attachments: text("email_attachments"),
	is_sent: tinyint("is_sent"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_email_queues_id: primaryKey({ columns: [table.id], name: "cms_email_queues_id"}),
	}
});

export const cms_email_templates = mysqlTable("cms_email_templates", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	slug: varchar("slug", { length: 191 }),
	subject: varchar("subject", { length: 191 }),
	content: longtext("content"),
	description: varchar("description", { length: 191 }),
	from_name: varchar("from_name", { length: 191 }),
	from_email: varchar("from_email", { length: 191 }),
	cc_email: varchar("cc_email", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_email_templates_id: primaryKey({ columns: [table.id], name: "cms_email_templates_id"}),
	}
});

export const cms_logs = mysqlTable("cms_logs", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	ipaddress: varchar("ipaddress", { length: 50 }),
	useragent: varchar("useragent", { length: 191 }),
	url: varchar("url", { length: 191 }),
	description: varchar("description", { length: 191 }),
	details: text("details"),
	id_cms_users: int("id_cms_users"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_logs_id: primaryKey({ columns: [table.id], name: "cms_logs_id"}),
	}
});

export const cms_menus = mysqlTable("cms_menus", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	type: varchar("type", { length: 191 }).default('url').notNull(),
	path: varchar("path", { length: 191 }),
	color: varchar("color", { length: 191 }),
	icon: varchar("icon", { length: 191 }),
	parent_id: int("parent_id"),
	is_active: tinyint("is_active").default(1).notNull(),
	is_dashboard: tinyint("is_dashboard").default(0).notNull(),
	id_cms_privileges: int("id_cms_privileges"),
	sorting: int("sorting"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_menus_id: primaryKey({ columns: [table.id], name: "cms_menus_id"}),
	}
});

export const cms_menus_privileges = mysqlTable("cms_menus_privileges", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	id_cms_menus: int("id_cms_menus"),
	id_cms_privileges: int("id_cms_privileges"),
},
(table) => {
	return {
		cms_menus_privileges_id: primaryKey({ columns: [table.id], name: "cms_menus_privileges_id"}),
	}
});

export const cms_moduls = mysqlTable("cms_moduls", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	icon: varchar("icon", { length: 191 }),
	path: varchar("path", { length: 191 }),
	table_name: varchar("table_name", { length: 191 }),
	controller: varchar("controller", { length: 191 }),
	is_protected: tinyint("is_protected").default(0).notNull(),
	is_active: tinyint("is_active").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_moduls_id: primaryKey({ columns: [table.id], name: "cms_moduls_id"}),
	}
});

export const cms_notifications = mysqlTable("cms_notifications", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	id_cms_users: int("id_cms_users"),
	content: varchar("content", { length: 191 }),
	url: varchar("url", { length: 191 }),
	is_read: tinyint("is_read"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_notifications_id: primaryKey({ columns: [table.id], name: "cms_notifications_id"}),
	}
});

export const cms_privileges = mysqlTable("cms_privileges", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	is_superadmin: tinyint("is_superadmin"),
	theme_color: varchar("theme_color", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_privileges_id: primaryKey({ columns: [table.id], name: "cms_privileges_id"}),
	}
});

export const cms_privileges_roles = mysqlTable("cms_privileges_roles", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	is_visible: tinyint("is_visible"),
	is_create: tinyint("is_create"),
	is_read: tinyint("is_read"),
	is_edit: tinyint("is_edit"),
	is_delete: tinyint("is_delete"),
	id_cms_privileges: int("id_cms_privileges"),
	id_cms_moduls: int("id_cms_moduls"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_privileges_roles_id: primaryKey({ columns: [table.id], name: "cms_privileges_roles_id"}),
	}
});

export const cms_settings = mysqlTable("cms_settings", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	content: text("content"),
	content_input_type: varchar("content_input_type", { length: 191 }),
	dataenum: varchar("dataenum", { length: 191 }),
	helper: varchar("helper", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	group_setting: varchar("group_setting", { length: 191 }),
	label: varchar("label", { length: 191 }),
},
(table) => {
	return {
		cms_settings_id: primaryKey({ columns: [table.id], name: "cms_settings_id"}),
	}
});

export const cms_statistic_components = mysqlTable("cms_statistic_components", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	id_cms_statistics: int("id_cms_statistics"),
	componentID: varchar("componentID", { length: 191 }),
	component_name: varchar("component_name", { length: 191 }),
	area_name: varchar("area_name", { length: 55 }),
	sorting: int("sorting"),
	name: varchar("name", { length: 191 }),
	config: longtext("config"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_statistic_components_id: primaryKey({ columns: [table.id], name: "cms_statistic_components_id"}),
	}
});

export const cms_statistics = mysqlTable("cms_statistics", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	slug: varchar("slug", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		cms_statistics_id: primaryKey({ columns: [table.id], name: "cms_statistics_id"}),
	}
});

export const cms_users = mysqlTable("cms_users", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	email: varchar("email", { length: 191 }),
	password: varchar("password", { length: 191 }),
	id_cms_privileges: int("id_cms_privileges"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	status: tinyint("status").default(0),
	company_id: int("company_id"),
	company_name: varchar("company_name", { length: 191 }),
	filials_id: int("filials_id"),
	last_name: varchar("last_name", { length: 191 }),
	first_name: varchar("first_name", { length: 191 }),
	mobile: varchar("mobile", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	city: varchar("city", { length: 191 }),
	other: text("other"),
	remember_token: varchar("remember_token", { length: 100 }),
	fonctions_id: int("fonctions_id"),
	code: varchar("code", { length: 191 }),
	verified: tinyint("verified").default(0).notNull(),
	phone_2: varchar("phone_2", { length: 191 }),
	titre: varchar("titre", { length: 191 }),
	is_commercial: varchar("is_commercial", { length: 191 }),
	device_id: varchar("device_id", { length: 191 }),
	fairebase_token: text("fairebase_token"),
	grossistes_id: int("grossistes_id"),
	laboratories_id: int("laboratories_id"),
	current_connexion: text("current_connexion"),
	codeparrainage: varchar("codeparrainage", { length: 191 }),
	codeparrain: varchar("codeparrain", { length: 191 }),
	parent_id: varchar("parent_id", { length: 191 }),
	operator: varchar("operator", { length: 191 }),
	old_pharmacy: int("old_pharmacy"),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	email_verified: tinyint("email_verified").default(0),
	reset_password_token: varchar("reset_password_token", { length: 191 }),
	date_inscription_web: datetime("date_inscription_web", { mode: 'string'}),
	has_app: tinyint("has_app").default(0),
	qr_code: varchar("qr_code", { length: 252 }),
	cgu_version: varchar("cgu_version", { length: 255 }),
	imported: tinyint("imported"),
},
(table) => {
	return {
		cms_users_id: primaryKey({ columns: [table.id], name: "cms_users_id"}),
	}
});

export const commande_lignes = mysqlTable("commande_lignes", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	commandes_id: int("commandes_id").notNull(),
	packs_id: int("packs_id").notNull(),
	products_id: int("products_id").notNull(),
	qty: int("qty").notNull(),
	price: double("price").notNull(),
	remise_type: int("remise_type"),
	remise_value: int("remise_value"),
	remise_product: int("remise_product"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	final_price: double("final_price", { precision: 8, scale: 2 }).notNull(),
	remise_category: int("remise_category").notNull(),
},
(table) => {
	return {
		commande_lignes_id: primaryKey({ columns: [table.id], name: "commande_lignes_id"}),
	}
});

export const commande_status = mysqlTable("commande_status", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	position: int("position").default(0),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		commande_status_id: primaryKey({ columns: [table.id], name: "commande_status_id"}),
	}
});

export const commande_unitaire_lignes = mysqlTable("commande_unitaire_lignes", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	commandes_unitaire_id: int("commandes_unitaire_id").notNull(),
	labo_id: char("labo_id", { length: 36 }).notNull(),
	grossiste_id: char("grossiste_id", { length: 36 }).notNull(),
	products_id: int("products_id").notNull(),
	qty: int("qty").notNull(),
	price: double("price", { precision: 8, scale: 2 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		commande_unitaire_lignes_id: primaryKey({ columns: [table.id], name: "commande_unitaire_lignes_id"}),
	}
});

export const commandes = mysqlTable("commandes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	quantite: int("quantite").notNull(),
	montant_ht: decimal("montant_ht", { precision: 10, scale: 2 }).notNull(),
	montant_TTC: varchar("montant_TTC", { length: 255 }).notNull(),
	montant_PU: varchar("montant_PU", { length: 255 }).notNull(),
	TVA: varchar("TVA", { length: 255 }).notNull(),
	remise: varchar("remise", { length: 255 }).notNull(),
	etat: varchar("etat", { length: 255 }).notNull(),
	fournisseurs_id: char("fournisseurs_id", { length: 36 }).notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }).default("7").notNull(),
	modifier_par: char("modifier_par", { length: 36 }),
	state: int("state").default(0),
	reference: varchar("reference", { length: 45 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	type_remise: int("type_remise").default(-1),
},
(table) => {
	return {
		commandes_id: primaryKey({ columns: [table.id], name: "commandes_id"}),
	}
});

export const commandes_unitaire = mysqlTable("commandes_unitaire", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	company_id: int("company_id").notNull(),
	total_products: int("total_products").default(0).notNull(),
	reference: varchar("reference", { length: 191 }).notNull(),
	image_bl: varchar("image_bl", { length: 191 }).notNull(),
	commande_statuss_id: int("commande_statuss_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		commandes_unitaire_id: primaryKey({ columns: [table.id], name: "commandes_unitaire_id"}),
	}
});

export const commissions = mysqlTable("commissions", {
	id: char("id", { length: 36 }).notNull(),
	company_id: char("company_id", { length: 36 }).notNull().references(() => companies.id),
	evant: varchar("evant", { length: 255 }),
	rate: decimal("rate", { precision: 10, scale: 2 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
},
(table) => {
	return {
		commissions_id: primaryKey({ columns: [table.id], name: "commissions_id"}),
	}
});

export const companies = mysqlTable("companies", {
	id: char("id", { length: 36 }).notNull(),
	region_id: bigint("region_id", { mode: "number", unsigned: true }),
	city_id: char("city_id", { length: 36 }),
	sector_id: bigint("sector_id", { mode: "number", unsigned: true }),
	parent_id: char("parent_id", { length: 36 }),
	country_id: char("country_id", { length: 36 }).references(() => countries.id),
	pre_pharmacy_id: int("pre_pharmacy_id"),
	pre_wholesaler_id: int("pre_wholesaler_id"),
	pre_laboratory_id: int("pre_laboratory_id"),
	cmd_pharmacy_id: int("cmd_pharmacy_id"),
	cmd_wholesaler_id: int("cmd_wholesaler_id"),
	cmd_laboratory_id: int("cmd_laboratory_id"),
	company_status: mysqlEnum("company_status", ['activated','deleted','pending','demo']).default('demo').notNull(),
	name: varchar("name", { length: 255 }),
	address: text("address"),
	latitude: decimal("latitude", { precision: 8, scale: 5 }),
	longitude: decimal("longitude", { precision: 8, scale: 5 }),
	zip_code: varchar("zip_code", { length: 255 }),
	phone: varchar("phone", { length: 255 }),
	fax: varchar("fax", { length: 255 }),
	mobile: varchar("mobile", { length: 255 }),
	email: varchar("email", { length: 255 }),
	is_premium: tinyint("is_premium").default(0).notNull(),
	is_demo: tinyint("is_demo"),
	national_id: varchar("national_id", { length: 255 }),
	company_type: mysqlEnum("company_type", ['pharmacy','wholesaler','laboratory','partner','blink','other']),
	header_html: varchar("header_html", { length: 255 }),
	footer_html: varchar("footer_html", { length: 255 }),
	logo: varchar("logo", { length: 255 }),
	brand_name: varchar("brand_name", { length: 255 }),
	deleted: tinyint("deleted").default(0).notNull(),
	weight: int("weight").default(0).notNull(),
	program_id: int("program_id").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	delivery_note_type_id: bigint("delivery_note_type_id", { mode: "number", unsigned: true }).references(() => delivery_note_types.id),
},
(table) => {
	return {
		companies_id: primaryKey({ columns: [table.id], name: "companies_id"}),
	}
});

export const company_services = mysqlTable("company_services", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	company_type: varchar("company_type", { length: 191 }).notNull(),
	company_id: char("company_id", { length: 36 }).notNull(),
	service_id: int("service_id").notNull(),
	stat: tinyint("stat").notNull(),
	last_connection: datetime("last_connection", { mode: 'string'}).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		company_services_id: primaryKey({ columns: [table.id], name: "company_services_id"}),
	}
});

export const company_types = mysqlTable("company_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		company_types_id: primaryKey({ columns: [table.id], name: "company_types_id"}),
	}
});

export const configs = mysqlTable("configs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	type: int("type"),
	value: text("value"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		configs_id: primaryKey({ columns: [table.id], name: "configs_id"}),
	}
});

export const confreres = mysqlTable("confreres", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	firstname: varchar("firstname", { length: 255 }),
	date_naissance: varchar("date_naissance", { length: 255 }),
	titre: varchar("titre", { length: 255 }),
	tele: varchar("tele", { length: 255 }),
	fax: varchar("fax", { length: 255 }),
	site: varchar("site", { length: 255 }),
	adresse: varchar("adresse", { length: 255 }),
	code_postale: varchar("code_postale", { length: 255 }),
	ville: char("ville", { length: 36 }),
	pays: char("pays", { length: 36 }),
	region: varchar("region", { length: 255 }),
	description: varchar("description", { length: 255 }),
	email: varchar("email", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }),
	fav: int("fav").default(0),
	image: varchar("image", { length: 222 }),
	cin: varchar("cin", { length: 123 }),
	cnss: varchar("cnss", { length: 123 }),
	credit: decimal("credit", { precision: 10, scale: 2 }).default('0.00').notNull(),
	modifier_par: char("modifier_par", { length: 36 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		confreres_id: primaryKey({ columns: [table.id], name: "confreres_id"}),
	}
});

export const contre_indications = mysqlTable("contre_indications", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom: varchar("Nom", { length: 255 }).notNull(),
	Valeur: varchar("Valeur", { length: 255 }).notNull(),
	Type: varchar("Type", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		contre_indications_id: primaryKey({ columns: [table.id], name: "contre_indications_id"}),
	}
});

export const converted_scan = mysqlTable("converted_scan", {
	id: char("id", { length: 36 }).notNull(),
	scan_id: char("scan_id", { length: 36 }).notNull(),
	reference: text("reference").notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		converted_scan_id: primaryKey({ columns: [table.id], name: "converted_scan_id"}),
	}
});

export const converted_scan_products = mysqlTable("converted_scan_products", {
	id: char("id", { length: 36 }).notNull(),
	converted_scan_id: char("converted_scan_id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	name: text("name").notNull(),
	code: bigint("code", { mode: "number" }).notNull(),
	quantity: int("quantity").notNull(),
	pharmacy_price: double("pharmacy_price", { precision: 8, scale: 2 }).notNull(),
	wholesaler_price: double("wholesaler_price", { precision: 8, scale: 2 }).notNull(),
	expiry_date: timestamp("expiry_date", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	tax: double("tax", { precision: 8, scale: 2 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		converted_scan_products_id: primaryKey({ columns: [table.id], name: "converted_scan_products_id"}),
	}
});

export const converted_wholesaler = mysqlTable("converted_wholesaler", {
	id: char("id", { length: 36 }).notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }),
	name: text("name"),
	tax_code: text("tax_code"),
	if: text("if"),
	rc: text("rc"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		converted_wholesaler_id: primaryKey({ columns: [table.id], name: "converted_wholesaler_id"}),
	}
});

export const converter_histories = mysqlTable("converter_histories", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	store_program_id: int("store_program_id").notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }).notNull(),
	blink_store_program_id: int("blink_store_program_id").notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	points: int("points").default(0).notNull(),
	converted_points: int("converted_points").default(0).notNull(),
	blink_points: int("blink_points").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		converter_histories_id: primaryKey({ columns: [table.id], name: "converter_histories_id"}),
	}
});

export const countercase_consultations = mysqlTable("countercase_consultations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	countercase_id: int("countercase_id").notNull(),
	rubric_id: int("rubric_id"),
	user_name: varchar("user_name", { length: 191 }),
	role: varchar("role", { length: 191 }),
	pharmacy_name: varchar("pharmacy_name", { length: 191 }),
	date: datetime("date", { mode: 'string'}).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		countercase_consultations_id: primaryKey({ columns: [table.id], name: "countercase_consultations_id"}),
	}
});

export const countercase_rubrics = mysqlTable("countercase_rubrics", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	countercase_id: int("countercase_id").notNull(),
	rubric_id: int("rubric_id").notNull(),
	description: text("description"),
	stat: varchar("stat", { length: 191 }).default("1").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		countercase_rubrics_id: primaryKey({ columns: [table.id], name: "countercase_rubrics_id"}),
	}
});

export const countercases = mysqlTable("countercases", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	description_ar: text("description_ar"),
	keywords: text("keywords"),
	is_current: tinyint("is_current").default(0).notNull(),
	stat: varchar("stat", { length: 191 }).default("1").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		countercases_id: primaryKey({ columns: [table.id], name: "countercases_id"}),
	}
});

export const countries = mysqlTable("countries", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	abbv: varchar("abbv", { length: 255 }).notNull(),
	serviced: tinyint("serviced").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		countries_id: primaryKey({ columns: [table.id], name: "countries_id"}),
	}
});

export const datepremptionproduits = mysqlTable("datepremptionproduits", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dateperemption: date("dateperemption", { mode: 'string' }).notNull(),
	produits_id: char("produits_id", { length: 36 }).notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		produits_id_foreign: index("datepremptionproduits_produits_id_foreign").on(table.produits_id),
		datepremptionproduits_id: primaryKey({ columns: [table.id], name: "datepremptionproduits_id"}),
	}
});

export const dcis = mysqlTable("dcis", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		dcis_id: primaryKey({ columns: [table.id], name: "dcis_id"}),
	}
});

export const deffaultactions = mysqlTable("deffaultactions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	cree_par: char("cree_par", { length: 36 }),
	id_action: bigint("id_action", { mode: "number" }),
	state: int("state").default(0),
	type: varchar("type", { length: 20 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		deffaultactions_id: primaryKey({ columns: [table.id], name: "deffaultactions_id"}),
	}
});

export const defileur = mysqlTable("defileur", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	title: varchar("title", { length: 191 }),
	content: text("content"),
	status: tinyint("status").default(1).notNull(),
	date_start: datetime("date_start", { mode: 'string'}),
	date_end: datetime("date_end", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	logo: varchar("logo", { length: 191 }),
	show_auth: tinyint("show_auth").default(0),
	position: varchar("position", { length: 191 }),
},
(table) => {
	return {
		defileur_id: primaryKey({ columns: [table.id], name: "defileur_id"}),
	}
});

export const defined_messages = mysqlTable("defined_messages", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	ref: varchar("ref", { length: 191 }).notNull(),
	description: text("description"),
	content: text("content").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		defined_messages_id: primaryKey({ columns: [table.id], name: "defined_messages_id"}),
	}
});

export const deliveries = mysqlTable("deliveries", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	reference: varchar("reference", { length: 191 }).notNull(),
	order_id: int("order_id").notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }),
	date: datetime("date", { mode: 'string'}),
	nb_products: int("nb_products").notNull(),
	total_price_ht: decimal("total_price_ht", { precision: 18, scale: 5 }),
	total_price_ttc: decimal("total_price_ttc", { precision: 18, scale: 5 }),
	w_total_price_ht: decimal("w_total_price_ht", { precision: 18, scale: 5 }),
	w_total_price_ttc: decimal("w_total_price_ttc", { precision: 18, scale: 5 }),
	tva: decimal("tva", { precision: 18, scale: 5 }),
	wallet_amount: decimal("wallet_amount", { precision: 18, scale: 5 }),
	paid_price_ttc: decimal("paid_price_ttc", { precision: 18, scale: 5 }),
	btn_magic: int("btn_magic").default(0).notNull(),
	delivery_file: text("delivery_file"),
	granted: int("granted"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		deliveries_id: primaryKey({ columns: [table.id], name: "deliveries_id"}),
	}
});

export const delivery_datas = mysqlTable("delivery_datas", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	delivery_id: int("delivery_id").notNull(),
	store_program_id: int("store_program_id").notNull(),
	level_id: int("level_id"),
	promotion_id: int("promotion_id"),
	points: int("points"),
	level_points: int("level_points"),
	discount: decimal("discount", { precision: 18, scale: 5 }),
	wallet: decimal("wallet", { precision: 18, scale: 5 }),
	total_price_ht: decimal("total_price_ht", { precision: 18, scale: 5 }),
	total_price_ttc: decimal("total_price_ttc", { precision: 18, scale: 5 }),
	w_total_price_ht: decimal("w_total_price_ht", { precision: 18, scale: 5 }),
	w_total_price_ttc: decimal("w_total_price_ttc", { precision: 18, scale: 5 }),
	op1: decimal("op1", { precision: 18, scale: 5 }),
	op2: decimal("op2", { precision: 18, scale: 5 }),
	accorded_amount: decimal("accorded_amount", { precision: 18, scale: 5 }),
	rest: decimal("rest", { precision: 18, scale: 5 }),
	w_com1: decimal("w_com1", { precision: 18, scale: 5 }),
	w_com2: decimal("w_com2", { precision: 18, scale: 5 }),
	blink_com1: decimal("blink_com1", { precision: 18, scale: 5 }),
	blink_com2: decimal("blink_com2", { precision: 18, scale: 5 }),
	paid: int("paid"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		delivery_datas_id: primaryKey({ columns: [table.id], name: "delivery_datas_id"}),
	}
});

export const delivery_details = mysqlTable("delivery_details", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	delivery_id: int("delivery_id").notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	store_program_id: int("store_program_id"),
	qty: int("qty").default(0).notNull(),
	magic_qty: int("magic_qty").default(0).notNull(),
	ppv: double("ppv", { precision: 8, scale: 2 }),
	pph: double("pph", { precision: 8, scale: 2 }),
	ppgro: double("ppgro", { precision: 8, scale: 2 }),
	tva: double("tva", { precision: 8, scale: 2 }),
	tva_amount: double("tva_amount", { precision: 8, scale: 2 }).notNull(),
	pph_ht: double("pph_ht", { precision: 8, scale: 2 }),
	ppgro_ht: double("ppgro_ht", { precision: 8, scale: 2 }),
	total_pph_ht: decimal("total_pph_ht", { precision: 18, scale: 5 }),
	total_ppgro_ht: decimal("total_ppgro_ht", { precision: 18, scale: 5 }),
	points: int("points"),
	level_points: int("level_points"),
	level: varchar("level", { length: 191 }),
	discount: double("discount", { precision: 8, scale: 2 }),
	discount_amount: decimal("discount_amount", { precision: 18, scale: 5 }),
	is_suggestion: int("is_suggestion").default(0).notNull(),
	parent_id: int("parent_id"),
	btn_magic: int("btn_magic").default(0).notNull(),
	order: int("order").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		delivery_details_id: primaryKey({ columns: [table.id], name: "delivery_details_id"}),
	}
});

export const delivery_gap = mysqlTable("delivery_gap", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	date: datetime("date", { mode: 'string'}),
	quantity_received: int("quantity_received").notNull(),
	order_quantity: int("order_quantity").notNull(),
	source: varchar("source", { length: 255 }),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	city_id: char("city_id", { length: 36 }).references(() => cities.id),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	supplier_id: char("supplier_id", { length: 36 }).references(() => suppliers.id),
	detail_order_id: bigint("detail_order_id", { mode: "number", unsigned: true }).references(() => produitcommandes.id),
	detail_blscan_id: char("detail_blscan_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		delivery_gap_my_row_id: primaryKey({ columns: [table.my_row_id], name: "delivery_gap_my_row_id"}),
	}
});

export const delivery_note_types = mysqlTable("delivery_note_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: varchar("description", { length: 255 }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		delivery_note_types_id: primaryKey({ columns: [table.id], name: "delivery_note_types_id"}),
	}
});

export const destination_companies = mysqlTable("destination_companies", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	destinations_id: int("destinations_id").notNull(),
	types_id: int("types_id").notNull(),
	companies_id: int("companies_id"),
	cms_users_id: char("cms_users_id", { length: 36 }),
	cms_privileges_id: int("cms_privileges_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		destination_companies_id: primaryKey({ columns: [table.id], name: "destination_companies_id"}),
	}
});

export const destination_locations = mysqlTable("destination_locations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	destinations_id: int("destinations_id").notNull(),
	regions_id: int("regions_id").notNull(),
	cities_id: char("cities_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	secteurs_id: int("secteurs_id"),
},
(table) => {
	return {
		destination_locations_id: primaryKey({ columns: [table.id], name: "destination_locations_id"}),
	}
});

export const destinations = mysqlTable("destinations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	type: int("type").default(1).notNull(),
},
(table) => {
	return {
		destinations_id: primaryKey({ columns: [table.id], name: "destinations_id"}),
	}
});

export const destinations_cities = mysqlTable("destinations_cities", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cities_id: int("cities_id").notNull(),
	destinations_id: int("destinations_id").notNull(),
},
(table) => {
	return {
		destinations_cities_id: primaryKey({ columns: [table.id], name: "destinations_cities_id"}),
	}
});

export const destinations_cms_privileges = mysqlTable("destinations_cms_privileges", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_privileges_id: int("cms_privileges_id").notNull(),
	destinations_id: int("destinations_id").notNull(),
},
(table) => {
	return {
		destinations_cms_privileges_id: primaryKey({ columns: [table.id], name: "destinations_cms_privileges_id"}),
	}
});

export const destinations_regions = mysqlTable("destinations_regions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	regions_id: int("regions_id").notNull(),
	destinations_id: int("destinations_id").notNull(),
},
(table) => {
	return {
		destinations_regions_id: primaryKey({ columns: [table.id], name: "destinations_regions_id"}),
	}
});

export const details_avoir_emis = mysqlTable("details_avoir_emis", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	avoiremis_id: bigint("avoiremis_id", { mode: "number", unsigned: true }),
	produit_id: char("produit_id", { length: 36 }),
	qte: int("qte"),
	prix: decimal("prix", { precision: 10, scale: 2 }),
	tax_rate: int("tax_rate").default(0),
	statu: int("statu"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	raison: int("raison"),
	etat_modife: int("etat_modife").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		details_avoir_emis_id: primaryKey({ columns: [table.id], name: "details_avoir_emis_id"}),
	}
});

export const details_avoir_recus = mysqlTable("details_avoir_recus", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	avoirrecu_id: bigint("avoirrecu_id", { mode: "number", unsigned: true }),
	produit_id: char("produit_id", { length: 36 }),
	qte: int("qte"),
	prix: decimal("prix", { precision: 10, scale: 2 }),
	tax_rate: int("tax_rate").default(0),
	statu: int("statu"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	raison: int("raison"),
	etat_modife: int("etat_modife").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		details_avoir_recus_id: primaryKey({ columns: [table.id], name: "details_avoir_recus_id"}),
	}
});

export const devis = mysqlTable("devis", {
	id: int("id").autoincrement().notNull(),
	client_id: int("client_id"),
	status: varchar("status", { length: 22 }),
	reference: varchar("reference", { length: 222 }),
	creer_par: char("creer_par", { length: 36 }),
	montant_PPV: decimal("montant_PPV", { precision: 10, scale: 2 }),
	montant_PU: decimal("montant_PU", { precision: 10, scale: 2 }),
	qte_total: int("qte_total").default(0).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		devis_id: primaryKey({ columns: [table.id], name: "devis_id"}),
	}
});

export const devisproduits = mysqlTable("devisproduits", {
	id: int("id").autoincrement().notNull(),
	devis_id: varchar("devis_id", { length: 222 }),
	produit_id: char("produit_id", { length: 36 }),
	quantite: int("quantite"),
	prix_unitaire: varchar("prix_unitaire", { length: 222 }),
	PPV_app: varchar("PPV_app", { length: 123 }).notNull(),
	PPH_app: varchar("PPH_app", { length: 123 }).notNull(),
	tax_rate: int("tax_rate").default(0),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}),
	type_remise: int("type_remise"),
	// Warning: Can't parse float(10,2) from database
	// float(10,2)Type: float(10,2)("remise"),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		devisproduits_id: primaryKey({ columns: [table.id], name: "devisproduits_id"}),
	}
});

export const diffusions = mysqlTable("diffusions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	offers_id: int("offers_id").notNull(),
	grossistes_groups_id: int("grossistes_groups_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		diffusions_id: primaryKey({ columns: [table.id], name: "diffusions_id"}),
	}
});

export const drug_interactions = mysqlTable("drug_interactions", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	name: text("name"),
	risks_mechanisms: text("risks_mechanisms"),
	course_of_action: text("course_of_action"),
	niveau_gravite: text("niveau_gravite"),
	severity_level: text("severity_level"),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	country_id: char("country_id", { length: 36 }).references(() => countries.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	second_molecule_id: char("second_molecule_id", { length: 36 }).references(() => molecules.id),
},
(table) => {
	return {
		drug_interactions_my_row_id: primaryKey({ columns: [table.my_row_id], name: "drug_interactions_my_row_id"}),
	}
});

export const duplicate_products = mysqlTable("duplicate_products", {
	id: char("id", { length: 36 }).notNull(),
	produit_id: int("produit_id"),
	name: varchar("name", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
	code_bare: varchar("code_bare", { length: 255 }),
	code_bare2: varchar("code_bare2", { length: 255 }),
	laboratoire: char("laboratoire", { length: 36 }),
	gamme: varchar("gamme", { length: 255 }),
	types_id: bigint("types_id", { mode: "number", unsigned: true }),
	classes_id: bigint("classes_id", { mode: "number", unsigned: true }),
	forms_id: bigint("forms_id", { mode: "number", unsigned: true }),
	dcis_id: bigint("dcis_id", { mode: "number", unsigned: true }),
	sous_gamme: varchar("sous_gamme", { length: 255 }),
	produit_tableau: varchar("produit_tableau", { length: 255 }),
	prescription: varchar("prescription", { length: 255 }),
	produit_marche: varchar("produit_marche", { length: 255 }),
	PPH: decimal("PPH", { precision: 9, scale: 2 }),
	PPV: decimal("PPV", { precision: 9, scale: 2 }).notNull(),
	TVA: varchar("TVA", { length: 255 }),
	TVA_vente: varchar("TVA_vente", { length: 255 }),
	remboursable: varchar("remboursable", { length: 255 }),
	présentation: varchar("présentation", { length: 255 }),
	excipient: varchar("excipient", { length: 255 }),
	posologie_adult: varchar("posologie_adult", { length: 255 }),
	posologie_enfant: varchar("posologie_enfant", { length: 255 }),
	indications: varchar("indications", { length: 255 }),
	contre_indication_conduit: varchar("contre_indication_conduit", { length: 255 }),
	contre_indication_monograph: varchar("contre_indication_monograph", { length: 255 }),
	contre_indication_grossesse: varchar("contre_indication_grossesse", { length: 255 }),
	reference_labo_produit: varchar("reference_labo_produit", { length: 255 }),
	description: varchar("description", { length: 255 }),
	conditionnement: varchar("conditionnement", { length: 255 }),
	monograph: varchar("monograph", { length: 255 }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	active: int("active").default(1).notNull(),
	PPV_prix: decimal("PPV_prix", { precision: 9, scale: 2 }).notNull(),
	PPH_prix: decimal("PPH_prix", { precision: 9, scale: 2 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_peremption: date("date_peremption", { mode: 'string' }),
	quantite: int("quantite").default(0).notNull(),
	creer_par: char("creer_par", { length: 36 }),
	quantite_disponible: int("quantite_disponible"),
	zone: int("zone").default(1).notNull(),
	inventaires_id: bigint("inventaires_id", { mode: "number", unsigned: true }).notNull(),
	modifier_par: char("modifier_par", { length: 36 }),
	nomberAction: int("nomberAction").default(0).notNull(),
	stok_min: int("stok_min"),
	stok_max: int("stok_max"),
	nature_id: bigint("nature_id", { mode: "number", unsigned: true }),
	atc_id: bigint("atc_id", { mode: "number", unsigned: true }),
	mode_id: bigint("mode_id", { mode: "number", unsigned: true }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		duplicate_products_id: primaryKey({ columns: [table.id], name: "duplicate_products_id"}),
	}
});

export const dynamic_blocs = mysqlTable("dynamic_blocs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	service_id: int("service_id").notNull(),
	title: varchar("title", { length: 191 }),
	action_title: varchar("action_title", { length: 191 }),
	number: int("number"),
	icone: text("icone"),
	link: varchar("link", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		dynamic_blocs_id: primaryKey({ columns: [table.id], name: "dynamic_blocs_id"}),
	}
});

export const emails = mysqlTable("emails", {
	name: varchar("name", { length: 510 }),
	email: varchar("email", { length: 255 }),
});

export const emploidetemps = mysqlTable("emploidetemps", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	jour: varchar("jour", { length: 255 }).notNull(),
	debut1: time("debut1"),
	debut2: time("debut2"),
	fin1: time("fin1"),
	fin2: time("fin2"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
},
(table) => {
	return {
		emploidetemps_id: primaryKey({ columns: [table.id], name: "emploidetemps_id"}),
	}
});

export const event = mysqlTable("event", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	titre: varchar("titre", { length: 191 }).notNull(),
	description: text("description").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_debut: date("date_debut", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_fin: date("date_fin", { mode: 'string' }).notNull(),
	status: tinyint("status").notNull(),
	event_type_id: int("event_type_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	image: varchar("image", { length: 191 }),
	logo: varchar("logo", { length: 191 }),
},
(table) => {
	return {
		event_id: primaryKey({ columns: [table.id], name: "event_id"}),
	}
});

export const event_lignes = mysqlTable("event_lignes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	event_id: int("event_id"),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date: date("date", { mode: 'string' }),
	hour_start: varchar("hour_start", { length: 191 }),
	hour_end: varchar("hour_end", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		event_lignes_id: primaryKey({ columns: [table.id], name: "event_lignes_id"}),
	}
});

export const event_type = mysqlTable("event_type", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	titre: varchar("titre", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		event_type_id: primaryKey({ columns: [table.id], name: "event_type_id"}),
	}
});

export const events = mysqlTable("events", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	laboratory_id: char("laboratory_id", { length: 36 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_start: date("date_start", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_end: date("date_end", { mode: 'string' }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		events_id: primaryKey({ columns: [table.id], name: "events_id"}),
	}
});

export const failed_jobs = mysqlTable("failed_jobs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	uuid: varchar("uuid", { length: 255 }).notNull(),
	connection: text("connection").notNull(),
	queue: text("queue").notNull(),
	payload: longtext("payload").notNull(),
	exception: longtext("exception").notNull(),
	failed_at: timestamp("failed_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		failed_jobs_id: primaryKey({ columns: [table.id], name: "failed_jobs_id"}),
		failed_jobs_uuid_unique: unique("failed_jobs_uuid_unique").on(table.uuid),
	}
});

export const favoris = mysqlTable("favoris", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	nom: varchar("nom", { length: 255 }),
	url: varchar("url", { length: 255 }),
	ref: varchar("ref", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	state: int("state"),
	icon: varchar("icon", { length: 45 }).default('bi bi-grid'),
	is_default: int("is_default").default(0),
},
(table) => {
	return {
		favoris_id: primaryKey({ columns: [table.id], name: "favoris_id"}),
	}
});

export const favorite_wholesalers = mysqlTable("favorite_wholesalers", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	wholesaler_id: char("wholesaler_id", { length: 36 }).notNull().references(() => companies.id, { onDelete: "cascade" } ),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		favorite_wholesalers_id: primaryKey({ columns: [table.id], name: "favorite_wholesalers_id"}),
	}
});

export const field_matches = mysqlTable("field_matches", {
	id: char("id", { length: 36 }).notNull(),
	field_name: text("field_name"),
	matched: tinyint("matched"),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	alt_product_id: char("alt_product_id", { length: 36 }).references(() => alt_products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		field_matches_id: primaryKey({ columns: [table.id], name: "field_matches_id"}),
	}
});

export const filecsvimporters = mysqlTable("filecsvimporters", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	file_name: varchar("file_name", { length: 255 }).notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		creer_par_foreign: index("filecsvimporters_creer_par_foreign").on(table.creer_par),
		filecsvimporters_id: primaryKey({ columns: [table.id], name: "filecsvimporters_id"}),
	}
});

export const filials = mysqlTable("filials", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	company_id: int("company_id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	city: varchar("city", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		filials_id: primaryKey({ columns: [table.id], name: "filials_id"}),
	}
});

export const fonctions = mysqlTable("fonctions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	organisms_id: int("organisms_id").notNull(),
},
(table) => {
	return {
		fonctions_id: primaryKey({ columns: [table.id], name: "fonctions_id"}),
	}
});

export const forms = mysqlTable("forms", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }).notNull(),
},
(table) => {
	return {
		forms_id: primaryKey({ columns: [table.id], name: "forms_id"}),
	}
});

export const fournisseurs = mysqlTable("fournisseurs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
	email: varchar("email", { length: 255 }),
	site: varchar("site", { length: 255 }),
	fax: varchar("fax", { length: 255 }),
	tele: varchar("tele", { length: 255 }),
	ville: char("ville", { length: 36 }),
	adresse: varchar("adresse", { length: 255 }),
	code_postale: varchar("code_postale", { length: 255 }),
	description: varchar("description", { length: 255 }),
	pays: char("pays", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }),
	fav: int("fav").default(0),
	modifier_par: char("modifier_par", { length: 36 }),
	credit: decimal("credit", { precision: 10, scale: 2 }).default('0.00'),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		fournisseurs_id: primaryKey({ columns: [table.id], name: "fournisseurs_id"}),
	}
});

export const gammes = mysqlTable("gammes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }),
	nom: varchar("nom", { length: 255 }),
	adresse: varchar("adresse", { length: 255 }),
	email: varchar("email", { length: 255 }),
	tele: varchar("tele", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		gammes_id: primaryKey({ columns: [table.id], name: "gammes_id"}),
	}
});

export const gardes = mysqlTable("gardes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom: varchar("Nom", { length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	Date_debut: date("Date_debut", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	Date_fin: date("Date_fin", { mode: 'string' }),
	debut1: time("debut1"),
	debut2: time("debut2"),
	fin1: time("fin1"),
	fin2: time("fin2"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		gardes_id: primaryKey({ columns: [table.id], name: "gardes_id"}),
	}
});

export const general_conditions = mysqlTable("general_conditions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	service_id: int("service_id").notNull(),
	version: varchar("version", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }),
	is_current: tinyint("is_current").notNull(),
	type: varchar("type", { length: 191 }),
	content: text("content").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		general_conditions_id: primaryKey({ columns: [table.id], name: "general_conditions_id"}),
	}
});

export const gift = mysqlTable("gift", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	image: varchar("image", { length: 191 }),
	percentage: int("percentage"),
	qr_code: varchar("qr_code", { length: 191 }),
	point_id: int("point_id"),
	gift_type_id: int("gift_type_id"),
	qty: int("qty"),
	rest: int("rest"),
	animation: varchar("animation", { length: 191 }),
	date_debut: datetime("date_debut", { mode: 'string'}),
	date_fin: datetime("date_fin", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_id: primaryKey({ columns: [table.id], name: "gift_id"}),
	}
});

export const gift_attribute_values = mysqlTable("gift_attribute_values", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	gift_id: int("gift_id").notNull(),
	attribute_id: int("attribute_id").notNull(),
	attribute_option_group_id: int("attribute_option_group_id").notNull(),
	price: decimal("price", { precision: 18, scale: 5 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_attribute_values_id: primaryKey({ columns: [table.id], name: "gift_attribute_values_id"}),
	}
});

export const gift_cart_attributes = mysqlTable("gift_cart_attributes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	gift_cart_id: int("gift_cart_id"),
	gift_attribute_value_id: int("gift_attribute_value_id"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_cart_attributes_id: primaryKey({ columns: [table.id], name: "gift_cart_attributes_id"}),
	}
});

export const gift_carts = mysqlTable("gift_carts", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	gift_id: int("gift_id").notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	gift_attribute_value_id: int("gift_attribute_value_id"),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	qty: int("qty").notNull(),
	price: decimal("price", { precision: 18, scale: 5 }),
	total_shiping: decimal("total_shiping", { precision: 18, scale: 5 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_carts_id: primaryKey({ columns: [table.id], name: "gift_carts_id"}),
	}
});

export const gift_order_details = mysqlTable("gift_order_details", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	gift_order_id: int("gift_order_id").notNull(),
	gift_id: int("gift_id").notNull(),
	qty: int("qty").default(0).notNull(),
	price: decimal("price", { precision: 18, scale: 5 }),
	tva: decimal("tva", { precision: 18, scale: 5 }),
	price_ht: decimal("price_ht", { precision: 18, scale: 5 }),
	total_price_ht: decimal("total_price_ht", { precision: 18, scale: 5 }),
	order: int("order").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	tva_amount: decimal("tva_amount", { precision: 18, scale: 5 }),
},
(table) => {
	return {
		gift_order_details_id: primaryKey({ columns: [table.id], name: "gift_order_details_id"}),
	}
});

export const gift_order_status_histories = mysqlTable("gift_order_status_histories", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	gift_order_id: int("gift_order_id"),
	gift_order_status_id: int("gift_order_status_id"),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_order_status_histories_id: primaryKey({ columns: [table.id], name: "gift_order_status_histories_id"}),
	}
});

export const gift_order_statuses = mysqlTable("gift_order_statuses", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_order_statuses_id: primaryKey({ columns: [table.id], name: "gift_order_statuses_id"}),
	}
});

export const gift_order_wallets = mysqlTable("gift_order_wallets", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	gift_order_id: int("gift_order_id").notNull(),
	store_program_id: int("store_program_id").notNull(),
	amount: decimal("amount", { precision: 18, scale: 5 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_order_wallets_id: primaryKey({ columns: [table.id], name: "gift_order_wallets_id"}),
	}
});

export const gift_orders = mysqlTable("gift_orders", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	reference: varchar("reference", { length: 191 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	gift_order_status_id: int("gift_order_status_id").default(1).notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	nb_gifts: int("nb_gifts").notNull(),
	total_price_ht: decimal("total_price_ht", { precision: 18, scale: 5 }),
	total_price_ttc: decimal("total_price_ttc", { precision: 18, scale: 5 }),
	tva: decimal("tva", { precision: 18, scale: 5 }),
	card_amount: decimal("card_amount", { precision: 18, scale: 5 }),
	wallet_amount: decimal("wallet_amount", { precision: 18, scale: 5 }),
	paid_price_ttc: decimal("paid_price_ttc", { precision: 18, scale: 5 }),
	total_shiping: decimal("total_shiping", { precision: 18, scale: 5 }),
	cancel_reason: text("cancel_reason"),
	canceled_at: timestamp("canceled_at", { mode: 'string' }),
	opened_at: timestamp("opened_at", { mode: 'string' }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_orders_id: primaryKey({ columns: [table.id], name: "gift_orders_id"}),
	}
});

export const gift_reminders = mysqlTable("gift_reminders", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }),
	program_id: int("program_id"),
	gift_id: int("gift_id"),
	points: int("points"),
	gift_points: int("gift_points"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_reminders_id: primaryKey({ columns: [table.id], name: "gift_reminders_id"}),
	}
});

export const gift_stats = mysqlTable("gift_stats", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_stats_id: primaryKey({ columns: [table.id], name: "gift_stats_id"}),
	}
});

export const gift_type = mysqlTable("gift_type", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		gift_type_id: primaryKey({ columns: [table.id], name: "gift_type_id"}),
	}
});

export const gifts = mysqlTable("gifts", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	program_id: int("program_id").notNull(),
	role_id: int("role_id").notNull(),
	level_id: int("level_id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	short_description: text("short_description"),
	description: text("description"),
	composition: text("composition"),
	shipping: text("shipping"),
	price: double("price", { precision: 8, scale: 2 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	status: int("status").default(0).notNull(),
},
(table) => {
	return {
		gifts_id: primaryKey({ columns: [table.id], name: "gifts_id"}),
	}
});

export const grossiste_filiales = mysqlTable("grossiste_filiales", {
	id: int("id", { unsigned: true }).default(0).notNull(),
	company_id: int("company_id"),
	name: varchar("name", { length: 191 }).notNull(),
});

export const grossiste_laboratories = mysqlTable("grossiste_laboratories", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	grossistes_id: char("grossistes_id", { length: 36 }).notNull(),
	laboratories_id: char("laboratories_id", { length: 36 }).notNull(),
	diffusion: int("diffusion").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		grossiste_laboratories_id: primaryKey({ columns: [table.id], name: "grossiste_laboratories_id"}),
	}
});

export const grossiste_locations = mysqlTable("grossiste_locations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	grossistes_id: char("grossistes_id", { length: 36 }).notNull(),
	regions_id: int("regions_id").notNull(),
	cities_id: char("cities_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	secteurs_id: int("secteurs_id"),
},
(table) => {
	return {
		grossiste_locations_id: primaryKey({ columns: [table.id], name: "grossiste_locations_id"}),
	}
});

export const grossiste_offers = mysqlTable("grossiste_offers", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	grossistes_id: char("grossistes_id", { length: 36 }).notNull(),
	offers_id: int("offers_id").notNull(),
	diffusion: int("diffusion").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		grossiste_offers_id: primaryKey({ columns: [table.id], name: "grossiste_offers_id"}),
	}
});

export const grossiste_types = mysqlTable("grossiste_types", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		grossiste_types_id: primaryKey({ columns: [table.id], name: "grossiste_types_id"}),
	}
});

export const grossistes = mysqlTable("grossistes", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	logo: text("logo"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	logo2: text("logo2"),
	grossiste_types_id: int("grossiste_types_id").notNull(),
	grossistes_id: int("grossistes_id"),
	weight: int("weight").default(0).notNull(),
	btn_commande: tinyint("btn_commande").default(1).notNull(),
	code: varchar("code", { length: 191 }),
	address: text("address"),
	web: varchar("web", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	fax: varchar("fax", { length: 191 }),
	email: varchar("email", { length: 191 }),
	cu_status: tinyint("cu_status").default(0).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		grossistes_id: primaryKey({ columns: [table.id], name: "grossistes_id"}),
	}
});

export const grossistes_groups = mysqlTable("grossistes_groups", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	saved: tinyint("saved").notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		grossistes_groups_id: primaryKey({ columns: [table.id], name: "grossistes_groups_id"}),
	}
});

export const grossistes_groups_grossistes = mysqlTable("grossistes_groups_grossistes", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	grossistes_groups: int("grossistes_groups").notNull(),
	company_id: int("company_id").notNull(),
	filials_id: int("filials_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		grossistes_groups_grossistes_id: primaryKey({ columns: [table.id], name: "grossistes_groups_grossistes_id"}),
	}
});

export const grossistes_weight = mysqlTable("grossistes_weight", {
	grossistes_id: int("grossistes_id", { unsigned: true }).default(0).notNull(),
	position: varchar("position", { length: 11 }),
	ordre: decimal("ordre", { precision: 14, scale: 4 }),
});

export const groups = mysqlTable("groups", {
	id: char("id", { length: 36 }).notNull(),
	name: text("name"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		groups_id: primaryKey({ columns: [table.id], name: "groups_id"}),
	}
});

export const hint_steps = mysqlTable("hint_steps", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: bigint("id", { mode: "number", unsigned: true }).notNull(),
	hint_id: int("hint_id").notNull(),
	title: varchar("title", { length: 191 }),
	sub_title: varchar("sub_title", { length: 191 }),
	description: text("description"),
	image: text("image"),
	element: varchar("element", { length: 191 }),
	position: varchar("position", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		hint_steps_my_row_id: primaryKey({ columns: [table.my_row_id], name: "hint_steps_my_row_id"}),
	}
});

export const hints = mysqlTable("hints", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: bigint("id", { mode: "number", unsigned: true }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	url: text("url").notNull(),
	type: int("type").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		hints_my_row_id: primaryKey({ columns: [table.my_row_id], name: "hints_my_row_id"}),
	}
});

export const images = mysqlTable("images", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	path: text("path").notNull(),
	reference: varchar("reference", { length: 191 }).notNull(),
	imageable_id: int("imageable_id").notNull(),
	imageable_type: varchar("imageable_type", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		images_id: primaryKey({ columns: [table.id], name: "images_id"}),
	}
});

export const indications = mysqlTable("indications", {
	id: char("id", { length: 36 }).notNull(),
	molecule_id: char("molecule_id", { length: 36 }).notNull(),
	pathology_id: char("pathology_id", { length: 36 }).notNull(),
	text: text("text"),
	is_contra: tinyint("is_contra").default(0),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	level_severity: text("level_severity"),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
},
(table) => {
	return {
		indications_id: primaryKey({ columns: [table.id], name: "indications_id"}),
	}
});

export const information_cheques = mysqlTable("information_cheques", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	vente_id: bigint("vente_id", { mode: "number" }),
	numero_cheque: bigint("numero_cheque", { mode: "number" }),
	date_echeance: datetime("date_echeance", { mode: 'string'}),
	banque: varchar("banque", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	nom_emetteur: varchar("nom_emetteur", { length: 255 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		information_cheques_id: primaryKey({ columns: [table.id], name: "information_cheques_id"}),
	}
});

export const insurance_classifications = mysqlTable("insurance_classifications", {
	id: char("id", { length: 36 }).notNull(),
	type: int("type"),
	label: varchar("label", { length: 255 }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		insurance_classifications_id: primaryKey({ columns: [table.id], name: "insurance_classifications_id"}),
	}
});

export const internal_links = mysqlTable("internal_links", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	route: varchar("route", { length: 191 }).notNull(),
	route_2: varchar("route_2", { length: 250 }),
	table: varchar("table", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		internal_links_id: primaryKey({ columns: [table.id], name: "internal_links_id"}),
	}
});

export const inventaires = mysqlTable("inventaires", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	nom: varchar("nom", { length: 255 }).notNull(),
	users_id: char("users_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	commentaire: varchar("commentaire", { length: 222 }),
	date_inventaire: timestamp("date_inventaire", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	statut: int("statut").default(0).notNull(),
	type_inventaire: int("type_inventaire").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	zone_id: int("zone_id"),
	archive: tinyint("archive").default(0).notNull(),
	date_archivage: timestamp("date_archivage", { mode: 'string' }),
},
(table) => {
	return {
		users_id_foreign: index("inventaires_users_id_foreign").on(table.users_id),
		inventaires_id: primaryKey({ columns: [table.id], name: "inventaires_id"}),
	}
});

export const inventdetails = mysqlTable("inventdetails", {
	id: int("id").autoincrement().notNull(),
	invent_id: int("invent_id").notNull(),
	produit_id: char("produit_id", { length: 36 }).notNull(),
	nom: mediumtext("nom"),
	qte_sys: int("qte_sys").default(0),
	qte_phys: int("qte_phys").notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	ppv: double("ppv").notNull(),
	ecart: int("ecart").notNull(),
	commentaire: varchar("commentaire", { length: 22 }),
	PPH: varchar("PPH", { length: 222 }).notNull(),
	statut: int("statut").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	zone_id: int("zone_id"),
},
(table) => {
	return {
		inventdetails_id: primaryKey({ columns: [table.id], name: "inventdetails_id"}),
	}
});

export const jobs = mysqlTable("jobs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	queue: varchar("queue", { length: 191 }).notNull(),
	payload: longtext("payload").notNull(),
	attempts: tinyint("attempts").notNull(),
	reserved_at: int("reserved_at", { unsigned: true }),
	available_at: int("available_at", { unsigned: true }).notNull(),
	created_at: int("created_at", { unsigned: true }).notNull(),
},
(table) => {
	return {
		queue_idx: index("queue_idx").on(table.queue),
		jobs_id: primaryKey({ columns: [table.id], name: "jobs_id"}),
	}
});

export const lab_offer_conditions = mysqlTable("lab_offer_conditions", {
	id: char("id", { length: 36 }).notNull(),
	type: mysqlEnum("type", ['product','pack']).default('product').notNull(),
	lab_pack_id: char("lab_pack_id", { length: 36 }).references(() => lab_packs.id, { onDelete: "cascade" } ),
	lab_product_id: char("lab_product_id", { length: 36 }).references(() => lab_pack_products.id, { onDelete: "cascade" } ),
	measurement: mysqlEnum("measurement", ['qty','value','max_qty']).default('qty').notNull(),
	value: decimal("value", { precision: 8, scale: 2 }),
	reward_type: mysqlEnum("reward_type", ['discount','qty','value']),
	reward: decimal("reward", { precision: 8, scale: 2 }),
	reward_product_id: char("reward_product_id", { length: 36 }).references(() => products.id, { onDelete: "cascade" } ),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		lab_offer_conditions_id: primaryKey({ columns: [table.id], name: "lab_offer_conditions_id"}),
	}
});

export const lab_offers = mysqlTable("lab_offers", {
	id: char("id", { length: 36 }).notNull(),
	lab_id: char("lab_id", { length: 36 }).notNull().references(() => companies.id, { onDelete: "cascade" } ),
	name: text("name"),
	description: text("description"),
	start_date: datetime("start_date", { mode: 'string'}),
	end_date: datetime("end_date", { mode: 'string'}),
	active: tinyint("active").default(0).notNull(),
	direct: tinyint("direct").default(0).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		lab_offers_id: primaryKey({ columns: [table.id], name: "lab_offers_id"}),
	}
});

export const lab_order_details = mysqlTable("lab_order_details", {
	id: char("id", { length: 36 }).notNull(),
	lab_order_id: char("lab_order_id", { length: 36 }).notNull(),
	pack_product_id: char("pack_product_id", { length: 36 }).notNull(),
	price: decimal("price", { precision: 8, scale: 2 }).default('0.00').notNull(),
	old_price: double("old_price", { precision: 10, scale: 2 }),
	quantity: decimal("quantity", { precision: 8, scale: 2 }).default('0.00').notNull(),
	total: decimal("total", { precision: 8, scale: 2 }).default('0.00').notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	lab_pack_id: char("lab_pack_id", { length: 36 }).references(() => lab_packs.id, { onDelete: "set null" } ),
	total_before_discount: decimal("total_before_discount", { precision: 8, scale: 2 }).default('0.00').notNull(),
	total_discount: decimal("total_discount", { precision: 8, scale: 2 }).default('0.00').notNull(),
},
(table) => {
	return {
		lab_order_details_id: primaryKey({ columns: [table.id], name: "lab_order_details_id"}),
	}
});

export const lab_orders = mysqlTable("lab_orders", {
	id: char("id", { length: 36 }).notNull(),
	offer_id: char("offer_id", { length: 36 }).notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }),
	company_id: char("company_id", { length: 36 }).notNull(),
	status: mysqlEnum("status", ['draft','cart','ordered','processed','canceled','delivered']).default('draft').notNull(),
	order_id: bigint("order_id", { mode: "number", unsigned: true }).references(() => orders.id),
	total_order: decimal("total_order", { precision: 8, scale: 2 }).default('0.00').notNull(),
	total_saved: decimal("total_saved", { precision: 8, scale: 2 }).default('0.00').notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	state_json: text("state_json"),
	total_before_discount: decimal("total_before_discount", { precision: 8, scale: 2 }).default('0.00').notNull(),
	total_discount: decimal("total_discount", { precision: 8, scale: 2 }).default('0.00').notNull(),
	direct: tinyint("direct").default(0).notNull(),
	bl_scan_id: char("bl_scan_id", { length: 36 }),
},
(table) => {
	return {
		lab_orders_id: primaryKey({ columns: [table.id], name: "lab_orders_id"}),
	}
});

export const lab_pack_products = mysqlTable("lab_pack_products", {
	id: char("id", { length: 36 }).notNull(),
	lab_pack_id: char("lab_pack_id", { length: 36 }).notNull().references(() => lab_packs.id, { onDelete: "cascade" } ),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id, { onDelete: "cascade" } ),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		lab_pack_products_id: primaryKey({ columns: [table.id], name: "lab_pack_products_id"}),
	}
});

export const lab_pack_wholesalers = mysqlTable("lab_pack_wholesalers", {
	id: char("id", { length: 36 }).notNull(),
	lab_pack_id: char("lab_pack_id", { length: 36 }).notNull().references(() => lab_packs.id, { onDelete: "cascade" } ),
	wholesaler_id: char("wholesaler_id", { length: 36 }).notNull().references(() => companies.id, { onDelete: "cascade" } ),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		lab_pack_wholesalers_id: primaryKey({ columns: [table.id], name: "lab_pack_wholesalers_id"}),
	}
});

export const lab_packs = mysqlTable("lab_packs", {
	id: char("id", { length: 36 }).notNull(),
	lab_offer_id: char("lab_offer_id", { length: 36 }).notNull().references(() => lab_offers.id, { onDelete: "cascade" } ),
	name: text("name"),
	description: text("description"),
	active: tinyint("active").default(0).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		lab_packs_id: primaryKey({ columns: [table.id], name: "lab_packs_id"}),
	}
});

export const laboratoires = mysqlTable("laboratoires", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }),
	nom: varchar("nom", { length: 255 }),
	adresse: varchar("adresse", { length: 255 }),
	email: varchar("email", { length: 255 }),
	tele: varchar("tele", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		laboratoires_id: primaryKey({ columns: [table.id], name: "laboratoires_id"}),
	}
});

export const laboratories = mysqlTable("laboratories", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_type_id: int("laboratory_type_id").notNull(),
	parent_id: int("parent_id"),
	suggestion_id: int("suggestion_id"),
	name: varchar("name", { length: 191 }).notNull(),
	brand: varchar("brand", { length: 191 }),
	address: text("address"),
	email: varchar("email", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	fax: varchar("fax", { length: 191 }),
	website: varchar("website", { length: 191 }),
	user_id: char("user_id", { length: 36 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	program_id: tinyint("program_id"),
},
(table) => {
	return {
		laboratories_id: primaryKey({ columns: [table.id], name: "laboratories_id"}),
	}
});

export const laboratories_weight = mysqlTable("laboratories_weight", {
	laboratories_id: char("laboratories_id", { length: 36 }).notNull(),
	position: varchar("position", { length: 11 }),
	ordre: decimal("ordre", { precision: 14, scale: 4 }),
});

export const laboratory_balance_details = mysqlTable("laboratory_balance_details", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	balance_id: int("balance_id").notNull(),
	amount: decimal("amount", { precision: 18, scale: 5 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		laboratory_balance_details_id: primaryKey({ columns: [table.id], name: "laboratory_balance_details_id"}),
	}
});

export const laboratory_balances = mysqlTable("laboratory_balances", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }).notNull(),
	balance: decimal("balance", { precision: 18, scale: 5 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		laboratory_balances_id: primaryKey({ columns: [table.id], name: "laboratory_balances_id"}),
	}
});

export const laboratory_locations = mysqlTable("laboratory_locations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	laboratories_id: char("laboratories_id", { length: 36 }).notNull(),
	regions_id: int("regions_id").notNull(),
	cities_id: char("cities_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	secteurs_id: int("secteurs_id"),
},
(table) => {
	return {
		laboratory_locations_id: primaryKey({ columns: [table.id], name: "laboratory_locations_id"}),
	}
});

export const laboratory_suggestions = mysqlTable("laboratory_suggestions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_type_id: int("laboratory_type_id").notNull(),
	parent_id: int("parent_id"),
	name: varchar("name", { length: 191 }).notNull(),
	status: tinyint("status").default(0).notNull(),
	brand: varchar("brand", { length: 191 }),
	address: text("address"),
	email: varchar("email", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	fax: varchar("fax", { length: 191 }),
	website: varchar("website", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		laboratory_suggestions_id: primaryKey({ columns: [table.id], name: "laboratory_suggestions_id"}),
	}
});

export const laboratory_types = mysqlTable("laboratory_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		laboratory_types_id: primaryKey({ columns: [table.id], name: "laboratory_types_id"}),
	}
});

export const levels = mysqlTable("levels", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	color: varchar("color", { length: 191 }),
	min_amount: int("min_amount").notNull(),
	discount: double("discount", { precision: 8, scale: 2 }).notNull(),
	points: int("points").notNull(),
	is_premium: tinyint("is_premium").notNull(),
	duration: int("duration").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		levels_id: primaryKey({ columns: [table.id], name: "levels_id"}),
	}
});

export const licences = mysqlTable("licences", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	pharmacy_token: varchar("pharmacy_token", { length: 191 }).notNull(),
	ice: varchar("ice", { length: 191 }).notNull(),
	key: text("key").notNull(),
	duration: int("duration").notNull(),
	date_start: datetime("date_start", { mode: 'string'}),
	date_end: datetime("date_end", { mode: 'string'}),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		licences_id: primaryKey({ columns: [table.id], name: "licences_id"}),
	}
});

export const listepages = mysqlTable("listepages", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		listepages_id: primaryKey({ columns: [table.id], name: "listepages_id"}),
	}
});

export const log_actualities = mysqlTable("log_actualities", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	actuality_id: char("actuality_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		log_actualities_id: primaryKey({ columns: [table.id], name: "log_actualities_id"}),
	}
});

export const log_carts = mysqlTable("log_carts", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: int("cms_users_id").notNull(),
	offers_id: int("offers_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		log_carts_id: primaryKey({ columns: [table.id], name: "log_carts_id"}),
	}
});

export const log_commandes = mysqlTable("log_commandes", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: int("cms_users_id").notNull(),
	offers_id: int("offers_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		log_commandes_id: primaryKey({ columns: [table.id], name: "log_commandes_id"}),
	}
});

export const log_consultations = mysqlTable("log_consultations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: int("cms_users_id").notNull(),
	offers_id: int("offers_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		log_consultations_id: primaryKey({ columns: [table.id], name: "log_consultations_id"}),
	}
});

export const log_simulations = mysqlTable("log_simulations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: int("cms_users_id").notNull(),
	offers_id: int("offers_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		log_simulations_id: primaryKey({ columns: [table.id], name: "log_simulations_id"}),
	}
});

export const loyalty_company_wallets = mysqlTable("loyalty_company_wallets", {
	id: char("id", { length: 36 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	program_id: char("program_id", { length: 36 }).references(() => loyalty_programs.id),
	value: double("value", { precision: 10, scale: 2 }),
	expired_at: datetime("expired_at", { mode: 'string'}),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		loyalty_company_wallets_id: primaryKey({ columns: [table.id], name: "loyalty_company_wallets_id"}),
	}
});

export const loyalty_orders = mysqlTable("loyalty_orders", {
	id: char("id", { length: 36 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	company_id: char("company_id", { length: 36 }).references(() => companies.id),
	product_id: char("product_id", { length: 36 }).references(() => loyalty_product_program.id, { onDelete: "cascade" } ),
	qty: bigint("qty", { mode: "number" }),
	price: double("price", { precision: 10, scale: 2 }),
	total: double("total", { precision: 10, scale: 2 }),
	discounted_total: double("discounted_total", { precision: 10, scale: 2 }),
	cash_back: double("cash_back", { precision: 10, scale: 2 }),
	is_paid: tinyint("is_paid").default(0).notNull(),
	order_line_id: bigint("order_line_id", { mode: "number", unsigned: true }).references(() => order_details.id),
	delivery_line_id: bigint("delivery_line_id", { mode: "number", unsigned: true }),
	source_type: mysqlEnum("source_type", ['delivery_notes','orders']).default('orders').notNull(),
	program_id: char("program_id", { length: 36 }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		loyalty_orders_id: primaryKey({ columns: [table.id], name: "loyalty_orders_id"}),
	}
});

export const loyalty_product_program = mysqlTable("loyalty_product_program", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }),
	program_id: char("program_id", { length: 36 }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		loyalty_product_program_id: primaryKey({ columns: [table.id], name: "loyalty_product_program_id"}),
	}
});

export const loyalty_programs = mysqlTable("loyalty_programs", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }),
	company_id: char("company_id", { length: 36 }).notNull().references(() => companies.id, { onDelete: "cascade" } ),
	start_date: datetime("start_date", { mode: 'string'}),
	end_date: datetime("end_date", { mode: 'string'}),
	active: tinyint("active").default(0).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	general_condition_id: bigint("general_condition_id", { mode: "number", unsigned: true }).references(() => general_conditions.id),
},
(table) => {
	return {
		loyalty_programs_id: primaryKey({ columns: [table.id], name: "loyalty_programs_id"}),
	}
});

export const loyalty_user_program = mysqlTable("loyalty_user_program", {
	id: char("id", { length: 36 }).notNull(),
	program_id: char("program_id", { length: 36 }).references(() => loyalty_programs.id),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	registration_status: tinyint("registration_status").default(0).notNull(),
	registered_at: datetime("registered_at", { mode: 'string'}),
	unregistered_at: datetime("unregistered_at", { mode: 'string'}).default('0000-00-00 00:00:00').notNull(),
	cgu_accepted: tinyint("cgu_accepted").default(0).notNull(),
	cgu_accepted_at: datetime("cgu_accepted_at", { mode: 'string'}),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	program_tier_id: char("program_tier_id", { length: 36 }).references(() => program_tiers.id),
},
(table) => {
	return {
		loyalty_user_program_id: primaryKey({ columns: [table.id], name: "loyalty_user_program_id"}),
	}
});

export const manager_alerts = mysqlTable("manager_alerts", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	name: varchar("name", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	email: varchar("email", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	status: tinyint("status").default(0).notNull(),
},
(table) => {
	return {
		manager_alerts_id: primaryKey({ columns: [table.id], name: "manager_alerts_id"}),
	}
});

export const matched_lab_order_delivery_scan = mysqlTable("matched_lab_order_delivery_scan", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	lab_order_id: char("lab_order_id", { length: 36 }).notNull().references(() => lab_orders.id),
	scan_id: char("scan_id", { length: 36 }).notNull().references(() => bl_scan.id),
	scanned_product_id: char("scanned_product_id", { length: 36 }).notNull().references(() => scanned_products.id),
	matched_product: tinyint("matched_product").default(0).notNull(),
	matched_quantity: tinyint("matched_quantity").default(0).notNull(),
	matched_price: tinyint("matched_price").default(0).notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		matched_lab_order_delivery_scan_id: primaryKey({ columns: [table.id], name: "matched_lab_order_delivery_scan_id"}),
	}
});

export const matched_products = mysqlTable("matched_products", {
	id: char("id", { length: 36 }).notNull(),
	code_bar: tinyint("code_bar"),
	presentation: tinyint("presentation"),
	description: tinyint("description"),
	nfc_code: tinyint("nfc_code"),
	atc_code: tinyint("atc_code"),
	is_generic: tinyint("is_generic"),
	pph: tinyint("pph"),
	ppgro: tinyint("ppgro"),
	ppv: tinyint("ppv"),
	ph: tinyint("ph"),
	tva: tinyint("tva"),
	molecule: tinyint("molecule"),
	laboratory: tinyint("laboratory"),
	dosage: tinyint("dosage"),
	unit: tinyint("unit"),
	brand_name: tinyint("brand_name"),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	alt_product_id: char("alt_product_id", { length: 36 }).references(() => alt_products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	ppvr: tinyint("ppvr"),
	phr: tinyint("phr"),
	type_med: tinyint("type_med"),
	classe_therapeutique: tinyint("classe_therapeutique"),
	remboursement: tinyint("remboursement"),
	table: tinyint("table"),
},
(table) => {
	return {
		matched_products_id: primaryKey({ columns: [table.id], name: "matched_products_id"}),
	}
});

export const migrations = mysqlTable("migrations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	migration: varchar("migration", { length: 255 }).notNull(),
	batch: int("batch").notNull(),
},
(table) => {
	return {
		migrations_id: primaryKey({ columns: [table.id], name: "migrations_id"}),
	}
});

export const modes = mysqlTable("modes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		modes_id: primaryKey({ columns: [table.id], name: "modes_id"}),
	}
});

export const modules = mysqlTable("modules", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	slug: varchar("slug", { length: 191 }).notNull(),
	permissions: text("permissions"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		modules_id: primaryKey({ columns: [table.id], name: "modules_id"}),
	}
});

export const molecule_atcs = mysqlTable("molecule_atcs", {
	id: char("id", { length: 36 }).notNull(),
	molecule_id: char("molecule_id", { length: 36 }).notNull(),
	act_code: varchar("act_code", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		molecule_atcs_id: primaryKey({ columns: [table.id], name: "molecule_atcs_id"}),
	}
});

export const molecule_groups = mysqlTable("molecule_groups", {
	id: char("id", { length: 36 }).notNull(),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	group_id: char("group_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		molecule_groups_id: primaryKey({ columns: [table.id], name: "molecule_groups_id"}),
	}
});

export const molecule_infos = mysqlTable("molecule_infos", {
	id: char("id", { length: 36 }).notNull(),
	title: varchar("title", { length: 191 }),
	iupac: varchar("iupac", { length: 191 }),
	synonyms: varchar("synonyms", { length: 191 }),
	defined_daily_dose_who: varchar("defined_daily_dose_who", { length: 191 }),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		molecule_infos_id: primaryKey({ columns: [table.id], name: "molecule_infos_id"}),
	}
});

export const molecule_posologies = mysqlTable("molecule_posologies", {
	id: char("id", { length: 36 }).notNull(),
	content: text("content"),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		molecule_posologies_id: primaryKey({ columns: [table.id], name: "molecule_posologies_id"}),
	}
});

export const molecules = mysqlTable("molecules", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	abbv: varchar("abbv", { length: 255 }),
	type: mysqlEnum("type", ['active','excipients']).default('active').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	link_vidal: text("link_vidal"),
	check: tinyint("check").default(0),
	check_completed: tinyint("check_completed").default(0),
	rmm: text("rmm"),
	global_update: tinyint("global_update").default(0),
	breastfeeding_risk: varchar("breastfeeding_risk", { length: 191 }),
	med_index: tinyint("med_index").default(1),
},
(table) => {
	return {
		molecules_id: primaryKey({ columns: [table.id], name: "molecules_id"}),
	}
});

export const natures = mysqlTable("natures", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		natures_id: primaryKey({ columns: [table.id], name: "natures_id"}),
	}
});

export const notification_sendings = mysqlTable("notification_sendings", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	notification_id: int("notification_id"),
	notification_type: varchar("notification_type", { length: 191 }),
	content: text("content"),
	link: text("link"),
	sending_date: timestamp("sending_date", { mode: 'string' }),
	sending_stat: int("sending_stat").default(0).notNull(),
	reading_date: timestamp("reading_date", { mode: 'string' }),
	reading_stat: int("reading_stat").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	errors: text("errors"),
},
(table) => {
	return {
		notification_sendings_id: primaryKey({ columns: [table.id], name: "notification_sendings_id"}),
	}
});

export const notification_stats = mysqlTable("notification_stats", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		notification_stats_id: primaryKey({ columns: [table.id], name: "notification_stats_id"}),
	}
});

export const notification_statuses = mysqlTable("notification_statuses", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		notification_statuses_id: primaryKey({ columns: [table.id], name: "notification_statuses_id"}),
	}
});

export const notification_system_details = mysqlTable("notification_system_details", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	system_notification_id: bigint("system_notification_id", { mode: "number", unsigned: true }).notNull().references(() => notification_sendings.id, { onDelete: "cascade" } ),
	element: text("element").notNull(),
	extra: text("extra").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		notification_system_details_id: primaryKey({ columns: [table.id], name: "notification_system_details_id"}),
	}
});

export const notification_targets = mysqlTable("notification_targets", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	notification_id: int("notification_id").notNull(),
	target_id: int("target_id").notNull(),
	nbr_users: int("nbr_users"),
	users: text("users"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		notification_targets_id: primaryKey({ columns: [table.id], name: "notification_targets_id"}),
	}
});

export const notifications = mysqlTable("notifications", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }),
	name: varchar("name", { length: 191 }),
	content: text("content").notNull(),
	link: text("link"),
	sending_date: datetime("sending_date", { mode: 'string'}).notNull(),
	notification_stat_id: int("notification_stat_id").notNull(),
	type_notification_id: int("type_notification_id").default(1).notNull(),
	phone_numbers: varchar("phone_numbers", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	lien_externe: text("lien_externe"),
	internal_links_id: int("internal_links_id"),
	element: text("element"),
	users_id: char("users_id", { length: 36 }),
	extra_params: text("extra_params"),
	target_app: mysqlEnum("target_app", ['blink','fidelis']).default('fidelis').notNull(),
},
(table) => {
	return {
		notifications_id: primaryKey({ columns: [table.id], name: "notifications_id"}),
	}
});

export const notifications_cms_users = mysqlTable("notifications_cms_users", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: int("cms_users_id").notNull(),
	notifications_id: int("notifications_id").notNull(),
	date_diffusion: datetime("date_diffusion", { mode: 'string'}).notNull(),
	is_read: tinyint("is_read").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		notifications_cms_users_id: primaryKey({ columns: [table.id], name: "notifications_cms_users_id"}),
	}
});

export const notifications_destinations = mysqlTable("notifications_destinations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	destinations_id: int("destinations_id").notNull(),
	notifications_id: int("notifications_id").notNull(),
},
(table) => {
	return {
		notifications_destinations_id: primaryKey({ columns: [table.id], name: "notifications_destinations_id"}),
	}
});

export const oauth_access_tokens = mysqlTable("oauth_access_tokens", {
	id: varchar("id", { length: 100 }).notNull(),
	user_id: char("user_id", { length: 36 }),
	client_id: char("client_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }),
	scopes: text("scopes"),
	revoked: tinyint("revoked").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	expires_at: datetime("expires_at", { mode: 'string'}),
},
(table) => {
	return {
		user_id_idx: index("user_id_idx").on(table.user_id),
		oauth_access_tokens_id: primaryKey({ columns: [table.id], name: "oauth_access_tokens_id"}),
	}
});

export const oauth_auth_codes = mysqlTable("oauth_auth_codes", {
	id: varchar("id", { length: 100 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	client_id: char("client_id", { length: 36 }).notNull(),
	scopes: text("scopes"),
	revoked: tinyint("revoked").notNull(),
	expires_at: datetime("expires_at", { mode: 'string'}),
},
(table) => {
	return {
		user_id_idx: index("user_id_idx").on(table.user_id),
		oauth_auth_codes_id: primaryKey({ columns: [table.id], name: "oauth_auth_codes_id"}),
	}
});

export const oauth_clients = mysqlTable("oauth_clients", {
	id: char("id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }),
	name: varchar("name", { length: 191 }).notNull(),
	secret: varchar("secret", { length: 100 }),
	provider: varchar("provider", { length: 191 }),
	redirect: text("redirect").notNull(),
	personal_access_client: tinyint("personal_access_client").notNull(),
	password_client: tinyint("password_client").notNull(),
	revoked: tinyint("revoked").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		user_id_idx: index("user_id_idx").on(table.user_id),
		oauth_clients_id: primaryKey({ columns: [table.id], name: "oauth_clients_id"}),
	}
});

export const oauth_personal_access_clients = mysqlTable("oauth_personal_access_clients", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	client_id: char("client_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		oauth_personal_access_clients_id: primaryKey({ columns: [table.id], name: "oauth_personal_access_clients_id"}),
	}
});

export const oauth_refresh_tokens = mysqlTable("oauth_refresh_tokens", {
	id: varchar("id", { length: 100 }).notNull(),
	access_token_id: varchar("access_token_id", { length: 100 }).notNull(),
	revoked: tinyint("revoked").notNull(),
	expires_at: datetime("expires_at", { mode: 'string'}),
},
(table) => {
	return {
		access_token_id_idx: index("access_token_id_idx").on(table.access_token_id),
		oauth_refresh_tokens_id: primaryKey({ columns: [table.id], name: "oauth_refresh_tokens_id"}),
	}
});

export const offer_locations = mysqlTable("offer_locations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	offers_id: int("offers_id").notNull(),
	regions_id: int("regions_id").notNull(),
	cities_id: int("cities_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	secteurs_id: int("secteurs_id"),
},
(table) => {
	return {
		offer_locations_id: primaryKey({ columns: [table.id], name: "offer_locations_id"}),
	}
});

export const offer_pack = mysqlTable("offer_pack", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	offer_id: int("offer_id").notNull(),
	pack_id: int("pack_id").notNull(),
},
(table) => {
	return {
		offer_pack_id: primaryKey({ columns: [table.id], name: "offer_pack_id"}),
	}
});

export const offers = mysqlTable("offers", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	label: varchar("label", { length: 191 }),
	diffusion: int("diffusion").default(1).notNull(),
	status: tinyint("status").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	date_start: datetime("date_start", { mode: 'string'}).notNull(),
	date_end: datetime("date_end", { mode: 'string'}).notNull(),
	details: text("details"),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	image: varchar("image", { length: 191 }),
	has_image: tinyint("has_image"),
	is_pricewt: tinyint("is_pricewt"),
},
(table) => {
	return {
		offers_id: primaryKey({ columns: [table.id], name: "offers_id"}),
	}
});

export const offers_cities = mysqlTable("offers_cities", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cities_id: char("cities_id", { length: 36 }).notNull(),
	offers_id: int("offers_id").notNull(),
},
(table) => {
	return {
		offers_cities_id: primaryKey({ columns: [table.id], name: "offers_cities_id"}),
	}
});

export const offers_cms_privileges = mysqlTable("offers_cms_privileges", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_privileges_id: int("cms_privileges_id").notNull(),
	offers_id: int("offers_id").notNull(),
},
(table) => {
	return {
		offers_cms_privileges_id: primaryKey({ columns: [table.id], name: "offers_cms_privileges_id"}),
	}
});

export const offers_destinations = mysqlTable("offers_destinations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	destinations_id: int("destinations_id").notNull(),
	offers_id: int("offers_id").notNull(),
},
(table) => {
	return {
		offers_destinations_id: primaryKey({ columns: [table.id], name: "offers_destinations_id"}),
	}
});

export const offers_regions = mysqlTable("offers_regions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	regions_id: int("regions_id").notNull(),
	offers_id: int("offers_id").notNull(),
},
(table) => {
	return {
		offers_regions_id: primaryKey({ columns: [table.id], name: "offers_regions_id"}),
	}
});

export const onboard_screens = mysqlTable("onboard_screens", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	service_id: int("service_id").notNull(),
	title: varchar("title", { length: 191 }).notNull(),
	description: text("description"),
	splash: text("splash"),
	image: text("image"),
	link: varchar("link", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		onboard_screens_id: primaryKey({ columns: [table.id], name: "onboard_screens_id"}),
	}
});

export const ongoing_offers = mysqlTable("ongoing_offers", {
	id: char("id", { length: 36 }).notNull(),
	offer_id: char("offer_id", { length: 36 }).notNull().references(() => premium_offers.id),
	company_id: char("company_id", { length: 36 }).notNull().references(() => companies.id),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	start_date: date("start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	end_date: date("end_date", { mode: 'string' }).notNull(),
	active: tinyint("active").default(1).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		ongoing_offers_id: primaryKey({ columns: [table.id], name: "ongoing_offers_id"}),
	}
});

export const operation_types = mysqlTable("operation_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		operation_types_id: primaryKey({ columns: [table.id], name: "operation_types_id"}),
	}
});

export const order_datas = mysqlTable("order_datas", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	order_id: int("order_id").notNull(),
	store_program_id: int("store_program_id").notNull(),
	level_id: int("level_id"),
	promotion_id: int("promotion_id"),
	points: int("points"),
	level_points: int("level_points"),
	discount: decimal("discount", { precision: 18, scale: 5 }),
	wallet: decimal("wallet", { precision: 18, scale: 5 }),
	total_price_ht: decimal("total_price_ht", { precision: 18, scale: 5 }),
	total_price_ttc: decimal("total_price_ttc", { precision: 18, scale: 5 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		order_datas_id: primaryKey({ columns: [table.id], name: "order_datas_id"}),
	}
});

export const order_detail_suggestions = mysqlTable("order_detail_suggestions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		order_detail_suggestions_id: primaryKey({ columns: [table.id], name: "order_detail_suggestions_id"}),
	}
});

export const order_details = mysqlTable("order_details", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	order_id: int("order_id").notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	store_program_id: int("store_program_id"),
	qty: int("qty").default(0).notNull(),
	magic_qty: int("magic_qty").default(0).notNull(),
	ppv: double("ppv", { precision: 8, scale: 2 }),
	pph: double("pph", { precision: 8, scale: 2 }),
	tva: double("tva", { precision: 8, scale: 2 }),
	tva_amount: double("tva_amount", { precision: 8, scale: 2 }).notNull(),
	pph_ht: double("pph_ht", { precision: 8, scale: 2 }),
	total_pph_ht: decimal("total_pph_ht", { precision: 18, scale: 5 }),
	points: int("points"),
	level_points: int("level_points"),
	level: varchar("level", { length: 191 }),
	discount: double("discount", { precision: 8, scale: 2 }),
	discount_amount: decimal("discount_amount", { precision: 18, scale: 5 }),
	is_suggestion: int("is_suggestion").default(0).notNull(),
	parent_id: int("parent_id"),
	btn_magic: int("btn_magic").default(0).notNull(),
	order: int("order").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		order_details_id: primaryKey({ columns: [table.id], name: "order_details_id"}),
	}
});

export const order_status_histories = mysqlTable("order_status_histories", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	order_id: int("order_id"),
	order_status_id: int("order_status_id"),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	json_order: longtext("json_order").notNull(),
},
(table) => {
	return {
		order_status_histories_id: primaryKey({ columns: [table.id], name: "order_status_histories_id"}),
	}
});

export const order_statuses = mysqlTable("order_statuses", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	can_edit: tinyint("can_edit").default(0).notNull(),
	can_delete: tinyint("can_delete").default(0).notNull(),
	can_validate: tinyint("can_validate").default(0).notNull(),
	can_convert: tinyint("can_convert").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		order_statuses_id: primaryKey({ columns: [table.id], name: "order_statuses_id"}),
	}
});

export const order_wallets = mysqlTable("order_wallets", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	order_id: int("order_id").notNull(),
	store_program_id: int("store_program_id").notNull(),
	amount: double("amount", { precision: 8, scale: 2 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		order_wallets_id: primaryKey({ columns: [table.id], name: "order_wallets_id"}),
	}
});

export const orders = mysqlTable("orders", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	reference: varchar("reference", { length: 191 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }),
	order_status_id: int("order_status_id").default(1).notNull(),
	date: datetime("date", { mode: 'string'}),
	synced_at: datetime("synced_at", { mode: 'string'}),
	nb_products: int("nb_products").notNull(),
	total_price_ht: decimal("total_price_ht", { precision: 18, scale: 5 }),
	total_price_ttc: decimal("total_price_ttc", { precision: 18, scale: 5 }),
	tva: decimal("tva", { precision: 18, scale: 5 }),
	wallet_amount: decimal("wallet_amount", { precision: 18, scale: 5 }),
	paid_price_ttc: decimal("paid_price_ttc", { precision: 18, scale: 5 }),
	btn_magic: int("btn_magic").default(0).notNull(),
	cancel_reason: text("cancel_reason").notNull(),
	canceled_at: timestamp("canceled_at", { mode: 'string' }).default('0000-00-00 00:00:00').notNull(),
	opened_at: timestamp("opened_at", { mode: 'string' }).default('0000-00-00 00:00:00').notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	order_type: text("order_type", { enum: ["online", "offline"] })
},
(table) => {
	return {
		orders_id: primaryKey({ columns: [table.id], name: "orders_id"}),
	}
});

export const organismes = mysqlTable("organismes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	nom: varchar("nom", { length: 255 }),
	site: varchar("site", { length: 255 }),
	adresse: varchar("adresse", { length: 255 }),
	ville: char("ville", { length: 36 }),
	pays: char("pays", { length: 36 }),
	code_postal: varchar("code_postal", { length: 255 }),
	tele: varchar("tele", { length: 255 }),
	email: varchar("email", { length: 255 }),
	description: varchar("description", { length: 255 }),
	credit: int("credit"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	image: varchar("image", { length: 222 }),
},
(table) => {
	return {
		organismes_id: primaryKey({ columns: [table.id], name: "organismes_id"}),
	}
});

export const organisms = mysqlTable("organisms", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		organisms_id: primaryKey({ columns: [table.id], name: "organisms_id"}),
	}
});

export const p_categories = mysqlTable("p_categories", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	parent_id: char("parent_id", { length: 36 }),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	type: mysqlEnum("type", ['lab','internal','integration']).default('lab').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		p_categories_id: primaryKey({ columns: [table.id], name: "p_categories_id"}),
	}
});

export const pack_product = mysqlTable("pack_product", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	pack_id: int("pack_id").notNull(),
	product_id: int("product_id").notNull(),
},
(table) => {
	return {
		pack_product_id: primaryKey({ columns: [table.id], name: "pack_product_id"}),
	}
});

export const packs = mysqlTable("packs", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	packs_id: int("packs_id"),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	date_start: datetime("date_start", { mode: 'string'}).notNull(),
	date_end: datetime("date_end", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		packs_id: primaryKey({ columns: [table.id], name: "packs_id"}),
	}
});

export const page_category = mysqlTable("page_category", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	status: tinyint("status").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		page_category_id: primaryKey({ columns: [table.id], name: "page_category_id"}),
	}
});

export const pages = mysqlTable("pages", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	categorie_id: int("categorie_id").notNull(),
	title: varchar("title", { length: 191 }),
	image: text("image"),
	icon: text("icon"),
	position: int("position"),
	content: text("content"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pages_id: primaryKey({ columns: [table.id], name: "pages_id"}),
	}
});

export const paiementconfreres = mysqlTable("paiementconfreres", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	confreres_id: int("confreres_id").notNull(),
	montant_paye: decimal("montant_paye", { precision: 10, scale: 2 }),
	mode_paiment: int("mode_paiment"),
	client_id: char("client_id", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}).notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	sortieconfreres_id: bigint("sortieconfreres_id", { mode: "number" }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		paiementconfreres_id: primaryKey({ columns: [table.id], name: "paiementconfreres_id"}),
	}
});

export const paiementfournisseur = mysqlTable("paiementfournisseur", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	fourisseur_id: char("fourisseur_id", { length: 36 }).notNull(),
	montant_paye: decimal("montant_paye", { precision: 10, scale: 2 }),
	mode_paiment: int("mode_paiment"),
	client_id: char("client_id", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	bonlivraisons_id: bigint("bonlivraisons_id", { mode: "number" }),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}).notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	caisse_id: bigint("caisse_id", { mode: "number", unsigned: true }).references(() => caisses.id),
},
(table) => {
	return {
		paiementfournisseur_id: primaryKey({ columns: [table.id], name: "paiementfournisseur_id"}),
	}
});

export const parainage = mysqlTable("parainage", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users: int("cms_users"),
	added_by: int("added_by"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		parainage_id: primaryKey({ columns: [table.id], name: "parainage_id"}),
	}
});

export const paramètrescaisses = mysqlTable("paramètrescaisses", {
	id: int("id").autoincrement().notNull(),
	montant_démarrage: double("montant_démarrage", { precision: 10, scale: 2 }).notNull(),
	modifié_par: int("modifié_par").notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		paramètrescaisses_id: primaryKey({ columns: [table.id], name: "paramètrescaisses_id"}),
	}
});

export const parrainage = mysqlTable("parrainage", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	date_debut: datetime("date_debut", { mode: 'string'}),
	date_fin: datetime("date_fin", { mode: 'string'}),
	winner_id: int("winner_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	description: text("description"),
	image: varchar("image", { length: 191 }),
},
(table) => {
	return {
		parrainage_id: primaryKey({ columns: [table.id], name: "parrainage_id"}),
	}
});

export const parrainage_users = mysqlTable("parrainage_users", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	parrainage_id: int("parrainage_id"),
	parrain_id: int("parrain_id"),
	cms_users_id: char("cms_users_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		parrainage_users_id: primaryKey({ columns: [table.id], name: "parrainage_users_id"}),
	}
});

export const participations = mysqlTable("participations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	promotion_id: int("promotion_id").notNull(),
	questionnaire_id: int("questionnaire_id").notNull(),
	points_user: int("points_user").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	points_store: int("points_store").default(0).notNull(),
},
(table) => {
	return {
		participations_id: primaryKey({ columns: [table.id], name: "participations_id"}),
	}
});

export const password_resets = mysqlTable("password_resets", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	email: varchar("email", { length: 191 }).notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
},
(table) => {
	return {
		email_idx: index("email_idx").on(table.email),
		password_resets_my_row_id: primaryKey({ columns: [table.my_row_id], name: "password_resets_my_row_id"}),
	}
});

export const pathologies = mysqlTable("pathologies", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	category: varchar("category", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		pathologies_id: primaryKey({ columns: [table.id], name: "pathologies_id"}),
	}
});

export const pays = mysqlTable("pays", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom: varchar("Nom", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pays_id: primaryKey({ columns: [table.id], name: "pays_id"}),
	}
});

export const permission_phroles = mysqlTable("permission_phroles", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	permission_id: bigint("permission_id", { mode: "number", unsigned: true }).notNull(),
	role_id: bigint("role_id", { mode: "number", unsigned: true }).notNull(),
	created_by: int("created_by"),
	updated_by: int("updated_by"),
	deleted_by: int("deleted_by"),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		permission_id_foreign: index("permission_phroles_permission_id_foreign").on(table.permission_id),
		role_id_foreign: index("permission_phroles_role_id_foreign").on(table.role_id),
		permission_phroles_id: primaryKey({ columns: [table.id], name: "permission_phroles_id"}),
	}
});

export const permission_users = mysqlTable("permission_users", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	permission_id: bigint("permission_id", { mode: "number", unsigned: true }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	created_by: int("created_by"),
	updated_by: int("updated_by"),
	deleted_by: int("deleted_by"),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		permission_id_foreign: index("permission_users_permission_id_foreign").on(table.permission_id),
		permission_users_id: primaryKey({ columns: [table.id], name: "permission_users_id"}),
	}
});

export const permissions = mysqlTable("permissions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	reference: varchar("reference", { length: 191 }).notNull(),
	stat: tinyint("stat").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		permissions_id: primaryKey({ columns: [table.id], name: "permissions_id"}),
	}
});

export const personal_access_tokens = mysqlTable("personal_access_tokens", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	tokenable_type: varchar("tokenable_type", { length: 191 }).notNull(),
	tokenable_id: varchar("tokenable_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	token: varchar("token", { length: 64 }).notNull(),
	abilities: text("abilities"),
	last_used_at: timestamp("last_used_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	expires_at: timestamp("expires_at", { mode: 'string' }),
},
(table) => {
	return {
		tokenable_type_tokenable_id_idx: index("tokenable_type_tokenable_id_idx").on(table.tokenable_type, table.tokenable_id),
		personal_access_tokens_id: primaryKey({ columns: [table.id], name: "personal_access_tokens_id"}),
		personal_access_tokens_token_unique: unique("personal_access_tokens_token_unique").on(table.token),
	}
});

export const ph_roles = mysqlTable("ph_roles", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	display_name: varchar("display_name", { length: 255 }),
	description: varchar("description", { length: 255 }),
	created_by: int("created_by"),
	updated_by: int("updated_by"),
	deleted_by: int("deleted_by"),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		ph_roles_id: primaryKey({ columns: [table.id], name: "ph_roles_id"}),
		ph_roles_name_unique: unique("ph_roles_name_unique").on(table.name),
	}
});

export const pharmacie_statuses = mysqlTable("pharmacie_statuses", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pharmacie_statuses_id: primaryKey({ columns: [table.id], name: "pharmacie_statuses_id"}),
	}
});

export const pharmacies = mysqlTable("pharmacies", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	civility: varchar("civility", { length: 191 }),
	first_name: varchar("first_name", { length: 191 }),
	last_name: varchar("last_name", { length: 191 }),
	street: varchar("street", { length: 191 }),
	cities_id: varchar("cities_id", { length: 191 }),
	regions_id: varchar("regions_id", { length: 191 }),
	zip_code: varchar("zip_code", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	fax: varchar("fax", { length: 191 }),
	mobile: varchar("mobile", { length: 191 }),
	email: varchar("email", { length: 191 }),
	pharmacy: varchar("pharmacy", { length: 191 }),
	gender: varchar("gender", { length: 191 }),
	code: varchar("code", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacie_statuses_id: int("pharmacie_statuses_id").default(1).notNull(),
	city_2: varchar("city_2", { length: 191 }),
	secteurs_id: int("secteurs_id"),
	code_barre: varchar("code_barre", { length: 255 }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	rc: varchar("rc", { length: 191 }),
	ice: varchar("ice", { length: 191 }),
	if_text: varchar("if_text", { length: 250 }),
	imported: tinyint("imported"),
},
(table) => {
	return {
		pharmacies_id: primaryKey({ columns: [table.id], name: "pharmacies_id"}),
	}
});

export const pharmacy_files = mysqlTable("pharmacy_files", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	file: text("file").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		pharmacy_files_id: primaryKey({ columns: [table.id], name: "pharmacy_files_id"}),
	}
});

export const pharmacy_fournisseurs = mysqlTable("pharmacy_fournisseurs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	fournisseur_id: char("fournisseur_id", { length: 36 }).notNull(),
	credit: double("credit", { precision: 18, scale: 5 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pharmacy_fournisseurs_id: primaryKey({ columns: [table.id], name: "pharmacy_fournisseurs_id"}),
	}
});

export const pharmacy_produits = mysqlTable("pharmacy_produits", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	quantity: int("quantity").notNull(),
	qte_compta: int("qte_compta"),
	quantity_min: int("quantity_min").notNull(),
	quantity_max: int("quantity_max").notNull(),
	zone_id: int("zone_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pharmacy_id: index("pharmacy_id").on(table.pharmacy_id),
		product_id: index("product_id").on(table.product_id),
		pharmacy_produits_id: primaryKey({ columns: [table.id], name: "pharmacy_produits_id"}),
	}
});

export const pharmacy_statuses = mysqlTable("pharmacy_statuses", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	tag: varchar("tag", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		pharmacy_statuses_id: primaryKey({ columns: [table.id], name: "pharmacy_statuses_id"}),
	}
});

export const pharmcy_reservation_comments = mysqlTable("pharmcy_reservation_comments", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmcy_reservation_id: int("pharmcy_reservation_id").notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	comment: text("comment"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pharmcy_reservation_comments_id: primaryKey({ columns: [table.id], name: "pharmcy_reservation_comments_id"}),
	}
});

export const pharmcy_reservations = mysqlTable("pharmcy_reservations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	stat: tinyint("stat").default(1).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pharmcy_reservations_id: primaryKey({ columns: [table.id], name: "pharmcy_reservations_id"}),
	}
});

export const phone_requests = mysqlTable("phone_requests", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	phone: varchar("phone", { length: 191 }).notNull(),
	checked: tinyint("checked").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		phone_requests_id: primaryKey({ columns: [table.id], name: "phone_requests_id"}),
	}
});

export const phrole_users = mysqlTable("phrole_users", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	role_id: bigint("role_id", { mode: "number", unsigned: true }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	created_by: int("created_by"),
	updated_by: int("updated_by"),
	deleted_by: int("deleted_by"),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		role_id_foreign: index("phrole_users_role_id_foreign").on(table.role_id),
		phrole_users_id: primaryKey({ columns: [table.id], name: "phrole_users_id"}),
	}
});

export const point = mysqlTable("point", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	points: int("points"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		point_id: primaryKey({ columns: [table.id], name: "point_id"}),
	}
});

export const pointcontacts = mysqlTable("pointcontacts", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	fournisseur_id: char("fournisseur_id", { length: 36 }),
	name: varchar("name", { length: 255 }),
	first_name: varchar("first_name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	tele: varchar("tele", { length: 12 }),
	position: varchar("position", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		pointcontacts_id: primaryKey({ columns: [table.id], name: "pointcontacts_id"}),
	}
});

export const position_reservations = mysqlTable("position_reservations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	positions_id: int("positions_id").notNull(),
	positions_types_id: int("positions_types_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_debut: date("date_debut", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_fin: date("date_fin", { mode: 'string' }).notNull(),
	laboratories_id: char("laboratories_id", { length: 36 }).notNull(),
	grossistes_id: char("grossistes_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	accroche: varchar("accroche", { length: 191 }),
},
(table) => {
	return {
		position_reservations_id: primaryKey({ columns: [table.id], name: "position_reservations_id"}),
	}
});

export const positions = mysqlTable("positions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	positions_types_id: int("positions_types_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		positions_id: primaryKey({ columns: [table.id], name: "positions_id"}),
	}
});

export const positions_types = mysqlTable("positions_types", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		positions_types_id: primaryKey({ columns: [table.id], name: "positions_types_id"}),
	}
});

export const pre_generated_cities_ids = mysqlTable("pre_generated_cities_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		pre_generated_cities_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "pre_generated_cities_ids_my_row_id"}),
	}
});

export const pre_generated_grossiste_ids = mysqlTable("pre_generated_grossiste_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		pre_generated_grossiste_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "pre_generated_grossiste_ids_my_row_id"}),
	}
});

export const pre_generated_lab_ids = mysqlTable("pre_generated_lab_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		pre_generated_lab_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "pre_generated_lab_ids_my_row_id"}),
	}
});

export const pre_generated_pharmacy_ids = mysqlTable("pre_generated_pharmacy_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		pre_generated_pharmacy_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "pre_generated_pharmacy_ids_my_row_id"}),
	}
});

export const pre_generated_user_ids = mysqlTable("pre_generated_user_ids", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
},
(table) => {
	return {
		pre_generated_user_ids_my_row_id: primaryKey({ columns: [table.my_row_id], name: "pre_generated_user_ids_my_row_id"}),
	}
});

export const pregnancy_risks = mysqlTable("pregnancy_risks", {
	id: char("id", { length: 36 }).notNull(),
	months: int("months"),
	value: varchar("value", { length: 191 }),
	order: int("order"),
	synthese_id: char("synthese_id", { length: 36 }).references(() => syntheses.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		pregnancy_risks_id: primaryKey({ columns: [table.id], name: "pregnancy_risks_id"}),
	}
});

export const premium_offers = mysqlTable("premium_offers", {
	id: char("id", { length: 36 }).notNull(),
	name: text("name").notNull(),
	duration: int("duration").notNull(),
	active: tinyint("active").default(1).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		premium_offers_id: primaryKey({ columns: [table.id], name: "premium_offers_id"}),
	}
});

export const price_group = mysqlTable("price_group", {
	id: char("id", { length: 36 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	pharmacy_price: decimal("pharmacy_price", { precision: 8, scale: 2 }),
	lab_price: decimal("lab_price", { precision: 8, scale: 2 }),
	wholesaler_price: decimal("wholesaler_price", { precision: 8, scale: 2 }),
	active: tinyint("active").default(1).notNull(),
	tax_rate: int("tax_rate"),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	price_pharmacy_id: char("price_pharmacy_id", { length: 36 }).references(() => product_prices.id),
	price_wholesaler_id: char("price_wholesaler_id", { length: 36 }).references(() => product_prices.id),
	price_lab_id: char("price_lab_id", { length: 36 }).references(() => product_prices.id),
	source: text("source"),
},
(table) => {
	return {
		price_group_id: primaryKey({ columns: [table.id], name: "price_group_id"}),
	}
});

export const prixproduits = mysqlTable("prixproduits", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	PPV: decimal("PPV", { precision: 9, scale: 2 }).notNull(),
	PPH: decimal("PPH", { precision: 9, scale: 2 }).notNull(),
	produits_id: char("produits_id", { length: 36 }).notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	active: int("active").default(0).notNull(),
	creer_par: char("creer_par", { length: 36 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		produits_id_foreign: index("prixproduits_produits_id_foreign").on(table.produits_id),
		prixproduits_id: primaryKey({ columns: [table.id], name: "prixproduits_id"}),
	}
});

export const product_adjustments = mysqlTable("product_adjustments", {
	id: char("id", { length: 36 }).notNull(),
	quantity: int("quantity"),
	old_qte: int("old_qte"),
	ppv: decimal("ppv", { precision: 10, scale: 2 }),
	pph: decimal("pph", { precision: 10, scale: 2 }),
	taxe_rate: int("taxe_rate"),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	stock_id: char("stock_id", { length: 36 }).references(() => stock_adjustments.id),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_adjustments_id: primaryKey({ columns: [table.id], name: "product_adjustments_id"}),
	}
});

export const product_classifications = mysqlTable("product_classifications", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	name: varchar("name", { length: 255 }),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_classifications_id: primaryKey({ columns: [table.id], name: "product_classifications_id"}),
	}
});

export const product_codes = mysqlTable("product_codes", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	code: varchar("code", { length: 255 }),
	type: mysqlEnum("type", ['barcode','qr','id']).default('barcode').notNull(),
	referrer: varchar("referrer", { length: 255 }),
	referrer_type: mysqlEnum("referrer_type", ['direct partner','integration partner','lab','wholesaler','ANAM']),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_codes_id: primaryKey({ columns: [table.id], name: "product_codes_id"}),
	}
});

export const product_equivalents = mysqlTable("product_equivalents", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	laboratory_equivalent_id: char("laboratory_equivalent_id", { length: 36 }).notNull(),
	equivalent_id: char("equivalent_id", { length: 36 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_equivalents_id: primaryKey({ columns: [table.id], name: "product_equivalents_id"}),
	}
});

export const product_formes = mysqlTable("product_formes", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	forme_id: bigint("forme_id", { mode: "number", unsigned: true }).notNull().references(() => forms.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_formes_id: primaryKey({ columns: [table.id], name: "product_formes_id"}),
	}
});

export const product_imgs = mysqlTable("product_imgs", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	img_url: varchar("img_url", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_imgs_id: primaryKey({ columns: [table.id], name: "product_imgs_id"}),
	}
});

export const product_insurance_statuses = mysqlTable("product_insurance_statuses", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	reimbursable: tinyint("reimbursable").default(0).notNull(),
	rate: int("rate"),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_insurance_statuses_id: primaryKey({ columns: [table.id], name: "product_insurance_statuses_id"}),
	}
});

export const product_labs = mysqlTable("product_labs", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	lab_id: char("lab_id", { length: 36 }).references(() => companies.id),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_labs_id: primaryKey({ columns: [table.id], name: "product_labs_id"}),
	}
});

export const product_molecules = mysqlTable("product_molecules", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	molecule_id: char("molecule_id", { length: 36 }).notNull(),
	dosage: varchar("dosage", { length: 255 }),
	unit: varchar("unit", { length: 255 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_molecules_id: primaryKey({ columns: [table.id], name: "product_molecules_id"}),
	}
});

export const product_monographs = mysqlTable("product_monographs", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	monograph_url: varchar("monograph_url", { length: 255 }),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		product_monographs_id: primaryKey({ columns: [table.id], name: "product_monographs_id"}),
	}
});

export const product_partners = mysqlTable("product_partners", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }),
	bar_code: varchar("bar_code", { length: 255 }),
	form: varchar("form", { length: 255 }),
	code_product: varchar("code_product", { length: 255 }),
	tax_rate: int("tax_rate"),
	partner_id: char("partner_id", { length: 36 }).references(() => companies.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_partners_id: primaryKey({ columns: [table.id], name: "product_partners_id"}),
	}
});

export const product_pcategories = mysqlTable("product_pcategories", {
	id: char("id", { length: 36 }).notNull(),
	pcategory_id: char("pcategory_id", { length: 36 }).references(() => p_categories.id),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_pcategories_id: primaryKey({ columns: [table.id], name: "product_pcategories_id"}),
	}
});

export const product_posologies = mysqlTable("product_posologies", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	posology: tinyint("posology").default(0).notNull(),
	unit: tinyint("unit").default(0).notNull(),
	dependency: mysqlEnum("dependency", ['age','weight','condition']).default('age').notNull(),
	dependency_range: longtext("dependency_range"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		product_posologies_id: primaryKey({ columns: [table.id], name: "product_posologies_id"}),
	}
});

export const product_prices = mysqlTable("product_prices", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	price: decimal("price", { precision: 10, scale: 2 }),
	type: mysqlEnum("type", ['lab','wholesaler','pharmacy','hospital','ph_reimbursement','ppv_reimbursement']).default('lab').notNull(),
	tax_rate: int("tax_rate"),
	company_id: char("company_id", { length: 36 }),
	active: tinyint("active").default(1).notNull(),
	referrer: varchar("referrer", { length: 255 }),
	referrer_id: char("referrer_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_prices_id: primaryKey({ columns: [table.id], name: "product_prices_id"}),
	}
});

export const product_program = mysqlTable("product_program", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	program_id: char("program_id", { length: 36 }).notNull(),
	active: tinyint("active").default(1).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_program_id: primaryKey({ columns: [table.id], name: "product_program_id"}),
	}
});

export const product_status = mysqlTable("product_status", {
	id: char("id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull().references(() => products.id),
	country_id: char("country_id", { length: 36 }).notNull().references(() => countries.id),
	is_otc: tinyint("is_otc"),
	is_available: tinyint("is_available"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		product_status_id: primaryKey({ columns: [table.id], name: "product_status_id"}),
	}
});

export const product_suggestions = mysqlTable("product_suggestions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	status: tinyint("status").default(0).notNull(),
	description: text("description"),
	bar_code: text("bar_code"),
	indications: text("indications"),
	presentation: text("presentation"),
	ppha: double("ppha", { precision: 8, scale: 2 }),
	ppgro: double("ppgro", { precision: 8, scale: 2 }),
	ppv: double("ppv", { precision: 8, scale: 2 }),
	ppc: double("ppc", { precision: 8, scale: 2 }),
	tva: double("tva", { precision: 8, scale: 2 }),
	date_start: timestamp("date_start", { mode: 'string' }).defaultNow().notNull(),
	date_end: timestamp("date_end", { mode: 'string' }).defaultNow().notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	atc: varchar("atc", { length: 191 }),
	nfc: varchar("nfc", { length: 191 }),
	category: varchar("category", { length: 191 }),
	molecule: varchar("molecule", { length: 191 }),
	classe: varchar("classe", { length: 191 }),
	tableau: varchar("tableau", { length: 191 }),
	nature: varchar("nature", { length: 191 }),
	type: varchar("type", { length: 191 }),
	mode: varchar("mode", { length: 191 }),
	age: varchar("age", { length: 191 }),
	poids: varchar("poids", { length: 191 }),
	poid_unite: varchar("poid_unite", { length: 191 }),
	volume: varchar("volume", { length: 191 }),
	volume_unite: varchar("volume_unite", { length: 191 }),
	prct: varchar("prct", { length: 191 }),
	concentration_1: varchar("concentration_1", { length: 191 }),
	concentration_unite_1: varchar("concentration_unite_1", { length: 191 }),
	concentration_2: varchar("concentration_2", { length: 191 }),
	concentration_unite_2: varchar("concentration_unite_2", { length: 191 }),
	qte: varchar("qte", { length: 191 }),
	qte_unite: varchar("qte_unite", { length: 191 }),
	import: int("import"),
	external_id: varchar("external_id", { length: 191 }),
	import_content: varchar("import_content", { length: 191 }),
},
(table) => {
	return {
		product_suggestions_id: primaryKey({ columns: [table.id], name: "product_suggestions_id"}),
	}
});

export const products = mysqlTable("products", {
	id: char("id", { length: 36 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	name: varchar("name", { length: 255 }).notNull(),
	main_img: varchar("main_img", { length: 255 }),
	presentation: varchar("presentation", { length: 255 }),
	description: varchar("description", { length: 255 }),
	created_by: char("created_by", { length: 36 }),
	modified_by: char("modified_by", { length: 36 }),
	nfc_code: varchar("nfc_code", { length: 255 }),
	atc_code: varchar("atc_code", { length: 255 }),
	box_warnings_text: text("box_warnings_text"),
	box_warnings_url: varchar("box_warnings_url", { length: 255 }),
	is_generic: tinyint("is_generic"),
	active: tinyint("active"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	updated_by: char("updated_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	brand_name: text("brand_name"),
	check: tinyint("check").default(0),
	check_completed: tinyint("check_completed").default(0),
	source: text("source"),
	atc_code_5: varchar("atc_code_5", { length: 255 }),
	type: tinyint("type").default(0),
	therapeutic_class: text("therapeutic_class"),
	med_index: tinyint("med_index").default(1),
	mrr: varchar("mrr", { length: 255 }),
	rcp: varchar("rcp", { length: 255 }),
	patient_leaflet: varchar("patient_leaflet", { length: 255 }),
	insurance_classification_id: char("insurance_classification_id", { length: 36 }).references(() => insurance_classifications.id),
},
(table) => {
	return {
		products_id: primaryKey({ columns: [table.id], name: "products_id"}),
	}
});

export const produitcommandes = mysqlTable("produitcommandes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	quantite: int("quantite").notNull(),
	produits_id: char("produits_id", { length: 36 }).notNull(),
	montant_PU: varchar("montant_PU", { length: 255 }).notNull(),
	TVA: varchar("TVA", { length: 255 }).notNull(),
	remise: double("remise", { precision: 10, scale: 2 }).notNull(),
	PPV: varchar("PPV", { length: 255 }).notNull(),
	PPH: varchar("PPH", { length: 255 }).notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	commande_id: varchar("commande_id", { length: 21 }).notNull(),
	date_promption: datetime("date_promption", { mode: 'string'}),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	tax_rate: int("tax_rate").default(0),
},
(table) => {
	return {
		produitcommandes_id: primaryKey({ columns: [table.id], name: "produitcommandes_id"}),
	}
});

export const produits = mysqlTable("produits", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
	code_bare: varchar("code_bare", { length: 255 }),
	code_bare2: varchar("code_bare2", { length: 255 }),
	laboratoire: char("laboratoire", { length: 36 }),
	gamme: varchar("gamme", { length: 255 }),
	types_id: bigint("types_id", { mode: "number", unsigned: true }),
	classes_id: bigint("classes_id", { mode: "number", unsigned: true }),
	forms_id: bigint("forms_id", { mode: "number", unsigned: true }),
	dcis_id: bigint("dcis_id", { mode: "number", unsigned: true }),
	sous_gamme: varchar("sous_gamme", { length: 255 }),
	produit_tableau: varchar("produit_tableau", { length: 255 }),
	prescription: varchar("prescription", { length: 255 }),
	produit_marche: varchar("produit_marche", { length: 255 }),
	PPH: decimal("PPH", { precision: 9, scale: 2 }),
	PPV: decimal("PPV", { precision: 9, scale: 2 }).notNull(),
	TVA: varchar("TVA", { length: 255 }),
	TVA_vente: varchar("TVA_vente", { length: 255 }),
	remboursable: varchar("remboursable", { length: 255 }),
	présentation: varchar("présentation", { length: 255 }),
	excipient: varchar("excipient", { length: 255 }),
	posologie_adult: varchar("posologie_adult", { length: 255 }),
	posologie_enfant: varchar("posologie_enfant", { length: 255 }),
	indications: varchar("indications", { length: 255 }),
	contre_indication_conduit: varchar("contre_indication_conduit", { length: 255 }),
	contre_indication_monograph: varchar("contre_indication_monograph", { length: 255 }),
	contre_indication_grossesse: varchar("contre_indication_grossesse", { length: 255 }),
	reference_labo_produit: varchar("reference_labo_produit", { length: 255 }),
	description: varchar("description", { length: 255 }),
	conditionnement: varchar("conditionnement", { length: 255 }),
	monograph: varchar("monograph", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	active: int("active").default(1),
	PPV_prix: decimal("PPV_prix", { precision: 9, scale: 2 }).notNull(),
	PPH_prix: decimal("PPH_prix", { precision: 9, scale: 2 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_peremption: date("date_peremption", { mode: 'string' }),
	quantite: int("quantite").default(0),
	creer_par: char("creer_par", { length: 36 }),
	quantite_disponible: int("quantite_disponible"),
	zone: int("zone").default(1),
	inventaires_id: int("inventaires_id").notNull(),
	modifier_par: char("modifier_par", { length: 36 }),
	nomberAction: int("nomberAction").default(0),
	stok_min: int("stok_min"),
	stok_max: int("stok_max"),
	nature_id: int("nature_id"),
	atc_id: int("atc_id"),
	mode_id: int("mode_id"),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		types_id_foreign: index("produits_types_id_foreign").on(table.types_id),
		classes_id_foreign: index("produits_classes_id_foreign").on(table.classes_id),
		forms_id_foreign: index("produits_forms_id_foreign").on(table.forms_id),
		dcis_id_foreign: index("produits_dcis_id_foreign").on(table.dcis_id),
		name: index("name").on(table.name),
		code_bare: index("code_bare").on(table.code_bare),
		produits_id: primaryKey({ columns: [table.id], name: "produits_id"}),
	}
});

export const produitsbonlivraisons = mysqlTable("produitsbonlivraisons", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	quantite: int("quantite").notNull(),
	produits_id: char("produits_id", { length: 36 }).notNull(),
	montant_PU: decimal("montant_PU", { precision: 10, scale: 2 }).notNull(),
	TVA: varchar("TVA", { length: 255 }),
	tax_rate: int("tax_rate").default(0).notNull(),
	remise: double("remise", { precision: 10, scale: 2 }).notNull(),
	PPV: decimal("PPV", { precision: 10, scale: 2 }).default('0.00'),
	PPH: decimal("PPH", { precision: 10, scale: 2 }).default('0.00'),
	ecart_qte: varchar("ecart_qte", { length: 255 }).notNull(),
	ecart_prix: varchar("ecart_prix", { length: 255 }).notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	bonlivraison_id: varchar("bonlivraison_id", { length: 12 }),
	creer_par: char("creer_par", { length: 36 }),
	type_remise: int("type_remise").notNull(),
	data_peromption: datetime("data_peromption", { mode: 'string'}),
	qte_update: int("qte_update").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		produitsbonlivraisons_id: primaryKey({ columns: [table.id], name: "produitsbonlivraisons_id"}),
	}
});

export const produitssortieconfreres = mysqlTable("produitssortieconfreres", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	sortie_confreres_id: varchar("sortie_confreres_id", { length: 255 }).notNull(),
	qte: int("qte"),
	prix_AU: varchar("prix_AU", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	produits_id: char("produits_id", { length: 36 }),
	type: int("type").default(0),
	pph: decimal("pph", { precision: 10, scale: 2 }),
	tax_rate: int("tax_rate").default(0),
	remise: double("remise", { precision: 10, scale: 2 }).notNull(),
	type_remise: int("type_remise").notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		produitssortieconfreres_id: primaryKey({ columns: [table.id], name: "produitssortieconfreres_id"}),
	}
});

export const program_levels = mysqlTable("program_levels", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	program_id: int("program_id").notNull(),
	level_id: int("level_id").notNull(),
	description: text("description"),
	min_amount: double("min_amount", { precision: 8, scale: 2 }),
	points: int("points").notNull(),
	discount: double("discount", { precision: 8, scale: 2 }).notNull(),
	is_premium: tinyint("is_premium").notNull(),
	duration: int("duration").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	name: varchar("name", { length: 191 }),
},
(table) => {
	return {
		program_levels_id: primaryKey({ columns: [table.id], name: "program_levels_id"}),
	}
});

export const program_tiers = mysqlTable("program_tiers", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }),
	program_id: char("program_id", { length: 36 }).notNull().references(() => loyalty_programs.id, { onDelete: "cascade" } ),
	order: int("order"),
	yearly_min: decimal("yearly_min", { precision: 20, scale: 2 }),
	quarterly_min: decimal("quarterly_min", { precision: 20, scale: 2 }),
	discount_rate: double("discount_rate", { precision: 10, scale: 2 }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	is_default: tinyint("is_default").default(0),
},
(table) => {
	return {
		program_tiers_id: primaryKey({ columns: [table.id], name: "program_tiers_id"}),
	}
});

export const programme = mysqlTable("programme", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	description: text("description"),
	titre: varchar("titre", { length: 250 }),
	slug: varchar("slug", { length: 250 }),
	heure_debut: varchar("heure_debut", { length: 200 }),
	heure_fin: varchar("heure_fin", { length: 200 }),
	agenda_id: int("agenda_id"),
	media: varchar("media", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	is_break: tinyint("is_break").default(0).notNull(),
},
(table) => {
	return {
		programme_id: primaryKey({ columns: [table.id], name: "programme_id"}),
	}
});

export const programs = mysqlTable("programs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	conditions: text("conditions"),
	date_start: timestamp("date_start", { mode: 'string' }).defaultNow().notNull(),
	date_end: timestamp("date_end", { mode: 'string' }).defaultNow().notNull(),
	status: tinyint("status").default(0).notNull(),
	point_price: double("point_price", { precision: 8, scale: 2 }).notNull(),
	point_value: double("point_value", { precision: 8, scale: 2 }).default(0.1).notNull(),
	user_point_value: double("user_point_value", { precision: 8, scale: 2 }).notNull(),
	threshold: double("threshold", { precision: 8, scale: 2 }).notNull(),
	seller_prct: double("seller_prct", { precision: 8, scale: 2 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		programs_id: primaryKey({ columns: [table.id], name: "programs_id"}),
	}
});

export const promotions = mysqlTable("promotions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	program_id: int("program_id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	date_start: timestamp("date_start", { mode: 'string' }).defaultNow().notNull(),
	date_end: timestamp("date_end", { mode: 'string' }).defaultNow().notNull(),
	status: int("status").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		promotions_id: primaryKey({ columns: [table.id], name: "promotions_id"}),
	}
});

export const pub_clients = mysqlTable("pub_clients", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	company_name: varchar("company_name", { length: 191 }).notNull(),
	contact: varchar("contact", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	mobile: varchar("mobile", { length: 191 }),
	faxe: varchar("faxe", { length: 191 }),
	address: text("address"),
	tp: varchar("tp", { length: 191 }),
	ice: varchar("ice", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pub_clients_id: primaryKey({ columns: [table.id], name: "pub_clients_id"}),
	}
});

export const pub_pages = mysqlTable("pub_pages", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pub_pages_id: primaryKey({ columns: [table.id], name: "pub_pages_id"}),
	}
});

export const pub_zones = mysqlTable("pub_zones", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	size: varchar("size", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	refresh_time: int("refresh_time").default(300).notNull(),
	position: varchar("position", { length: 191 }).notNull(),
},
(table) => {
	return {
		pub_zones_id: primaryKey({ columns: [table.id], name: "pub_zones_id"}),
	}
});

export const pubs = mysqlTable("pubs", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	pub_clients_id: int("pub_clients_id").notNull(),
	pub_zones_id: int("pub_zones_id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	image: varchar("image", { length: 191 }).notNull(),
	date_start: datetime("date_start", { mode: 'string'}).notNull(),
	date_end: datetime("date_end", { mode: 'string'}).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	lien_externe: text("lien_externe"),
	pub_pages_id: int("pub_pages_id").notNull(),
	position: int("position").default(1).notNull(),
	show_time: int("show_time").default(300).notNull(),
	internal_links_id: int("internal_links_id"),
	element: varchar("element", { length: 191 }),
	extra_params: text("extra_params"),
	pubs_generator_id: int("pubs_generator_id"),
	type: varchar("type", { length: 191 }),
},
(table) => {
	return {
		pubs_id: primaryKey({ columns: [table.id], name: "pubs_id"}),
	}
});

export const pubs_destinations = mysqlTable("pubs_destinations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	destinations_id: int("destinations_id").notNull(),
	pubs_id: int("pubs_id").notNull(),
},
(table) => {
	return {
		pubs_destinations_id: primaryKey({ columns: [table.id], name: "pubs_destinations_id"}),
	}
});

export const pubs_generator = mysqlTable("pubs_generator", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	image: varchar("image", { length: 191 }).notNull(),
	date_start: datetime("date_start", { mode: 'string'}).notNull(),
	date_end: datetime("date_end", { mode: 'string'}).notNull(),
	lien_externe: text("lien_externe"),
	position: int("position").default(1).notNull(),
	show_time: int("show_time").default(300).notNull(),
	internal_links_id: int("internal_links_id"),
	pub_clients_id: int("pub_clients_id"),
	element: varchar("element", { length: 191 }),
	extra_params: text("extra_params"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	type: varchar("type", { length: 191 }),
},
(table) => {
	return {
		pubs_generator_id: primaryKey({ columns: [table.id], name: "pubs_generator_id"}),
	}
});

export const qr_code = mysqlTable("qr_code", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	image: varchar("image", { length: 191 }),
	animation_id: varchar("animation_id", { length: 191 }),
	qty: int("qty"),
	rest: int("rest"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		qr_code_id: primaryKey({ columns: [table.id], name: "qr_code_id"}),
	}
});

export const qr_code_groups = mysqlTable("qr_code_groups", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	prefix: varchar("prefix", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	from: varchar("from", { length: 191 }),
	to: varchar("to", { length: 191 }),
	is_generated: tinyint("is_generated").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		qr_code_groups_id: primaryKey({ columns: [table.id], name: "qr_code_groups_id"}),
	}
});

export const qr_code_tokens = mysqlTable("qr_code_tokens", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	qrcode: text("qrcode").notNull(),
	token: text("token"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		qr_code_tokens_id: primaryKey({ columns: [table.id], name: "qr_code_tokens_id"}),
	}
});

export const qr_codes = mysqlTable("qr_codes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	qr_code_group_id: int("qr_code_group_id").notNull(),
	scan_product_id: int("scan_product_id"),
	code: varchar("code", { length: 191 }),
	reference: varchar("reference", { length: 191 }),
	is_scanned: int("is_scanned").default(0).notNull(),
	user_id: char("user_id", { length: 36 }),
	date_scan: timestamp("date_scan", { mode: 'string' }).defaultNow().notNull(),
	claim: int("claim").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		qr_codes_id: primaryKey({ columns: [table.id], name: "qr_codes_id"}),
	}
});

export const qualifications = mysqlTable("qualifications", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		qualifications_id: primaryKey({ columns: [table.id], name: "qualifications_id"}),
	}
});

export const question = mysqlTable("question", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: text("title").notNull(),
	question_type: varchar("question_type", { length: 191 }).notNull(),
	media: varchar("media", { length: 191 }),
	is_obligatory: tinyint("is_obligatory"),
	questionnaire_id: int("questionnaire_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		question_id: primaryKey({ columns: [table.id], name: "question_id"}),
	}
});

export const question_anwser = mysqlTable("question_anwser", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	parent_id: int("parent_id"),
	question_response_id: int("question_response_id"),
	option_id: int("option_id"),
	sub_option_id: int("sub_option_id"),
	question_id: int("question_id"),
	value: varchar("value", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		question_anwser_id: primaryKey({ columns: [table.id], name: "question_anwser_id"}),
	}
});

export const question_options = mysqlTable("question_options", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: varchar("title", { length: 191 }),
	is_the_right_answer: tinyint("is_the_right_answer"),
	position: int("position"),
	parent_id: int("parent_id"),
	question_id: int("question_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		question_options_id: primaryKey({ columns: [table.id], name: "question_options_id"}),
	}
});

export const question_response = mysqlTable("question_response", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	questionnaire: int("questionnaire"),
	user_id: char("user_id", { length: 36 }),
	has_succeeded: tinyint("has_succeeded").notNull(),
	resultat: varchar("resultat", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		question_response_id: primaryKey({ columns: [table.id], name: "question_response_id"}),
	}
});

export const question_types = mysqlTable("question_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		question_types_id: primaryKey({ columns: [table.id], name: "question_types_id"}),
	}
});

export const questionnaire = mysqlTable("questionnaire", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	title: text("title").notNull(),
	type: varchar("type", { length: 191 }).notNull(),
	nbr_reponse_juste: int("nbr_reponse_juste"),
	description: text("description").notNull(),
	description_fermeture: text("description_fermeture").notNull(),
	user_role: int("user_role"),
	has_image: tinyint("has_image"),
	media: varchar("media", { length: 191 }),
	user_id: char("user_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	date_publication: datetime("date_publication", { mode: 'string'}).notNull(),
},
(table) => {
	return {
		questionnaire_id: primaryKey({ columns: [table.id], name: "questionnaire_id"}),
	}
});

export const questionnaire_destinations = mysqlTable("questionnaire_destinations", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	destinations_id: int("destinations_id").notNull(),
	questionnaire_id: int("questionnaire_id").notNull(),
},
(table) => {
	return {
		questionnaire_destinations_id: primaryKey({ columns: [table.id], name: "questionnaire_destinations_id"}),
	}
});

export const questionnaire_types = mysqlTable("questionnaire_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		questionnaire_types_id: primaryKey({ columns: [table.id], name: "questionnaire_types_id"}),
	}
});

export const questionnaires = mysqlTable("questionnaires", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }).notNull(),
	questionnaire_type_id: int("questionnaire_type_id").notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description"),
	title_success: varchar("title_success", { length: 191 }),
	description_success: text("description_success"),
	title_failure: varchar("title_failure", { length: 191 }),
	description_failure: text("description_failure"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	min_points: int("min_points").default(0).notNull(),
},
(table) => {
	return {
		questionnaires_id: primaryKey({ columns: [table.id], name: "questionnaires_id"}),
	}
});

export const questions = mysqlTable("questions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	questionnaire_id: int("questionnaire_id").notNull(),
	question_type_id: int("question_type_id").notNull(),
	name: text("name").notNull(),
	description: text("description"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		questions_id: primaryKey({ columns: [table.id], name: "questions_id"}),
	}
});

export const rating_schedule = mysqlTable("rating_schedule", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	comment: text("comment"),
	rate: varchar("rate", { length: 191 }),
	cms_user_id: char("cms_user_id", { length: 36 }),
	programme_id: int("programme_id"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		rating_schedule_id: primaryKey({ columns: [table.id], name: "rating_schedule_id"}),
	}
});

export const reclamation_statuses = mysqlTable("reclamation_statuses", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		reclamation_statuses_id: primaryKey({ columns: [table.id], name: "reclamation_statuses_id"}),
	}
});

export const reclamations = mysqlTable("reclamations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	order_id: int("order_id").notNull(),
	store_program_id: int("store_program_id").notNull(),
	reclamation_status_id: int("reclamation_status_id").notNull(),
	amount: decimal("amount", { precision: 18, scale: 5 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		reclamations_id: primaryKey({ columns: [table.id], name: "reclamations_id"}),
	}
});

export const reduction_types = mysqlTable("reduction_types", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		reduction_types_id: primaryKey({ columns: [table.id], name: "reduction_types_id"}),
	}
});

export const reductions = mysqlTable("reductions", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	offers_id: int("offers_id").notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }).notNull(),
	date_start: datetime("date_start", { mode: 'string'}).notNull(),
	date_end: datetime("date_end", { mode: 'string'}).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		reductions_id: primaryKey({ columns: [table.id], name: "reductions_id"}),
	}
});

export const regions = mysqlTable("regions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		regions_id: primaryKey({ columns: [table.id], name: "regions_id"}),
	}
});

export const regularisationsoldeconfreres = mysqlTable("regularisationsoldeconfreres", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	confreres_id: int("confreres_id").notNull(),
	montant_credit: int("montant_credit"),
	montant_paye: int("montant_paye"),
	mode_paiment: int("mode_paiment"),
	commentaire: int("commentaire"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		regularisationsoldeconfreres_id: primaryKey({ columns: [table.id], name: "regularisationsoldeconfreres_id"}),
	}
});

export const regularisationsoldes = mysqlTable("regularisationsoldes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	clients_id: int("clients_id").notNull(),
	montant_credit: decimal("montant_credit", { precision: 10, scale: 2 }),
	montant_paye: decimal("montant_paye", { precision: 10, scale: 2 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	commentaire: varchar("commentaire", { length: 222 }),
	mode_paiement: int("mode_paiement").notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	methode: varchar("methode", { length: 200 }).default('montant').notNull(),
	vente_id: int("vente_id"),
	creer_par: char("creer_par", { length: 36 }),
	paiement_crédit: tinyint("paiement_crédit").notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	caisse_id: bigint("caisse_id", { mode: "number", unsigned: true }),
},
(table) => {
	return {
		caisse_id_foreign: index("regularisationsoldes_caisse_id_foreign").on(table.caisse_id),
		regularisationsoldes_id: primaryKey({ columns: [table.id], name: "regularisationsoldes_id"}),
	}
});

export const remise_client = mysqlTable("remise_client", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	type_id: bigint("type_id", { mode: "number", unsigned: true }).notNull(),
	client_id: bigint("client_id", { mode: "number", unsigned: true }).notNull(),
	type_remise: tinyint("type_remise").notNull(),
	value_remise: float("value_remise").notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		FK_remise_type: index("FK_remise_type").on(table.type_id),
		FK_remise_client: index("FK_remise_client").on(table.client_id),
		remise_client_id: primaryKey({ columns: [table.id], name: "remise_client_id"}),
	}
});

export const remises = mysqlTable("remises", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom_Remise: varchar("Nom_Remise", { length: 255 }).notNull(),
	Valeur: varchar("Valeur", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		remises_id: primaryKey({ columns: [table.id], name: "remises_id"}),
	}
});

export const reproductive_healths = mysqlTable("reproductive_healths", {
	id: char("id", { length: 36 }).notNull(),
	months: int("months"),
	value: varchar("value", { length: 191 }),
	order: int("order"),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		reproductive_healths_id: primaryKey({ columns: [table.id], name: "reproductive_healths_id"}),
	}
});

export const request_apikeys = mysqlTable("request_apikeys", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	company_id: char("company_id", { length: 36 }),
	ip: varchar("ip", { length: 255 }),
	route: varchar("route", { length: 255 }),
	requested_at: timestamp("requested_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		request_apikeys_my_row_id: primaryKey({ columns: [table.my_row_id], name: "request_apikeys_my_row_id"}),
	}
});

export const retoursurventeproduits = mysqlTable("retoursurventeproduits", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	retoursurventes_id: varchar("retoursurventes_id", { length: 255 }),
	produits_id: char("produits_id", { length: 36 }),
	remboursement: varchar("remboursement", { length: 255 }),
	taux_remboursement: varchar("taux_remboursement", { length: 255 }),
	type_remise: varchar("type_remise", { length: 255 }),
	remise: double("remise", { precision: 10, scale: 2 }),
	qte: int("qte"),
	prix_AU: varchar("prix_AU", { length: 255 }),
	tax_rate: int("tax_rate").default(0),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		retoursurventeproduits_id: primaryKey({ columns: [table.id], name: "retoursurventeproduits_id"}),
	}
});

export const retoursurventes = mysqlTable("retoursurventes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	quantite: int("quantite"),
	client_id: varchar("client_id", { length: 255 }),
	creer_par: char("creer_par", { length: 36 }),
	mode_payment: varchar("mode_payment", { length: 255 }),
	montant_restitue: varchar("montant_restitue", { length: 255 }),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	vente_id: bigint("vente_id", { mode: "number" }),
	reference: varchar("reference", { length: 45 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	caisse_id: bigint("caisse_id", { mode: "number", unsigned: true }),
	type_remise: int("type_remise").default(-1),
	remise: double("remise", { precision: 8, scale: 2 }),
},
(table) => {
	return {
		caisse_id_foreign: index("retoursurventes_caisse_id_foreign").on(table.caisse_id),
		retoursurventes_id: primaryKey({ columns: [table.id], name: "retoursurventes_id"}),
	}
});

export const role_permissions = mysqlTable("role_permissions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	role_id: int("role_id").notNull(),
	permission_id: int("permission_id").notNull(),
	is_default: tinyint("is_default").default(1).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		role_permissions_id: primaryKey({ columns: [table.id], name: "role_permissions_id"}),
	}
});

export const roles = mysqlTable("roles", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	produitA: int("produitA"),
	produitM: int("produitM"),
	produitS: int("produitS"),
	venteA: int("venteA"),
	venteM: int("venteM"),
	venteS: int("venteS"),
	achatA: int("achatA"),
	achatM: int("achatM"),
	achatS: int("achatS"),
	parametreA: int("parametreA"),
	parametreM: int("parametreM"),
	parametreS: int("parametreS"),
	confrereA: int("confrereA"),
	confrereM: int("confrereM"),
	confrereS: int("confrereS"),
	fournisseurA: int("fournisseurA"),
	fournisseurM: int("fournisseurM"),
	fournisseurS: int("fournisseurS"),
	importationA: int("importationA"),
	importationM: int("importationM"),
	importationS: int("importationS"),
	caisseA: int("caisseA"),
	caisseM: int("caisseM"),
	caisseS: int("caisseS"),
	stockA: int("stockA"),
	stockM: int("stockM"),
	stockS: int("stockS"),
	organismeA: int("organismeA"),
	organismeM: int("organismeM"),
	organismeS: int("organismeS"),
	sconfrereA: int("sconfrereA"),
	sconfrereM: int("sconfrereM"),
	sconfrereS: int("sconfrereS"),
	econfrereA: int("econfrereA"),
	econfrereM: int("econfrereM"),
	econfrereS: int("econfrereS"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	nom: varchar("nom", { length: 222 }),
	clientA: int("clientA"),
	clientM: int("clientM"),
	clientS: int("clientS"),
	clientR: int("clientR"),
	arret_caisse: int("arret_caisse"),
	rapport_journee: int("rapport_journee"),
	journal_produit: int("journal_produit"),
	rapport_caisse: int("rapport_caisse"),
	exporte_stoxk: int("exporte_stoxk"),
	exporte_achat: int("exporte_achat"),
	exporte_vente: int("exporte_vente"),
	exporte_client: int("exporte_client"),
	chiffre_tva: int("chiffre_tva"),
	chiffre_cat: int("chiffre_cat"),
	rapport_stock: int("rapport_stock"),
	rapport_sur_tva: int("rapport_sur_tva"),
	rapport_sur_cat: int("rapport_sur_cat"),
	rapport_sur_lab: int("rapport_sur_lab"),
	rapport_sur_cat_tva: int("rapport_sur_cat_tva"),
	rapport_sur_dci: int("rapport_sur_dci"),
	rapport_sur_calsse: int("rapport_sur_calsse"),
	rapport_sur_forme: int("rapport_sur_forme"),
	rapport_sur_zero: int("rapport_sur_zero"),
	rapport_sur_vente: int("rapport_sur_vente"),
	rapport_sur_ventejour: int("rapport_sur_ventejour"),
	rapport_sur_vente_cat: int("rapport_sur_vente_cat"),
	rapport_sur_vente_lab: int("rapport_sur_vente_lab"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
},
(table) => {
	return {
		roles_id: primaryKey({ columns: [table.id], name: "roles_id"}),
	}
});

export const rolesactions = mysqlTable("rolesactions", {
	ID: int("ID").autoincrement().notNull(),
	Action: varchar("Action", { length: 255 }).notNull(),
	Description: varchar("Description", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	id_pages: int("id_pages"),
	column_oreder: int("column_oreder").default(1).notNull(),
},
(table) => {
	return {
		FK_listeroleslistepages: index("FK_listeroleslistepages").on(table.id_pages),
		rolesactions_ID: primaryKey({ columns: [table.ID], name: "rolesactions_ID"}),
	}
});

export const rubric_child_products = mysqlTable("rubric_child_products", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	treatment_id: int("treatment_id").notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		rubric_child_products_id: primaryKey({ columns: [table.id], name: "rubric_child_products_id"}),
	}
});

export const rubric_children = mysqlTable("rubric_children", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	countercase_rubric_id: int("countercase_rubric_id").notNull(),
	name: text("name").notNull(),
	icone: text("icone"),
	image: text("image"),
	description: text("description"),
	stat: varchar("stat", { length: 191 }).default("1").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		rubric_children_id: primaryKey({ columns: [table.id], name: "rubric_children_id"}),
	}
});

export const rubrics = mysqlTable("rubrics", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	is_treatment: tinyint("is_treatment").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		rubrics_id: primaryKey({ columns: [table.id], name: "rubrics_id"}),
	}
});

export const scan_products = mysqlTable("scan_products", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	promotion_id: int("promotion_id").notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	quantity: int("quantity").default(0).notNull(),
	points_user: int("points_user").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	points_store: int("points_store").default(0).notNull(),
},
(table) => {
	return {
		scan_products_id: primaryKey({ columns: [table.id], name: "scan_products_id"}),
	}
});

export const scanned_products = mysqlTable("scanned_products", {
	id: char("id", { length: 36 }).notNull(),
	scan_id: char("scan_id", { length: 36 }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	name: text("name").notNull(),
	code: bigint("code", { mode: "number" }),
	quantity: int("quantity").notNull(),
	pharmacy_price: double("pharmacy_price", { precision: 8, scale: 2 }).notNull(),
	wholesaler_price: double("wholesaler_price", { precision: 8, scale: 2 }).notNull(),
	expiry_date: timestamp("expiry_date", { mode: 'string' }),
	tax: double("tax"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	order: int("order"),
	exist_in_sobrus: tinyint("exist_in_sobrus"),
},
(table) => {
	return {
		scanned_products_id: primaryKey({ columns: [table.id], name: "scanned_products_id"}),
	}
});

export const scanned_wholesaler = mysqlTable("scanned_wholesaler", {
	id: char("id", { length: 36 }).notNull(),
	wholesaler_id: char("wholesaler_id", { length: 36 }),
	name: text("name"),
	tax_code: text("tax_code"),
	if: text("if"),
	rc: text("rc"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	source: mysqlEnum("source", ['user','sentence_similarity']).default('user'),
},
(table) => {
	return {
		scanned_wholesaler_id: primaryKey({ columns: [table.id], name: "scanned_wholesaler_id"}),
	}
});

export const secteurs = mysqlTable("secteurs", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	regions_id: int("regions_id").notNull(),
	cities_id: char("cities_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		secteurs_id: primaryKey({ columns: [table.id], name: "secteurs_id"}),
	}
});

export const sectors = mysqlTable("sectors", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	city_id: char("city_id", { length: 36 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		sectors_id: primaryKey({ columns: [table.id], name: "sectors_id"}),
	}
});

export const sell_products = mysqlTable("sell_products", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	promotion_id: int("promotion_id").notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	points_user: int("points_user").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	points_store: int("points_store").default(0).notNull(),
},
(table) => {
	return {
		sell_products_id: primaryKey({ columns: [table.id], name: "sell_products_id"}),
	}
});

export const sequence = mysqlTable("sequence", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Facteur_de_vente: varchar("Facteur_de_vente", { length: 255 }).notNull(),
	Retour_sur_vente: varchar("Retour_sur_vente", { length: 255 }).notNull(),
	Bon_de_livraison: varchar("Bon_de_livraison", { length: 255 }).notNull(),
	Fournisseur_recu: varchar("Fournisseur_recu", { length: 255 }).notNull(),
	Inventaire_stock: varchar("Inventaire_stock", { length: 255 }).notNull(),
	Facture_gobal: varchar("Facture_gobal", { length: 255 }).notNull(),
	sequence_devis: varchar("sequence_devis", { length: 255 }).notNull(),
	Bon_de_commande: varchar("Bon_de_commande", { length: 255 }).notNull(),
	Fournisseur_emis: varchar("Fournisseur_emis", { length: 255 }).notNull(),
	Adjustement_de_stock: varchar("Adjustement_de_stock", { length: 255 }).notNull(),
	N_order: varchar("N_order", { length: 255 }).notNull(),
	preparation: varchar("preparation", { length: 255 }).notNull(),
	Cree_par: char("Cree_par", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		sequence_id: primaryKey({ columns: [table.id], name: "sequence_id"}),
	}
});

export const sequences = mysqlTable("sequences", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Facteur_de_vente: varchar("Facteur_de_vente", { length: 255 }).notNull(),
	Retour_sur_vente: varchar("Retour_sur_vente", { length: 255 }).notNull(),
	Bon_de_livraison: varchar("Bon_de_livraison", { length: 255 }).notNull(),
	Fournisseur_recu: varchar("Fournisseur_recu", { length: 255 }).notNull(),
	Inventaire_stock: varchar("Inventaire_stock", { length: 255 }).notNull(),
	Facture_gobal: varchar("Facture_gobal", { length: 255 }).notNull(),
	sequence_devis: varchar("sequence_devis", { length: 255 }).notNull(),
	Bon_de_commande: varchar("Bon_de_commande", { length: 255 }).notNull(),
	Fournisseur_emis: varchar("Fournisseur_emis", { length: 255 }).notNull(),
	Adjustement_de_stock: varchar("Adjustement_de_stock", { length: 255 }).notNull(),
	N_order: varchar("N_order", { length: 255 }).notNull(),
	preparation: varchar("preparation", { length: 255 }).notNull(),
	creer_par: char("creer_par", { length: 36 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		sequences_id: primaryKey({ columns: [table.id], name: "sequences_id"}),
	}
});

export const services = mysqlTable("services", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		services_id: primaryKey({ columns: [table.id], name: "services_id"}),
	}
});

export const sessions = mysqlTable("sessions", {
	id: varchar("id", { length: 255 }).notNull(),
	user_id: char("user_id", { length: 36 }),
	ip_address: varchar("ip_address", { length: 45 }),
	user_agent: text("user_agent"),
	payload: text("payload").notNull(),
	last_activity: int("last_activity").notNull(),
},
(table) => {
	return {
		user_id_idx: index("user_id_idx").on(table.user_id),
		last_activity_idx: index("last_activity_idx").on(table.last_activity),
		sessions_id: primaryKey({ columns: [table.id], name: "sessions_id"}),
	}
});

export const setting = mysqlTable("setting", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }),
	description: text("description"),
	reference: varchar("reference", { length: 255 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		setting_id: primaryKey({ columns: [table.id], name: "setting_id"}),
	}
});

export const setting_pharmacies = mysqlTable("setting_pharmacies", {
	id: char("id", { length: 36 }).notNull(),
	setting_id: char("setting_id", { length: 36 }).references(() => setting.id),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	user_id: char("user_id", { length: 36 }).references(() => users.id),
	status: tinyint("status").default(1).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		setting_pharmacies_id: primaryKey({ columns: [table.id], name: "setting_pharmacies_id"}),
	}
});

export const shortcuts = mysqlTable("shortcuts", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	service_id: int("service_id").notNull(),
	description: text("description"),
	image: text("image"),
	link: varchar("link", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		shortcuts_id: primaryKey({ columns: [table.id], name: "shortcuts_id"}),
	}
});

export const slides = mysqlTable("slides", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	service_id: int("service_id").notNull(),
	title: varchar("title", { length: 191 }),
	sub_title: varchar("sub_title", { length: 191 }),
	description: text("description"),
	image: text("image"),
	link: text("link"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		slides_id: primaryKey({ columns: [table.id], name: "slides_id"}),
	}
});

export const sms = mysqlTable("sms", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	phone: varchar("phone", { length: 191 }).notNull(),
	code: int("code").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		sms_id: primaryKey({ columns: [table.id], name: "sms_id"}),
	}
});

export const sms_sendings = mysqlTable("sms_sendings", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	phone_number: varchar("phone_number", { length: 191 }).notNull(),
	notification_id: int("notification_id"),
	notification_type: varchar("notification_type", { length: 191 }),
	content: text("content"),
	link: text("link"),
	errors: text("errors"),
	sending_date: timestamp("sending_date", { mode: 'string' }),
	sending_stat: int("sending_stat").default(0).notNull(),
	reading_date: timestamp("reading_date", { mode: 'string' }),
	reading_stat: int("reading_stat").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		sms_sendings_id: primaryKey({ columns: [table.id], name: "sms_sendings_id"}),
	}
});

export const sortieconfreres = mysqlTable("sortieconfreres", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	confreres_id: varchar("confreres_id", { length: 255 }).notNull(),
	methode_echange: varchar("methode_echange", { length: 255 }),
	total: varchar("total", { length: 255 }),
	mode_paiment: int("mode_paiment").default(1).notNull(),
	status: varchar("status", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }),
	type: varchar("type", { length: 222 }),
	etat: varchar("etat", { length: 12 }),
	credit: double("credit", { precision: 10, scale: 2 }),
	montant_payé: double("montant_payé", { precision: 10, scale: 2 }).notNull(),
	etat_paiement: int("etat_paiement").notNull(),
	state: int("state").default(1),
	reference: varchar("reference", { length: 300 }),
	archive: tinyint("archive").default(0).notNull(),
	date_archivage: timestamp("date_archivage", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	effective_date: timestamp("effective_date", { mode: 'string' }).defaultNow(),
},
(table) => {
	return {
		sortieconfreres_id: primaryKey({ columns: [table.id], name: "sortieconfreres_id"}),
	}
});

export const sousgammes = mysqlTable("sousgammes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	creer_par: char("creer_par", { length: 36 }),
	nom: varchar("nom", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		sousgammes_id: primaryKey({ columns: [table.id], name: "sousgammes_id"}),
	}
});

export const stock_adjustments = mysqlTable("stock_adjustments", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }),
	state: mysqlEnum("state", ['draft','completed','cancel']).default('completed').notNull(),
	date: datetime("date", { mode: 'string'}),
	user_id: char("user_id", { length: 36 }).references(() => users.id),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		stock_adjustments_id: primaryKey({ columns: [table.id], name: "stock_adjustments_id"}),
	}
});

export const stock_details = mysqlTable("stock_details", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	source: varchar("source", { length: 255 }).notNull(),
	quantite: int("quantite").notNull(),
	quantite_update: int("quantite_update").notNull(),
	produits_id: char("produits_id", { length: 36 }).notNull(),
	PPV: varchar("PPV", { length: 255 }).notNull(),
	PPH: varchar("PPH", { length: 255 }).notNull(),
	type: int("type").notNull(),
	date_promption: timestamp("date_promption", { mode: 'string' }),
	regler_stock: int("regler_stock").notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	id_operation: bigint("id_operation", { mode: "number" }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		stock_details_id: primaryKey({ columns: [table.id], name: "stock_details_id"}),
	}
});

export const stock_pharmacies = mysqlTable("stock_pharmacies", {
	id: char("id", { length: 36 }).notNull(),
	quantity: int("quantity"),
	date: datetime("date", { mode: 'string'}),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	pharmacy_id: char("pharmacy_id", { length: 36 }).references(() => companies.id),
	user_id: char("user_id", { length: 36 }).references(() => users.id),
	price_pharmacy: char("price_pharmacy", { length: 36 }).references(() => product_prices.id),
	price_wholesaler: char("price_wholesaler", { length: 36 }).references(() => product_prices.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		stock_pharmacies_id: primaryKey({ columns: [table.id], name: "stock_pharmacies_id"}),
	}
});

export const store_action_types = mysqlTable("store_action_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }),
	reference: varchar("reference", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		store_action_types_id: primaryKey({ columns: [table.id], name: "store_action_types_id"}),
	}
});

export const store_points = mysqlTable("store_points", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	store_program_id: int("store_program_id").notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	delivery_id: int("delivery_id").notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	date_expiration: timestamp("date_expiration", { mode: 'string' }).defaultNow().notNull(),
	points: double("points", { precision: 8, scale: 2 }),
	rest: double("rest", { precision: 8, scale: 2 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		store_points_id: primaryKey({ columns: [table.id], name: "store_points_id"}),
	}
});

export const store_program_history = mysqlTable("store_program_history", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	store_program_id: int("store_program_id").notNull(),
	level_id: int("level_id").notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	store_action_type_id: varchar("store_action_type_id", { length: 191 }),
	points: int("points"),
	level_points: int("level_points"),
	wallet: double("wallet", { precision: 8, scale: 2 }).notNull(),
	entity_id: int("entity_id"),
	level_after_id: int("level_after_id"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		store_program_history_id: primaryKey({ columns: [table.id], name: "store_program_history_id"}),
	}
});

export const store_program_operations = mysqlTable("store_program_operations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	program_id: int("program_id").notNull(),
	operation_type_id: int("operation_type_id").notNull(),
	description: text("description"),
	points: int("points").default(0).notNull(),
	level_points: int("level_points").default(0).notNull(),
	wallet: double("wallet", { precision: 8, scale: 2 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		store_program_operations_id: primaryKey({ columns: [table.id], name: "store_program_operations_id"}),
	}
});

export const store_programs = mysqlTable("store_programs", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	program_id: int("program_id").notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	level_id: int("level_id").notNull(),
	date_registration: timestamp("date_registration", { mode: 'string' }).defaultNow().notNull(),
	points: int("points").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	level_start: timestamp("level_start", { mode: 'string' }),
	level_end: timestamp("level_end", { mode: 'string' }),
	level_points: int("level_points").default(0).notNull(),
	wallet: decimal("wallet", { precision: 18, scale: 5 }),
},
(table) => {
	return {
		store_programs_id: primaryKey({ columns: [table.id], name: "store_programs_id"}),
	}
});

export const store_wallets = mysqlTable("store_wallets", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	store_program_id: int("store_program_id").notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	delivery_id: int("delivery_id").notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	date_expiration: timestamp("date_expiration", { mode: 'string' }).defaultNow().notNull(),
	amount: double("amount", { precision: 8, scale: 2 }),
	rest: double("rest", { precision: 8, scale: 2 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		store_wallets_id: primaryKey({ columns: [table.id], name: "store_wallets_id"}),
	}
});

export const sub_qualifications = mysqlTable("sub_qualifications", {
	id: char("id", { length: 36 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	qualifications_id: char("qualifications_id", { length: 36 }).notNull().references(() => qualifications.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		sub_qualifications_id: primaryKey({ columns: [table.id], name: "sub_qualifications_id"}),
	}
});

export const supplier_credits = mysqlTable("supplier_credits", {
	id: char("id", { length: 36 }).notNull(),
	supplier_id: char("supplier_id", { length: 36 }).notNull(),
	company_id: char("company_id", { length: 36 }).notNull(),
	credit: decimal("credit", { precision: 10, scale: 2 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		supplier_credits_id: primaryKey({ columns: [table.id], name: "supplier_credits_id"}),
	}
});

export const suppliers = mysqlTable("suppliers", {
	id: char("id", { length: 36 }).notNull(),
	company_id: char("company_id", { length: 36 }),
	created_by: char("created_by", { length: 36 }),
	city_id: char("city_id", { length: 36 }),
	country_id: char("country_id", { length: 36 }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	wholesaler_id: int("wholesaler_id"),
	name: varchar("name", { length: 255 }).notNull(),
	image: varchar("image", { length: 255 }),
	email: varchar("email", { length: 255 }),
	fax: varchar("fax", { length: 255 }),
	phone: varchar("phone", { length: 255 }),
	address: varchar("address", { length: 255 }),
	code_postale: varchar("code_postale", { length: 255 }),
	description: varchar("description", { length: 255 }),
	fav: int("fav").default(0).notNull(),
	modifier_par: char("modifier_par", { length: 36 }),
	credit: decimal("credit", { precision: 10, scale: 2 }).default('0.00').notNull(),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		suppliers_id: primaryKey({ columns: [table.id], name: "suppliers_id"}),
	}
});

export const support = mysqlTable("support", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	tele: bigint("tele", { mode: "number" }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		support_id: primaryKey({ columns: [table.id], name: "support_id"}),
	}
});

export const syncronizations = mysqlTable("syncronizations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	total_synced: int("total_synced").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		syncronizations_id: primaryKey({ columns: [table.id], name: "syncronizations_id"}),
	}
});

export const syntheses = mysqlTable("syntheses", {
	id: char("id", { length: 36 }).notNull(),
	product_name: varchar("product_name", { length: 191 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	last_modification_date: date("last_modification_date", { mode: 'string' }),
	atc_code: varchar("atc_code", { length: 191 }),
	breastfeeding_risk: varchar("breastfeeding_risk", { length: 191 }),
	doping_allowed: tinyint("doping_allowed"),
	vigilance_level: varchar("vigilance_level", { length: 191 }),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		syntheses_id: primaryKey({ columns: [table.id], name: "syntheses_id"}),
	}
});

export const system_adverse_effects = mysqlTable("system_adverse_effects", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	name: text("name"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		system_adverse_effects_my_row_id: primaryKey({ columns: [table.my_row_id], name: "system_adverse_effects_my_row_id"}),
	}
});

export const system_notifications = mysqlTable("system_notifications", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	reference: varchar("reference", { length: 191 }).notNull(),
	content: text("content").notNull(),
	link: text("link"),
	description: text("description"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		system_notifications_id: primaryKey({ columns: [table.id], name: "system_notifications_id"}),
	}
});

export const table_produits = mysqlTable("table_produits", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		table_produits_id: primaryKey({ columns: [table.id], name: "table_produits_id"}),
	}
});

export const targets = mysqlTable("targets", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	laboratory_id: char("laboratory_id", { length: 36 }),
	name: varchar("name", { length: 191 }).notNull(),
	service_id: int("service_id"),
	region_id: int("region_id"),
	city_id: char("city_id", { length: 36 }),
	sector_id: int("sector_id"),
	company_type_id: int("company_type_id"),
	role_id: int("role_id"),
	company_id: char("company_id", { length: 36 }),
	user_id: char("user_id", { length: 36 }),
	nbr_users: int("nbr_users"),
	users: text("users"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		targets_id: primaryKey({ columns: [table.id], name: "targets_id"}),
	}
});

export const termes = mysqlTable("termes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom_Terme: varchar("Nom_Terme", { length: 255 }).notNull(),
	Value: varchar("Value", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		termes_id: primaryKey({ columns: [table.id], name: "termes_id"}),
	}
});

export const trace_lab_searches = mysqlTable("trace_lab_searches", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: char("id", { length: 36 }).notNull(),
	name: text("name"),
	searches: json("searches"),
	user_id: char("user_id", { length: 36 }),
	board_id: char("board_id", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		trace_lab_searches_my_row_id: primaryKey({ columns: [table.my_row_id], name: "trace_lab_searches_my_row_id"}),
	}
});

export const transactions = mysqlTable("transactions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	date: datetime("date", { mode: 'string'}).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	entiry_type: int("entiry_type").notNull(),
	entities: int("entities").notNull(),
	reference: varchar("reference", { length: 255 }),
	payment_status: varchar("payment_status", { length: 255 }).notNull(),
	modes_of_payment: varchar("modes_of_payment", { length: 255 }).notNull(),
	amount: double("amount", { precision: 8, scale: 2 }).notNull(),
	type_remise: varchar("type_remise", { length: 255 }),
	remise: decimal("remise", { precision: 10, scale: 2 }),
	given_amount: double("given_amount", { precision: 8, scale: 2 }),
	rest_amount: double("rest_amount", { precision: 8, scale: 2 }),
	user_id: char("user_id", { length: 36 }).notNull(),
	account_id: int("account_id").notNull(),
	account_type: int("account_type").notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		transactions_id: primaryKey({ columns: [table.id], name: "transactions_id"}),
	}
});

export const treatment_categories = mysqlTable("treatment_categories", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		treatment_categories_id: primaryKey({ columns: [table.id], name: "treatment_categories_id"}),
	}
});

export const treatment_children = mysqlTable("treatment_children", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	treatment_id: int("treatment_id").notNull(),
	name: text("name").notNull(),
	image: text("image"),
	description: text("description"),
	stat: varchar("stat", { length: 191 }).default("1").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		treatment_children_id: primaryKey({ columns: [table.id], name: "treatment_children_id"}),
	}
});

export const treatment_products = mysqlTable("treatment_products", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	treatment_id: int("treatment_id").notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		treatment_products_id: primaryKey({ columns: [table.id], name: "treatment_products_id"}),
	}
});

export const treatments = mysqlTable("treatments", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	countercase_id: int("countercase_id").notNull(),
	countercase_rubric_id: int("countercase_rubric_id").notNull(),
	age_id: int("age_id").notNull(),
	treatment_category_id: int("treatment_category_id").notNull(),
	name: text("name").notNull(),
	molecule: text("molecule"),
	stat: varchar("stat", { length: 191 }).default("1").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		treatments_id: primaryKey({ columns: [table.id], name: "treatments_id"}),
	}
});

export const tutorial_permissions = mysqlTable("tutorial_permissions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	tutorial_id: int("tutorial_id").notNull(),
	permission_id: int("permission_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		tutorial_permissions_id: primaryKey({ columns: [table.id], name: "tutorial_permissions_id"}),
	}
});

export const tutorial_roles = mysqlTable("tutorial_roles", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	tutorial_id: int("tutorial_id").notNull(),
	role_id: int("role_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		tutorial_roles_id: primaryKey({ columns: [table.id], name: "tutorial_roles_id"}),
	}
});

export const tutorial_steps = mysqlTable("tutorial_steps", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: bigint("id", { mode: "number", unsigned: true }).notNull(),
	tutorial_id: int("tutorial_id").notNull(),
	orderColumn: int("orderColumn").notNull(),
	url: varchar("url", { length: 191 }),
	title: varchar("title", { length: 191 }).notNull(),
	sub_title: varchar("sub_title", { length: 191 }),
	description: text("description").notNull(),
	image: text("image"),
	element: varchar("element", { length: 191 }),
	position: varchar("position", { length: 191 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		tutorial_steps_my_row_id: primaryKey({ columns: [table.my_row_id], name: "tutorial_steps_my_row_id"}),
	}
});

export const tutorials = mysqlTable("tutorials", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: bigint("id", { mode: "number", unsigned: true }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	description: text("description").notNull(),
	type: int("type").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		tutorials_my_row_id: primaryKey({ columns: [table.my_row_id], name: "tutorials_my_row_id"}),
	}
});

export const tvas = mysqlTable("tvas", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom_Tva: varchar("Nom_Tva", { length: 255 }).notNull(),
	Valeur: varchar("Valeur", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	Type: varchar("Type", { length: 50 }),
},
(table) => {
	return {
		tvas_id: primaryKey({ columns: [table.id], name: "tvas_id"}),
	}
});

export const type_clients = mysqlTable("type_clients", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		type_clients_id: primaryKey({ columns: [table.id], name: "type_clients_id"}),
	}
});

export const type_notifications = mysqlTable("type_notifications", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		type_notifications_id: primaryKey({ columns: [table.id], name: "type_notifications_id"}),
	}
});

export const type_utilisateurs = mysqlTable("type_utilisateurs", {
	my_row_id: bigint("my_row_id", { mode: "number", unsigned: true }).notNull(),
	id: int("id").notNull(),
	role_type: varchar("role_type", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		type_utilisateurs_my_row_id: primaryKey({ columns: [table.my_row_id], name: "type_utilisateurs_my_row_id"}),
	}
});

export const typepayments = mysqlTable("typepayments", {
	id: int("id").autoincrement().notNull(),
	nom: varchar("nom", { length: 222 }).notNull(),
	id_payement: int("id_payement").notNull(),
},
(table) => {
	return {
		typepayments_id: primaryKey({ columns: [table.id], name: "typepayments_id"}),
	}
});

export const types = mysqlTable("types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 255 }),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	remember_token: varchar("remember_token", { length: 100 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		types_id: primaryKey({ columns: [table.id], name: "types_id"}),
	}
});

export const units = mysqlTable("units", {
	id: char("id", { length: 36 }).notNull(),
	name: text("name").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		units_id: primaryKey({ columns: [table.id], name: "units_id"}),
	}
});

export const user_favorites = mysqlTable("user_favorites", {
	id: int("id").autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	favorite_id: int("favorite_id").notNull(),
	state: int("state").default(0),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
},
(table) => {
	return {
		user_favorites_id: primaryKey({ columns: [table.id], name: "user_favorites_id"}),
	}
});

export const user_functions = mysqlTable("user_functions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_functions_id: primaryKey({ columns: [table.id], name: "user_functions_id"}),
	}
});

export const user_gifts = mysqlTable("user_gifts", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }),
	gift_id: int("gift_id"),
	gift_stat_id: int("gift_stat_id"),
	date_reclamation: timestamp("date_reclamation", { mode: 'string' }),
	date_stat: timestamp("date_stat", { mode: 'string' }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_gifts_id: primaryKey({ columns: [table.id], name: "user_gifts_id"}),
	}
});

export const user_notifications = mysqlTable("user_notifications", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	id_cms_privileges: int("id_cms_privileges").notNull(),
	laboratories_id: int("laboratories_id"),
	grossistes_id: int("grossistes_id"),
	module: varchar("module", { length: 191 }).notNull(),
	allowed: tinyint("allowed").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		user_notifications_id: primaryKey({ columns: [table.id], name: "user_notifications_id"}),
	}
});

export const user_participations = mysqlTable("user_participations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	participation_id: int("participation_id").notNull(),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	points: int("points").default(0).notNull(),
	store_points: int("store_points").default(0).notNull(),
	is_success: tinyint("is_success").default(0).notNull(),
	answer: longtext("answer"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_participations_id: primaryKey({ columns: [table.id], name: "user_participations_id"}),
	}
});

export const user_permissions = mysqlTable("user_permissions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	company_type: varchar("company_type", { length: 191 }).notNull(),
	company_id: char("company_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	service_id: int("service_id").notNull(),
	permission_id: int("permission_id").notNull(),
	stat: tinyint("stat").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_permissions_id: primaryKey({ columns: [table.id], name: "user_permissions_id"}),
	}
});

export const user_program_operations = mysqlTable("user_program_operations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	program_id: int("program_id").notNull(),
	operation_type_id: int("operation_type_id").notNull(),
	description: text("description"),
	points: int("points").notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_program_operations_id: primaryKey({ columns: [table.id], name: "user_program_operations_id"}),
	}
});

export const user_programs = mysqlTable("user_programs", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	program_id: bigint("program_id", { mode: "number", unsigned: true }).notNull(),
	date_registration: timestamp("date_registration", { mode: 'string' }).defaultNow().notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	points: int("points").default(0).notNull(),
},
(table) => {
	return {
		user_programs_id: primaryKey({ columns: [table.id], name: "user_programs_id"}),
	}
});

export const user_qualifications = mysqlTable("user_qualifications", {
	id: char("id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" } ),
	qualification_id: char("qualification_id", { length: 36 }).notNull().references(() => qualifications.id),
	sub_qualification_id: char("sub_qualification_id", { length: 36 }).references(() => sub_qualifications.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	role: varchar("role", { length: 255 }),
	practice_type: varchar("practice_type", { length: 255 }),
});

export const user_questionnaires = mysqlTable("user_questionnaires", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_participation_id: bigint("user_participation_id", { mode: "number", unsigned: true }).notNull(),
	questionnaire_id: bigint("questionnaire_id", { mode: "number", unsigned: true }),
	participation_id: int("participation_id"),
	question_id: int("question_id"),
	is_success: tinyint("is_success").default(0).notNull(),
	answer: longtext("answer"),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		questionnaire_id_foreign: index("user_questionnaires_questionnaire_id_foreign").on(table.questionnaire_id),
		user_questionnaires_id: primaryKey({ columns: [table.id], name: "user_questionnaires_id"}),
	}
});

export const user_reclamations = mysqlTable("user_reclamations", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }),
	user_scan_id: int("user_scan_id"),
	program_id: int("program_id"),
	promotion_id: int("promotion_id"),
	reference: varchar("reference", { length: 191 }),
	source: int("source"),
	company_name: varchar("company_name", { length: 191 }),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	points: int("points").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_reclamations_id: primaryKey({ columns: [table.id], name: "user_reclamations_id"}),
	}
});

export const user_report = mysqlTable("user_report", {
	id: int("id", { unsigned: true }).autoincrement().notNull(),
	cms_users_id: char("cms_users_id", { length: 36 }),
	message: text("message"),
	status: tinyint("status"),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		user_report_id: primaryKey({ columns: [table.id], name: "user_report_id"}),
	}
});

export const user_scans = mysqlTable("user_scans", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	qr_code_id: bigint("qr_code_id", { mode: "number", unsigned: true }).notNull(),
	date_scan: timestamp("date_scan", { mode: 'string' }).defaultNow().notNull(),
	is_success: tinyint("is_success").default(0).notNull(),
	points: int("points").default(0).notNull(),
	store_points: int("store_points").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_scans_id: primaryKey({ columns: [table.id], name: "user_scans_id"}),
	}
});

export const user_transactions = mysqlTable("user_transactions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }).notNull(),
	user_id: char("user_id", { length: 36 }).notNull(),
	program_id: int("program_id"),
	promotion_id: int("promotion_id"),
	operation_id: int("operation_id"),
	operation_type: varchar("operation_type", { length: 191 }),
	date: timestamp("date", { mode: 'string' }).defaultNow().notNull(),
	points: int("points").default(0).notNull(),
	store_points: int("store_points").default(0).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		user_transactions_id: primaryKey({ columns: [table.id], name: "user_transactions_id"}),
	}
});

export const userfavorie = mysqlTable("userfavorie", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	user_id: char("user_id", { length: 36 }),
	id_favorie: bigint("id_favorie", { mode: "number" }),
	state: int("state").default(0),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		userfavorie_id: primaryKey({ columns: [table.id], name: "userfavorie_id"}),
	}
});

export const users = mysqlTable("users", {
	id: char("id", { length: 36 }).notNull(),
	company_id: char("company_id", { length: 36 }),
	company_type: varchar("company_type", { length: 255 }),
	service_id: bigint("service_id", { mode: "number", unsigned: true }),
	first_name: varchar("first_name", { length: 255 }).notNull(),
	last_name: varchar("last_name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	has_api_access: tinyint("has_api_access").default(0),
	username: varchar("username", { length: 255 }),
	avatar: varchar("avatar", { length: 255 }),
	phone: varchar("phone", { length: 255 }),
	device_id: varchar("device_id", { length: 255 }),
	email_verified_at: timestamp("email_verified_at", { mode: 'string' }),
	password: varchar("password", { length: 255 }).notNull(),
	role_id: mysqlEnum("role_id", ['pha_holder','pha_substite','pha_technician','laboratory_admin','laboratory_operator','wholesaler_admin','wholesaler_operator','admin','operator','commercial','technician','product_manager','other']),
	stat: tinyint("stat").default(0).notNull(),
	remember_token: varchar("remember_token", { length: 100 }),
	code: varchar("code", { length: 255 }),
	firebase_token: varchar("firebase_token", { length: 255 }),
	operator: varchar("operator", { length: 255 }),
	stat_scan: tinyint("stat_scan").default(0).notNull(),
	import: tinyint("import").default(1).notNull(),
	import_content: text("import_content"),
	country_id: char("country_id", { length: 36 }),
	address: varchar("address", { length: 255 }),
	title: varchar("title", { length: 255 }),
	deleted: tinyint("deleted").default(0).notNull(),
	last_seen: timestamp("last_seen", { mode: 'string' }),
	profile_img: varchar("profile_img", { length: 255 }),
	gender: varchar("gender", { length: 255 }),
	pre_id: bigint("pre_id", { mode: "number" }),
	cmd_id: bigint("cmd_id", { mode: "number" }),
	pre_company_id: bigint("pre_company_id", { mode: "number" }),
	cmd_company_id: bigint("cmd_company_id", { mode: "number" }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
	cgu_version: text("cgu_version").notNull(),
	password_compta: varchar("password_compta", { length: 255 }).default('$2y$10$Zrar4XI3R6Q55gUSQVlmQO3lT4H/63ELdXa1WgA4h9Yrwf9V1bcyy').notNull(),
	last_login_compta: timestamp("last_login_compta", { mode: 'string' }),
	civility: mysqlEnum("civility", ['Monsieur','Madame','Mademoiselle','Docteur','Professeur']).notNull(),
},
(table) => {
	return {
		users_id: primaryKey({ columns: [table.id], name: "users_id"}),
	}
});

export const venteproduits = mysqlTable("venteproduits", {
	ventes_id: varchar("ventes_id", { length: 222 }),
	produits_id: char("produits_id", { length: 36 }),
	quantite: int("quantite"),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}),
	id: int("id").autoincrement().notNull(),
	remboursement: varchar("remboursement", { length: 222 }),
	remise: double("remise", { precision: 10, scale: 2 }),
	taux_remboursement: varchar("taux_remboursement", { length: 222 }),
	prix_unitaire: varchar("prix_unitaire", { length: 222 }),
	type_remise: varchar("type_remise", { length: 222 }),
	PPV_app: varchar("PPV_app", { length: 123 }).notNull(),
	PPH_app: varchar("PPH_app", { length: 123 }).notNull(),
	tax_rate: int("tax_rate").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		venteproduits_id: primaryKey({ columns: [table.id], name: "venteproduits_id"}),
	}
});

export const ventes = mysqlTable("ventes", {
	id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement().notNull(),
	date_effectuer: datetime("date_effectuer", { mode: 'string'}),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	client_id: int("client_id"),
	status: varchar("status", { length: 22 }),
	original_status: int("original_status"),
	livree: varchar("livree", { length: 222 }),
	ordonnance: int("ordonnance").default(1),
	mode_payment: varchar("mode_payment", { length: 222 }),
	reference: varchar("reference", { length: 222 }),
	creer_par: char("creer_par", { length: 36 }),
	montant_credit: decimal("montant_credit", { precision: 10, scale: 2 }),
	montant_rendre: decimal("montant_rendre", { precision: 10, scale: 2 }),
	montant_PPV: decimal("montant_PPV", { precision: 10, scale: 2 }),
	montant_PU: decimal("montant_PU", { precision: 10, scale: 2 }),
	montant_recu: varchar("montant_recu", { length: 222 }),
	archive: tinyint("archive").default(0).notNull(),
	date_archivage: timestamp("date_archivage", { mode: 'string' }),
	organisme: int("organisme"),
	qte_total: int("qte_total").default(0).notNull(),
	total_rectifier: decimal("total_rectifier", { precision: 10, scale: 2 }),
	etat_retour: int("etat_retour").default(0),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
	caisse_id: bigint("caisse_id", { mode: "number", unsigned: true }),
	type_remise: int("type_remise").default(-1),
	remise: double("remise", { precision: 8, scale: 2 }),
},
(table) => {
	return {
		caisse_id_foreign: index("ventes_caisse_id_foreign").on(table.caisse_id),
		ventes_id: primaryKey({ columns: [table.id], name: "ventes_id"}),
	}
});

export const villes = mysqlTable("villes", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom: varchar("Nom", { length: 255 }).notNull(),
	pays_id: char("pays_id", { length: 36 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		pays_id_foreign: index("villes_pays_id_foreign").on(table.pays_id),
		villes_id: primaryKey({ columns: [table.id], name: "villes_id"}),
	}
});

export const warning_items = mysqlTable("warning_items", {
	id: char("id", { length: 36 }).notNull(),
	item: text("item").notNull(),
	order: int("order"),
	warnings_for_use_id: char("warnings_for_use_id", { length: 36 }).references(() => warnings_for_uses.id),
	molecule_id: char("molecule_id", { length: 36 }).references(() => molecules.id),
	product_id: char("product_id", { length: 36 }).references(() => products.id),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		warning_items_id: primaryKey({ columns: [table.id], name: "warning_items_id"}),
	}
});

export const warnings_for_uses = mysqlTable("warnings_for_uses", {
	id: char("id", { length: 36 }).notNull(),
	title: varchar("title", { length: 191 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		warnings_for_uses_id: primaryKey({ columns: [table.id], name: "warnings_for_uses_id"}),
	}
});

export const wholesaler_suggestions = mysqlTable("wholesaler_suggestions", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	wholesaler_type_id: int("wholesaler_type_id").notNull(),
	parent_id: int("parent_id"),
	name: varchar("name", { length: 191 }).notNull(),
	status: tinyint("status").default(0).notNull(),
	brand: varchar("brand", { length: 191 }),
	address: text("address"),
	postal_code: varchar("postal_code", { length: 191 }),
	city: varchar("city", { length: 191 }),
	email: varchar("email", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	fax: varchar("fax", { length: 191 }),
	website: varchar("website", { length: 191 }),
	import: int("import"),
	external_id: varchar("external_id", { length: 191 }),
	import_content: varchar("import_content", { length: 191 }),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		wholesaler_suggestions_id: primaryKey({ columns: [table.id], name: "wholesaler_suggestions_id"}),
	}
});

export const wholesaler_types = mysqlTable("wholesaler_types", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar("name", { length: 191 }).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		wholesaler_types_id: primaryKey({ columns: [table.id], name: "wholesaler_types_id"}),
	}
});

export const wholesalers = mysqlTable("wholesalers", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	wholesaler_type_id: int("wholesaler_type_id").notNull(),
	parent_id: int("parent_id"),
	suggestion_id: int("suggestion_id"),
	name: varchar("name", { length: 191 }).notNull(),
	brand: varchar("brand", { length: 191 }),
	address: text("address"),
	email: varchar("email", { length: 191 }),
	phone: varchar("phone", { length: 191 }),
	fax: varchar("fax", { length: 191 }),
	website: varchar("website", { length: 191 }),
	coef1: decimal("coef1", { precision: 18, scale: 5 }),
	coef2: decimal("coef2", { precision: 18, scale: 5 }),
	type_pro: int("type_pro").default(1).notNull(),
	is_demo: int("is_demo").default(0).notNull(),
	api: varchar("api", { length: 191 }),
	api_code: varchar("api_code", { length: 191 }),
	stat: tinyint("stat").default(1).notNull(),
	created_by: char("created_by", { length: 36 }),
	updated_by: char("updated_by", { length: 36 }),
	deleted_by: char("deleted_by", { length: 36 }),
	user_created_by: char("user_created_by", { length: 36 }),
	user_updated_by: char("user_updated_by", { length: 36 }),
	user_deleted_by: char("user_deleted_by", { length: 36 }),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		wholesalers_id: primaryKey({ columns: [table.id], name: "wholesalers_id"}),
	}
});

export const zone_products = mysqlTable("zone_products", {
	id: char("id", { length: 36 }).notNull(),
	zone_id: bigint("zone_id", { mode: "number", unsigned: true }).notNull(),
	product_id: char("product_id", { length: 36 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	deleted_at: timestamp("deleted_at", { mode: 'string' }),
},
(table) => {
	return {
		zone_products_id: primaryKey({ columns: [table.id], name: "zone_products_id"}),
	}
});

export const zones = mysqlTable("zones", {
	id: bigint("id", { mode: "number", unsigned: true }).autoincrement().notNull(),
	Nom_zone: varchar("Nom_zone", { length: 255 }).notNull(),
	Ref_zone: varchar("Ref_zone", { length: 255 }).notNull(),
	deleted_at: datetime("deleted_at", { mode: 'string'}),
	created_at: timestamp("created_at", { mode: 'string' }),
	updated_at: timestamp("updated_at", { mode: 'string' }),
	creer_par: char("creer_par", { length: 36 }).notNull(),
	pharmacy_id: char("pharmacy_id", { length: 36 }),
},
(table) => {
	return {
		zones_id: primaryKey({ columns: [table.id], name: "zones_id"}),
	}
});
