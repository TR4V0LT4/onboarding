import { relations } from "drizzle-orm/relations";
import { molecules, adverse_effects, pathologies, products, companies, alt_ids_company, suppliers, alt_name_suppliers, alt_name_wholesalers, alt_names, countries, alt_products, general_conditions, cgu_histories, users, check_products, commissions, delivery_note_types, cities, delivery_gap, produitcommandes, drug_interactions, favorite_wholesalers, field_matches, indications, lab_packs, lab_offer_conditions, lab_pack_products, lab_offers, lab_order_details, orders, lab_orders, lab_pack_wholesalers, loyalty_company_wallets, loyalty_programs, loyalty_orders, order_details, loyalty_product_program, loyalty_user_program, program_tiers, matched_lab_order_delivery_scan, scanned_products, bl_scan, matched_products, molecule_groups, molecule_infos, molecule_posologies, notification_sendings, notification_system_details, ongoing_offers, premium_offers, p_categories, caisses, paiementfournisseur, syntheses, pregnancy_risks, price_group, product_prices, product_adjustments, stock_adjustments, product_classifications, product_codes, forms, product_formes, product_imgs, product_insurance_statuses, product_labs, product_monographs, product_partners, product_pcategories, product_posologies, product_status, insurance_classifications, reproductive_healths, setting_pharmacies, setting, stock_pharmacies, qualifications, sub_qualifications, user_qualifications, warning_items, warnings_for_uses } from "./schema";

export const adverse_effectsRelations = relations(adverse_effects, ({one}) => ({
	molecule: one(molecules, {
		fields: [adverse_effects.molecule_id],
		references: [molecules.id]
	}),
	pathology: one(pathologies, {
		fields: [adverse_effects.pathology_id],
		references: [pathologies.id]
	}),
	product: one(products, {
		fields: [adverse_effects.product_id],
		references: [products.id]
	}),
}));

export const moleculesRelations = relations(molecules, ({many}) => ({
	adverse_effects: many(adverse_effects),
	drug_interactions_molecule_id: many(drug_interactions, {
		relationName: "drug_interactions_molecule_id_molecules_id"
	}),
	drug_interactions_second_molecule_id: many(drug_interactions, {
		relationName: "drug_interactions_second_molecule_id_molecules_id"
	}),
	molecule_groups: many(molecule_groups),
	molecule_infos: many(molecule_infos),
	molecule_posologies: many(molecule_posologies),
	reproductive_healths: many(reproductive_healths),
	syntheses: many(syntheses),
	warning_items: many(warning_items),
}));

export const pathologiesRelations = relations(pathologies, ({many}) => ({
	adverse_effects: many(adverse_effects),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	adverse_effects: many(adverse_effects),
	alt_names: many(alt_names),
	check_products: many(check_products),
	delivery_gaps: many(delivery_gap),
	drug_interactions: many(drug_interactions),
	field_matches: many(field_matches),
	indications: many(indications),
	lab_offer_conditions: many(lab_offer_conditions),
	lab_pack_products: many(lab_pack_products),
	matched_products: many(matched_products),
	molecule_infos: many(molecule_infos),
	price_groups: many(price_group),
	product_adjustments: many(product_adjustments),
	product_classifications: many(product_classifications),
	product_codes: many(product_codes),
	product_formes: many(product_formes),
	product_imgs: many(product_imgs),
	product_insurance_statuses: many(product_insurance_statuses),
	product_labs: many(product_labs),
	product_monographs: many(product_monographs),
	product_pcategories: many(product_pcategories),
	product_posologies: many(product_posologies),
	product_prices: many(product_prices),
	product_statuses: many(product_status),
	insurance_classification: one(insurance_classifications, {
		fields: [products.insurance_classification_id],
		references: [insurance_classifications.id]
	}),
	reproductive_healths: many(reproductive_healths),
	stock_pharmacies: many(stock_pharmacies),
	warning_items: many(warning_items),
}));

export const alt_ids_companyRelations = relations(alt_ids_company, ({one}) => ({
	company: one(companies, {
		fields: [alt_ids_company.company_id],
		references: [companies.id]
	}),
}));

export const companiesRelations = relations(companies, ({one, many}) => ({
	alt_ids_companies: many(alt_ids_company),
	alt_name_wholesalers: many(alt_name_wholesalers),
	alt_names: many(alt_names),
	alt_products: many(alt_products),
	commissions: many(commissions),
	country: one(countries, {
		fields: [companies.country_id],
		references: [countries.id]
	}),
	delivery_note_type: one(delivery_note_types, {
		fields: [companies.delivery_note_type_id],
		references: [delivery_note_types.id]
	}),
	delivery_gaps: many(delivery_gap),
	favorite_wholesalers: many(favorite_wholesalers),
	lab_offers: many(lab_offers),
	lab_pack_wholesalers: many(lab_pack_wholesalers),
	loyalty_company_wallets: many(loyalty_company_wallets),
	loyalty_orders_company_id: many(loyalty_orders, {
		relationName: "loyalty_orders_company_id_companies_id"
	}),
	loyalty_orders_pharmacy_id: many(loyalty_orders, {
		relationName: "loyalty_orders_pharmacy_id_companies_id"
	}),
	loyalty_programs: many(loyalty_programs),
	loyalty_user_programs: many(loyalty_user_program),
	ongoing_offers: many(ongoing_offers),
	price_groups: many(price_group),
	product_adjustments: many(product_adjustments),
	product_labs: many(product_labs),
	product_partners: many(product_partners),
	setting_pharmacies: many(setting_pharmacies),
	stock_adjustments: many(stock_adjustments),
	stock_pharmacies: many(stock_pharmacies),
}));

export const alt_name_suppliersRelations = relations(alt_name_suppliers, ({one}) => ({
	supplier: one(suppliers, {
		fields: [alt_name_suppliers.supplier_id],
		references: [suppliers.id]
	}),
}));

export const suppliersRelations = relations(suppliers, ({many}) => ({
	alt_name_suppliers: many(alt_name_suppliers),
	delivery_gaps: many(delivery_gap),
}));

export const alt_name_wholesalersRelations = relations(alt_name_wholesalers, ({one}) => ({
	company: one(companies, {
		fields: [alt_name_wholesalers.wholesaler_id],
		references: [companies.id]
	}),
}));

export const alt_namesRelations = relations(alt_names, ({one}) => ({
	company: one(companies, {
		fields: [alt_names.company_id],
		references: [companies.id]
	}),
	country: one(countries, {
		fields: [alt_names.country_id],
		references: [countries.id]
	}),
	product: one(products, {
		fields: [alt_names.product_id],
		references: [products.id]
	}),
}));

export const countriesRelations = relations(countries, ({many}) => ({
	alt_names: many(alt_names),
	companies: many(companies),
	drug_interactions: many(drug_interactions),
	p_categories: many(p_categories),
	product_classifications: many(product_classifications),
	product_codes: many(product_codes),
	product_insurance_statuses: many(product_insurance_statuses),
	product_labs: many(product_labs),
	product_monographs: many(product_monographs),
	product_prices: many(product_prices),
	product_statuses: many(product_status),
}));

export const alt_productsRelations = relations(alt_products, ({one, many}) => ({
	company: one(companies, {
		fields: [alt_products.wholesaler_id],
		references: [companies.id]
	}),
	field_matches: many(field_matches),
	matched_products: many(matched_products),
}));

export const cgu_historiesRelations = relations(cgu_histories, ({one}) => ({
	general_condition: one(general_conditions, {
		fields: [cgu_histories.cgu_id],
		references: [general_conditions.id]
	}),
	user: one(users, {
		fields: [cgu_histories.user_id],
		references: [users.id]
	}),
}));

export const general_conditionsRelations = relations(general_conditions, ({many}) => ({
	cgu_histories: many(cgu_histories),
	loyalty_programs: many(loyalty_programs),
}));

export const usersRelations = relations(users, ({many}) => ({
	cgu_histories: many(cgu_histories),
	favorite_wholesalers: many(favorite_wholesalers),
	setting_pharmacies: many(setting_pharmacies),
	stock_adjustments: many(stock_adjustments),
	stock_pharmacies: many(stock_pharmacies),
	user_qualifications: many(user_qualifications),
}));

export const check_productsRelations = relations(check_products, ({one}) => ({
	product: one(products, {
		fields: [check_products.product_id],
		references: [products.id]
	}),
}));

export const commissionsRelations = relations(commissions, ({one}) => ({
	company: one(companies, {
		fields: [commissions.company_id],
		references: [companies.id]
	}),
}));

export const delivery_note_typesRelations = relations(delivery_note_types, ({many}) => ({
	companies: many(companies),
}));

export const delivery_gapRelations = relations(delivery_gap, ({one}) => ({
	city: one(cities, {
		fields: [delivery_gap.city_id],
		references: [cities.id]
	}),
	produitcommande: one(produitcommandes, {
		fields: [delivery_gap.detail_order_id],
		references: [produitcommandes.id]
	}),
	company: one(companies, {
		fields: [delivery_gap.pharmacy_id],
		references: [companies.id]
	}),
	product: one(products, {
		fields: [delivery_gap.product_id],
		references: [products.id]
	}),
	supplier: one(suppliers, {
		fields: [delivery_gap.supplier_id],
		references: [suppliers.id]
	}),
}));

export const citiesRelations = relations(cities, ({many}) => ({
	delivery_gaps: many(delivery_gap),
}));

export const produitcommandesRelations = relations(produitcommandes, ({many}) => ({
	delivery_gaps: many(delivery_gap),
}));

export const drug_interactionsRelations = relations(drug_interactions, ({one}) => ({
	country: one(countries, {
		fields: [drug_interactions.country_id],
		references: [countries.id]
	}),
	molecule_molecule_id: one(molecules, {
		fields: [drug_interactions.molecule_id],
		references: [molecules.id],
		relationName: "drug_interactions_molecule_id_molecules_id"
	}),
	product: one(products, {
		fields: [drug_interactions.product_id],
		references: [products.id]
	}),
	molecule_second_molecule_id: one(molecules, {
		fields: [drug_interactions.second_molecule_id],
		references: [molecules.id],
		relationName: "drug_interactions_second_molecule_id_molecules_id"
	}),
}));

export const favorite_wholesalersRelations = relations(favorite_wholesalers, ({one}) => ({
	user: one(users, {
		fields: [favorite_wholesalers.user_id],
		references: [users.id]
	}),
	company: one(companies, {
		fields: [favorite_wholesalers.wholesaler_id],
		references: [companies.id]
	}),
}));

export const field_matchesRelations = relations(field_matches, ({one}) => ({
	alt_product: one(alt_products, {
		fields: [field_matches.alt_product_id],
		references: [alt_products.id]
	}),
	product: one(products, {
		fields: [field_matches.product_id],
		references: [products.id]
	}),
}));

export const indicationsRelations = relations(indications, ({one}) => ({
	product: one(products, {
		fields: [indications.product_id],
		references: [products.id]
	}),
}));

export const lab_offer_conditionsRelations = relations(lab_offer_conditions, ({one}) => ({
	lab_pack: one(lab_packs, {
		fields: [lab_offer_conditions.lab_pack_id],
		references: [lab_packs.id]
	}),
	lab_pack_product: one(lab_pack_products, {
		fields: [lab_offer_conditions.lab_product_id],
		references: [lab_pack_products.id]
	}),
	product: one(products, {
		fields: [lab_offer_conditions.reward_product_id],
		references: [products.id]
	}),
}));

export const lab_packsRelations = relations(lab_packs, ({one, many}) => ({
	lab_offer_conditions: many(lab_offer_conditions),
	lab_order_details: many(lab_order_details),
	lab_pack_products: many(lab_pack_products),
	lab_pack_wholesalers: many(lab_pack_wholesalers),
	lab_offer: one(lab_offers, {
		fields: [lab_packs.lab_offer_id],
		references: [lab_offers.id]
	}),
}));

export const lab_pack_productsRelations = relations(lab_pack_products, ({one, many}) => ({
	lab_offer_conditions: many(lab_offer_conditions),
	lab_pack: one(lab_packs, {
		fields: [lab_pack_products.lab_pack_id],
		references: [lab_packs.id]
	}),
	product: one(products, {
		fields: [lab_pack_products.product_id],
		references: [products.id]
	}),
}));

export const lab_offersRelations = relations(lab_offers, ({one, many}) => ({
	company: one(companies, {
		fields: [lab_offers.lab_id],
		references: [companies.id]
	}),
	lab_packs: many(lab_packs),
}));

export const lab_order_detailsRelations = relations(lab_order_details, ({one}) => ({
	lab_pack: one(lab_packs, {
		fields: [lab_order_details.lab_pack_id],
		references: [lab_packs.id]
	}),
}));

export const lab_ordersRelations = relations(lab_orders, ({one, many}) => ({
	order: one(orders, {
		fields: [lab_orders.order_id],
		references: [orders.id]
	}),
	matched_lab_order_delivery_scans: many(matched_lab_order_delivery_scan),
}));

export const ordersRelations = relations(orders, ({many}) => ({
	lab_orders: many(lab_orders),
}));

export const lab_pack_wholesalersRelations = relations(lab_pack_wholesalers, ({one}) => ({
	lab_pack: one(lab_packs, {
		fields: [lab_pack_wholesalers.lab_pack_id],
		references: [lab_packs.id]
	}),
	company: one(companies, {
		fields: [lab_pack_wholesalers.wholesaler_id],
		references: [companies.id]
	}),
}));

export const loyalty_company_walletsRelations = relations(loyalty_company_wallets, ({one}) => ({
	company: one(companies, {
		fields: [loyalty_company_wallets.pharmacy_id],
		references: [companies.id]
	}),
	loyalty_program: one(loyalty_programs, {
		fields: [loyalty_company_wallets.program_id],
		references: [loyalty_programs.id]
	}),
}));

export const loyalty_programsRelations = relations(loyalty_programs, ({one, many}) => ({
	loyalty_company_wallets: many(loyalty_company_wallets),
	company: one(companies, {
		fields: [loyalty_programs.company_id],
		references: [companies.id]
	}),
	general_condition: one(general_conditions, {
		fields: [loyalty_programs.general_condition_id],
		references: [general_conditions.id]
	}),
	loyalty_user_programs: many(loyalty_user_program),
	program_tiers: many(program_tiers),
}));

export const loyalty_ordersRelations = relations(loyalty_orders, ({one}) => ({
	company_company_id: one(companies, {
		fields: [loyalty_orders.company_id],
		references: [companies.id],
		relationName: "loyalty_orders_company_id_companies_id"
	}),
	order_detail: one(order_details, {
		fields: [loyalty_orders.order_line_id],
		references: [order_details.id]
	}),
	company_pharmacy_id: one(companies, {
		fields: [loyalty_orders.pharmacy_id],
		references: [companies.id],
		relationName: "loyalty_orders_pharmacy_id_companies_id"
	}),
	loyalty_product_program: one(loyalty_product_program, {
		fields: [loyalty_orders.product_id],
		references: [loyalty_product_program.id]
	}),
}));

export const order_detailsRelations = relations(order_details, ({many}) => ({
	loyalty_orders: many(loyalty_orders),
}));

export const loyalty_product_programRelations = relations(loyalty_product_program, ({many}) => ({
	loyalty_orders: many(loyalty_orders),
}));

export const loyalty_user_programRelations = relations(loyalty_user_program, ({one}) => ({
	company: one(companies, {
		fields: [loyalty_user_program.pharmacy_id],
		references: [companies.id]
	}),
	loyalty_program: one(loyalty_programs, {
		fields: [loyalty_user_program.program_id],
		references: [loyalty_programs.id]
	}),
	program_tier: one(program_tiers, {
		fields: [loyalty_user_program.program_tier_id],
		references: [program_tiers.id]
	}),
}));

export const program_tiersRelations = relations(program_tiers, ({one, many}) => ({
	loyalty_user_programs: many(loyalty_user_program),
	loyalty_program: one(loyalty_programs, {
		fields: [program_tiers.program_id],
		references: [loyalty_programs.id]
	}),
}));

export const matched_lab_order_delivery_scanRelations = relations(matched_lab_order_delivery_scan, ({one}) => ({
	lab_order: one(lab_orders, {
		fields: [matched_lab_order_delivery_scan.lab_order_id],
		references: [lab_orders.id]
	}),
	scanned_product: one(scanned_products, {
		fields: [matched_lab_order_delivery_scan.scanned_product_id],
		references: [scanned_products.id]
	}),
	bl_scan: one(bl_scan, {
		fields: [matched_lab_order_delivery_scan.scan_id],
		references: [bl_scan.id]
	}),
}));

export const scanned_productsRelations = relations(scanned_products, ({many}) => ({
	matched_lab_order_delivery_scans: many(matched_lab_order_delivery_scan),
}));

export const bl_scanRelations = relations(bl_scan, ({many}) => ({
	matched_lab_order_delivery_scans: many(matched_lab_order_delivery_scan),
}));

export const matched_productsRelations = relations(matched_products, ({one}) => ({
	alt_product: one(alt_products, {
		fields: [matched_products.alt_product_id],
		references: [alt_products.id]
	}),
	product: one(products, {
		fields: [matched_products.product_id],
		references: [products.id]
	}),
}));

export const molecule_groupsRelations = relations(molecule_groups, ({one}) => ({
	molecule: one(molecules, {
		fields: [molecule_groups.molecule_id],
		references: [molecules.id]
	}),
}));

export const molecule_infosRelations = relations(molecule_infos, ({one}) => ({
	molecule: one(molecules, {
		fields: [molecule_infos.molecule_id],
		references: [molecules.id]
	}),
	product: one(products, {
		fields: [molecule_infos.product_id],
		references: [products.id]
	}),
}));

export const molecule_posologiesRelations = relations(molecule_posologies, ({one}) => ({
	molecule: one(molecules, {
		fields: [molecule_posologies.molecule_id],
		references: [molecules.id]
	}),
}));

export const notification_system_detailsRelations = relations(notification_system_details, ({one}) => ({
	notification_sending: one(notification_sendings, {
		fields: [notification_system_details.system_notification_id],
		references: [notification_sendings.id]
	}),
}));

export const notification_sendingsRelations = relations(notification_sendings, ({many}) => ({
	notification_system_details: many(notification_system_details),
}));

export const ongoing_offersRelations = relations(ongoing_offers, ({one}) => ({
	company: one(companies, {
		fields: [ongoing_offers.company_id],
		references: [companies.id]
	}),
	premium_offer: one(premium_offers, {
		fields: [ongoing_offers.offer_id],
		references: [premium_offers.id]
	}),
}));

export const premium_offersRelations = relations(premium_offers, ({many}) => ({
	ongoing_offers: many(ongoing_offers),
}));

export const p_categoriesRelations = relations(p_categories, ({one, many}) => ({
	country: one(countries, {
		fields: [p_categories.country_id],
		references: [countries.id]
	}),
	product_pcategories: many(product_pcategories),
}));

export const paiementfournisseurRelations = relations(paiementfournisseur, ({one}) => ({
	caiss: one(caisses, {
		fields: [paiementfournisseur.caisse_id],
		references: [caisses.id]
	}),
}));

export const caissesRelations = relations(caisses, ({many}) => ({
	paiementfournisseurs: many(paiementfournisseur),
}));

export const pregnancy_risksRelations = relations(pregnancy_risks, ({one}) => ({
	synthesis: one(syntheses, {
		fields: [pregnancy_risks.synthese_id],
		references: [syntheses.id]
	}),
}));

export const synthesesRelations = relations(syntheses, ({one, many}) => ({
	pregnancy_risks: many(pregnancy_risks),
	molecule: one(molecules, {
		fields: [syntheses.molecule_id],
		references: [molecules.id]
	}),
}));

export const price_groupRelations = relations(price_group, ({one}) => ({
	company: one(companies, {
		fields: [price_group.pharmacy_id],
		references: [companies.id]
	}),
	product_price_price_lab_id: one(product_prices, {
		fields: [price_group.price_lab_id],
		references: [product_prices.id],
		relationName: "price_group_price_lab_id_product_prices_id"
	}),
	product_price_price_pharmacy_id: one(product_prices, {
		fields: [price_group.price_pharmacy_id],
		references: [product_prices.id],
		relationName: "price_group_price_pharmacy_id_product_prices_id"
	}),
	product_price_price_wholesaler_id: one(product_prices, {
		fields: [price_group.price_wholesaler_id],
		references: [product_prices.id],
		relationName: "price_group_price_wholesaler_id_product_prices_id"
	}),
	product: one(products, {
		fields: [price_group.product_id],
		references: [products.id]
	}),
}));

export const product_pricesRelations = relations(product_prices, ({one, many}) => ({
	price_groups_price_lab_id: many(price_group, {
		relationName: "price_group_price_lab_id_product_prices_id"
	}),
	price_groups_price_pharmacy_id: many(price_group, {
		relationName: "price_group_price_pharmacy_id_product_prices_id"
	}),
	price_groups_price_wholesaler_id: many(price_group, {
		relationName: "price_group_price_wholesaler_id_product_prices_id"
	}),
	country: one(countries, {
		fields: [product_prices.country_id],
		references: [countries.id]
	}),
	product: one(products, {
		fields: [product_prices.product_id],
		references: [products.id]
	}),
	stock_pharmacies_price_pharmacy: many(stock_pharmacies, {
		relationName: "stock_pharmacies_price_pharmacy_product_prices_id"
	}),
	stock_pharmacies_price_wholesaler: many(stock_pharmacies, {
		relationName: "stock_pharmacies_price_wholesaler_product_prices_id"
	}),
}));

export const product_adjustmentsRelations = relations(product_adjustments, ({one}) => ({
	company: one(companies, {
		fields: [product_adjustments.pharmacy_id],
		references: [companies.id]
	}),
	product: one(products, {
		fields: [product_adjustments.product_id],
		references: [products.id]
	}),
	stock_adjustment: one(stock_adjustments, {
		fields: [product_adjustments.stock_id],
		references: [stock_adjustments.id]
	}),
}));

export const stock_adjustmentsRelations = relations(stock_adjustments, ({one, many}) => ({
	product_adjustments: many(product_adjustments),
	company: one(companies, {
		fields: [stock_adjustments.pharmacy_id],
		references: [companies.id]
	}),
	user: one(users, {
		fields: [stock_adjustments.user_id],
		references: [users.id]
	}),
}));

export const product_classificationsRelations = relations(product_classifications, ({one}) => ({
	country: one(countries, {
		fields: [product_classifications.country_id],
		references: [countries.id]
	}),
	product: one(products, {
		fields: [product_classifications.product_id],
		references: [products.id]
	}),
}));

export const product_codesRelations = relations(product_codes, ({one}) => ({
	country: one(countries, {
		fields: [product_codes.country_id],
		references: [countries.id]
	}),
	product: one(products, {
		fields: [product_codes.product_id],
		references: [products.id]
	}),
}));

export const product_formesRelations = relations(product_formes, ({one}) => ({
	form: one(forms, {
		fields: [product_formes.forme_id],
		references: [forms.id]
	}),
	product: one(products, {
		fields: [product_formes.product_id],
		references: [products.id]
	}),
}));

export const formsRelations = relations(forms, ({many}) => ({
	product_formes: many(product_formes),
}));

export const product_imgsRelations = relations(product_imgs, ({one}) => ({
	product: one(products, {
		fields: [product_imgs.product_id],
		references: [products.id]
	}),
}));

export const product_insurance_statusesRelations = relations(product_insurance_statuses, ({one}) => ({
	country: one(countries, {
		fields: [product_insurance_statuses.country_id],
		references: [countries.id]
	}),
	product: one(products, {
		fields: [product_insurance_statuses.product_id],
		references: [products.id]
	}),
}));

export const product_labsRelations = relations(product_labs, ({one}) => ({
	country: one(countries, {
		fields: [product_labs.country_id],
		references: [countries.id]
	}),
	company: one(companies, {
		fields: [product_labs.lab_id],
		references: [companies.id]
	}),
	product: one(products, {
		fields: [product_labs.product_id],
		references: [products.id]
	}),
}));

export const product_monographsRelations = relations(product_monographs, ({one}) => ({
	country: one(countries, {
		fields: [product_monographs.country_id],
		references: [countries.id]
	}),
	product: one(products, {
		fields: [product_monographs.product_id],
		references: [products.id]
	}),
}));

export const product_partnersRelations = relations(product_partners, ({one}) => ({
	company: one(companies, {
		fields: [product_partners.partner_id],
		references: [companies.id]
	}),
}));

export const product_pcategoriesRelations = relations(product_pcategories, ({one}) => ({
	p_category: one(p_categories, {
		fields: [product_pcategories.pcategory_id],
		references: [p_categories.id]
	}),
	product: one(products, {
		fields: [product_pcategories.product_id],
		references: [products.id]
	}),
}));

export const product_posologiesRelations = relations(product_posologies, ({one}) => ({
	product: one(products, {
		fields: [product_posologies.product_id],
		references: [products.id]
	}),
}));

export const product_statusRelations = relations(product_status, ({one}) => ({
	country: one(countries, {
		fields: [product_status.country_id],
		references: [countries.id]
	}),
	product: one(products, {
		fields: [product_status.product_id],
		references: [products.id]
	}),
}));

export const insurance_classificationsRelations = relations(insurance_classifications, ({many}) => ({
	products: many(products),
}));

export const reproductive_healthsRelations = relations(reproductive_healths, ({one}) => ({
	molecule: one(molecules, {
		fields: [reproductive_healths.molecule_id],
		references: [molecules.id]
	}),
	product: one(products, {
		fields: [reproductive_healths.product_id],
		references: [products.id]
	}),
}));

export const setting_pharmaciesRelations = relations(setting_pharmacies, ({one}) => ({
	company: one(companies, {
		fields: [setting_pharmacies.pharmacy_id],
		references: [companies.id]
	}),
	setting: one(setting, {
		fields: [setting_pharmacies.setting_id],
		references: [setting.id]
	}),
	user: one(users, {
		fields: [setting_pharmacies.user_id],
		references: [users.id]
	}),
}));

export const settingRelations = relations(setting, ({many}) => ({
	setting_pharmacies: many(setting_pharmacies),
}));

export const stock_pharmaciesRelations = relations(stock_pharmacies, ({one}) => ({
	company: one(companies, {
		fields: [stock_pharmacies.pharmacy_id],
		references: [companies.id]
	}),
	product_price_price_pharmacy: one(product_prices, {
		fields: [stock_pharmacies.price_pharmacy],
		references: [product_prices.id],
		relationName: "stock_pharmacies_price_pharmacy_product_prices_id"
	}),
	product_price_price_wholesaler: one(product_prices, {
		fields: [stock_pharmacies.price_wholesaler],
		references: [product_prices.id],
		relationName: "stock_pharmacies_price_wholesaler_product_prices_id"
	}),
	product: one(products, {
		fields: [stock_pharmacies.product_id],
		references: [products.id]
	}),
	user: one(users, {
		fields: [stock_pharmacies.user_id],
		references: [users.id]
	}),
}));

export const sub_qualificationsRelations = relations(sub_qualifications, ({one, many}) => ({
	qualification: one(qualifications, {
		fields: [sub_qualifications.qualifications_id],
		references: [qualifications.id]
	}),
	user_qualifications: many(user_qualifications),
}));

export const qualificationsRelations = relations(qualifications, ({many}) => ({
	sub_qualifications: many(sub_qualifications),
	user_qualifications: many(user_qualifications),
}));

export const user_qualificationsRelations = relations(user_qualifications, ({one}) => ({
	qualification: one(qualifications, {
		fields: [user_qualifications.qualification_id],
		references: [qualifications.id]
	}),
	sub_qualification: one(sub_qualifications, {
		fields: [user_qualifications.sub_qualification_id],
		references: [sub_qualifications.id]
	}),
	user: one(users, {
		fields: [user_qualifications.user_id],
		references: [users.id]
	}),
}));

export const warning_itemsRelations = relations(warning_items, ({one}) => ({
	molecule: one(molecules, {
		fields: [warning_items.molecule_id],
		references: [molecules.id]
	}),
	product: one(products, {
		fields: [warning_items.product_id],
		references: [products.id]
	}),
	warnings_for_us: one(warnings_for_uses, {
		fields: [warning_items.warnings_for_use_id],
		references: [warnings_for_uses.id]
	}),
}));

export const warnings_for_usesRelations = relations(warnings_for_uses, ({many}) => ({
	warning_items: many(warning_items),
}));
