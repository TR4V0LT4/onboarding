CREATE TABLE `about_medindex` (
	`id` char(36) NOT NULL,
	`title` varchar(255),
	`description` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `about_medindex_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `achats` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `achats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `actualite_like` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`actualite_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `actualite_like_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `actualities` (
	`id` char(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`produit_id` char(36),
	`image` varchar(255),
	`updated_by` char(36),
	`created_by` char(36),
	`status` tinyint NOT NULL DEFAULT 1,
	`end_date` date,
	`start_date` date,
	`libelle` text,
	`type` text,
	`source` text,
	`link` text,
	`preview` text,
	`logo` text,
	`image_web` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `actualities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `actualities_destinations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`destinations_id` int NOT NULL,
	`actualities_id` char(36) NOT NULL,
	CONSTRAINT `actualities_destinations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_menu` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int NOT NULL DEFAULT 0,
	`order` int NOT NULL DEFAULT 0,
	`title` varchar(50) NOT NULL,
	`icon` varchar(50) NOT NULL,
	`uri` varchar(191),
	`permission` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_menu_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_operation_log` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`path` varchar(191) NOT NULL,
	`method` varchar(10) NOT NULL,
	`ip` varchar(191) NOT NULL,
	`input` text NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_operation_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_permissions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`slug` varchar(50) NOT NULL,
	`http_method` varchar(191),
	`http_path` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_permissions_name_unique` UNIQUE(`name`),
	CONSTRAINT `admin_permissions_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `admin_role_menu` (
	`my_row_id` bigint unsigned NOT NULL,
	`role_id` int NOT NULL,
	`menu_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_role_menu_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `admin_role_permissions` (
	`my_row_id` bigint unsigned NOT NULL,
	`role_id` int NOT NULL,
	`permission_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_role_permissions_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `admin_role_users` (
	`my_row_id` bigint unsigned NOT NULL,
	`role_id` int NOT NULL,
	`user_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_role_users_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `admin_roles` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`slug` varchar(50) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_roles_name_unique` UNIQUE(`name`),
	CONSTRAINT `admin_roles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `admin_user_permissions` (
	`my_row_id` bigint unsigned NOT NULL,
	`user_id` char(36) NOT NULL,
	`permission_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_user_permissions_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `admin_users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`username` varchar(190) NOT NULL,
	`password` varchar(60) NOT NULL,
	`name` varchar(191) NOT NULL,
	`avatar` varchar(191),
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `adverse_effects` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`pathology_id` char(36),
	`molecule_id` char(36),
	`system_adverse_effect_id` char(36),
	`type` text,
	`frequency` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`product_id` char(36),
	CONSTRAINT `adverse_effects_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `affectationroles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36),
	`cree_par` char(36),
	`id_action` bigint,
	`state` int DEFAULT 0,
	`pharmacy_id` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `affectationroles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `agenda` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`titre` varchar(191) NOT NULL,
	`jour` date NOT NULL,
	`description` text NOT NULL,
	`event_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `agenda_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ages` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `ages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alt_ids_company` (
	`id` char(36) NOT NULL,
	`company_id` char(36) NOT NULL,
	`type` varchar(255),
	`value` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `alt_ids_company_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alt_name_suppliers` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`supplier_id` char(36),
	`name` text,
	`referrer_type` enum('blink','sobrus'),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `alt_name_suppliers_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `alt_name_wholesalers` (
	`id` char(36) NOT NULL,
	`wholesaler_id` char(36),
	`name` text,
	`referrer_type` enum('blink','sobrus','sentence_similarity') DEFAULT 'sentence_similarity',
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `alt_name_wholesalers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alt_names` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`name` varchar(255),
	`country_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`company_id` char(36),
	`referrer_type` enum('direct partner','integration partner','lab','wholesaler','sobrus','ANAM'),
	`source` text,
	CONSTRAINT `alt_names_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alt_products` (
	`id` char(36) NOT NULL,
	`name` text NOT NULL,
	`source` text,
	`code_bar` text,
	`presentation` text,
	`description` text,
	`nfc_code` text,
	`atc_code` text,
	`is_generic` tinyint,
	`pph` double(8,2),
	`ppgro` double(8,2),
	`ppv` double(8,2),
	`ph` double(8,2),
	`tva` double(8,2),
	`molecule` text,
	`laboratory` text,
	`dosage` varchar(191),
	`unit` text,
	`brand_name` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`code_product` text,
	`wholesaler_id` char(36),
	`ppvr` double(8,2),
	`phr` double(8,2),
	`type_med` text,
	`classe_therapeutique` text,
	`check` tinyint DEFAULT 0,
	`table` text,
	`remboursement` tinyint,
	CONSTRAINT `alt_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `animation` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`type` varchar(191),
	`parrainage_id` int,
	`date_debut` datetime,
	`date_fin` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `animation_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `animation_winners` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`animation_id` int,
	`gift_id` int,
	`cms_users_id` char(36),
	`qr_code_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `animation_winners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `answer_zone_labels` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`question_id` int NOT NULL,
	`answer_zone_id` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `answer_zone_labels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `answer_zones` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `answer_zones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `answers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`question_id` int NOT NULL,
	`parent_id` int,
	`name` varchar(191) NOT NULL,
	`is_correct` tinyint NOT NULL DEFAULT 0,
	`position` int,
	`initial_position` int,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`answer_zone_id` int,
	CONSTRAINT `answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `apikeys` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`api_key` varchar(255) NOT NULL,
	`rate_limit` int NOT NULL DEFAULT 60,
	`credit_limit` int NOT NULL DEFAULT 60,
	`request_limit` int NOT NULL DEFAULT 5000,
	`active` tinyint NOT NULL DEFAULT 1,
	`name` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `apikeys_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `app_consultations_log` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` int NOT NULL,
	`consultation_id` int,
	`type` varchar(191),
	`table_name` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `app_consultations_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `associations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`reductions_id` int NOT NULL,
	`element_id` int NOT NULL,
	`packs_id` int,
	`type` varchar(191) NOT NULL,
	`price_min` double(8,2),
	`price_max` double(8,2),
	`qty_min` double(8,2),
	`qty_max` double(8,2),
	`qte_ob` double(8,2),
	`escompte` double(8,2),
	`apply_qty_ob` varchar(191),
	`apply_qty` varchar(191),
	`apply_price` varchar(191),
	CONSTRAINT `associations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `associations_reductions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`associations_id` int NOT NULL,
	`reduction_types_id` int NOT NULL,
	`operator` varchar(191) NOT NULL,
	`products_id` int,
	`value` double(8,2) NOT NULL,
	`price_min` double(8,2),
	`price_max` double(8,2),
	`qty_min` double(8,2),
	`qty_max` double(8,2),
	`qte_ob` double(8,2),
	`apply_qty_ob` varchar(191),
	`apply_qty` varchar(191),
	`apply_price` varchar(191),
	CONSTRAINT `associations_reductions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `atcs` (
	`id` char(36) NOT NULL,
	`name` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`english_label` text,
	`french_label` text,
	CONSTRAINT `atcs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attribute_option_groups` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gift_id` int NOT NULL,
	`attribute_option_id` int NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `attribute_option_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attribute_options` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`attribute_id` int NOT NULL,
	`sort_order` int,
	`name` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `attribute_options_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `attributes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(191) NOT NULL,
	`name` varchar(191),
	`type` varchar(191) NOT NULL,
	`position` int,
	`is_filterable` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `attributes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auto_notifications` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`element` varchar(191) NOT NULL,
	`elements_id` varchar(191) NOT NULL,
	`destination` varchar(191) NOT NULL,
	`date_diffusion` datetime NOT NULL,
	`content` text NOT NULL,
	`statut` tinyint NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `auto_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `avoir_emis` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`fournisseur_id` char(36),
	`creer_par` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`statu` int,
	`state` int DEFAULT 0,
	`reference` varchar(45),
	`pharmacy_id` char(36),
	CONSTRAINT `avoir_emis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `avoir_recus` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`avoiremis_id` bigint NOT NULL,
	`fournisseur_id` char(36),
	`creer_par` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`reference` varchar(45),
	`mode_paiement` int DEFAULT 0,
	`state` tinyint DEFAULT 0,
	`archive` tinyint NOT NULL DEFAULT 0,
	`date_archivage` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `avoir_recus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bl_scan` (
	`id` char(36) NOT NULL,
	`company_id` char(36) NOT NULL,
	`pdf_path` text,
	`scan_json` text,
	`bl_json` text,
	`error_json` text,
	`delivery_id` int NOT NULL,
	`reference` text NOT NULL,
	`wholesaler_id` char(36) NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`status` enum('uploaded','pdf_generated','scanned','converted','erroner','validated') NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`total_rectified` decimal(8,2) DEFAULT '0.00',
	CONSTRAINT `bl_scan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bl_scan_paths` (
	`id` char(36) NOT NULL,
	`bl_scan_id` char(36) NOT NULL,
	`path` varchar(255) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `bl_scan_paths_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blink_generated_grossiste_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `blink_generated_grossiste_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `blink_generated_laboratories_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `blink_generated_laboratories_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `blink_generated_pharmacies_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `blink_generated_pharmacies_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `blink_generated_users_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `blink_generated_users_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `boards` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`name` text,
	`user_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `boards_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `bonlivraisons` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`quantite` int NOT NULL,
	`montant_ht` varchar(255),
	`montant_TTC` varchar(255) NOT NULL,
	`montant_PU` varchar(255) NOT NULL,
	`TVA` varchar(255) NOT NULL,
	`remise` varchar(255),
	`etat` varchar(255) NOT NULL,
	`fournisseurs_id` char(36) NOT NULL,
	`commandes_id` varchar(255),
	`ecart_qte_total` varchar(255) NOT NULL,
	`ecart_prix_total` varchar(255) NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`created_at` datetime,
	`updated_at` datetime,
	`date_bonlivraison` datetime,
	`creer_par` char(36),
	`total_rectifier` decimal(10,2),
	`state` int DEFAULT 1,
	`archive` tinyint NOT NULL DEFAULT 0,
	`date_archivage` timestamp,
	`credit` double(10,2),
	`montant_payé` double(10,2) NOT NULL,
	`etat_paiement` int NOT NULL,
	`qte_update` int DEFAULT 0,
	`reference` varchar(45) NOT NULL,
	`type_remise` int DEFAULT -1,
	`pharmacy_id` char(36),
	CONSTRAINT `bonlivraisons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `caisse` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36) NOT NULL,
	`premier_vente_id` int,
	`dernier_vente_id` int,
	`montant_sys` int,
	`montant_caisse` int,
	`gane` int,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `caisse_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `caisses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36) NOT NULL,
	`premier_vente_id` int,
	`dernier_vente_id` int,
	`montant_sys` double(10,2),
	`montant_caisse` double(10,2),
	`gane` int,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`commentaire` varchar(222),
	`derniere_alimentation_id` int,
	`dernier_retour_vente_id` int,
	`total_espèce` double(10,2) NOT NULL,
	`total_lettre_change` double(10,2) NOT NULL,
	`total_carte_bancaire` double(10,2) NOT NULL,
	`total_chéque` double(10,2) NOT NULL,
	`premiere_alimentation_id` int,
	`premier_retourvente_id` int,
	`montant_démarrage` double(10,2) NOT NULL,
	`reference` varchar(45),
	`pharmacy_id` char(36),
	CONSTRAINT `caisses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calendars` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`comment` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
	`updated_at` timestamp,
	`user_id` char(36) NOT NULL,
	`deleted_at` timestamp,
	CONSTRAINT `calendars_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cart_lignes` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`carts_id` int NOT NULL,
	`offers_id` int NOT NULL,
	`packs_id` int NOT NULL,
	`products_id` int NOT NULL,
	`qty` int NOT NULL,
	`price` int NOT NULL,
	`remise_type` int,
	`remise_value` int,
	`remise_product` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cart_lignes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `carts` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`total_offers` int NOT NULL DEFAULT 0,
	`total_products` int NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cgu_histories` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`cgu_id` bigint unsigned NOT NULL,
	`accepted` tinyint DEFAULT 0,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cgu_histories_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `check_products` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`check_product_lab` tinyint DEFAULT 0,
	`check_name` tinyint DEFAULT 0,
	`check_description` tinyint DEFAULT 0,
	`check_presentation` tinyint DEFAULT 0,
	`check_atc_code` tinyint DEFAULT 0,
	`check_nfc_code` tinyint DEFAULT 0,
	`check_brand_name` tinyint DEFAULT 0,
	`check_pharmacy_id` tinyint DEFAULT 0,
	`check_reimbursable` tinyint DEFAULT 0,
	`check_source` tinyint DEFAULT 0,
	`check_codes` tinyint DEFAULT 0,
	`check_prices` tinyint DEFAULT 0,
	`check_categories` tinyint DEFAULT 0,
	`check_molecules` tinyint DEFAULT 0,
	`check_active` tinyint DEFAULT 0,
	`product_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`is_active_product_lab` tinyint DEFAULT 0,
	`is_active_name` tinyint DEFAULT 0,
	`is_active_description` tinyint DEFAULT 0,
	`is_active_presentation` tinyint DEFAULT 0,
	`is_active_atc_code` tinyint DEFAULT 0,
	`is_active_nfc_code` tinyint DEFAULT 0,
	`is_active_brand_name` tinyint DEFAULT 0,
	`is_active_pharmacy_id` tinyint DEFAULT 0,
	`is_active_reimbursable` tinyint DEFAULT 0,
	`is_active_source` tinyint DEFAULT 0,
	`is_active_codes` tinyint DEFAULT 0,
	`is_active_prices` tinyint DEFAULT 0,
	`is_active_categories` tinyint DEFAULT 0,
	`is_active_molecules` tinyint DEFAULT 0,
	`is_active_active` tinyint DEFAULT 0,
	CONSTRAINT `check_products_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` char(36) NOT NULL,
	`country_id` char(36) NOT NULL,
	`region_id` bigint,
	`name` varchar(255) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`pre_id` bigint,
	`cmd_id` bigint,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `classes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `classes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`cin` varchar(255),
	`cnss` varchar(255),
	`type_insurance` varchar(255) DEFAULT 'cnss',
	`email` varchar(255),
	`archive` tinyint NOT NULL DEFAULT 0,
	`type` varchar(255) DEFAULT 'Client régulier',
	`game` varchar(255),
	`tele` varchar(255),
	`ville` char(36),
	`adresse` varchar(255),
	`code_postale` varchar(255),
	`plafan_credit` decimal(10,2) DEFAULT '0.00',
	`organisme` varchar(255),
	`num_immatriculation` varchar(255),
	`num_affiliation` varchar(255),
	`pays` char(36),
	`description` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36),
	`fav` int DEFAULT 0,
	`image` varchar(222),
	`credit` decimal(10,2) NOT NULL DEFAULT '0.00',
	`medecin_tr` varchar(123),
	`modifier_par` char(36),
	`first_name` varchar(255),
	`credit_init` float,
	`sold_init` float,
	`pharmacy_id` char(36),
	`passage` int DEFAULT 0,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cmd_generated_cities_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `cmd_generated_cities_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `cmd_generated_grossiste_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `cmd_generated_grossiste_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `cmd_generated_lab_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `cmd_generated_lab_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `cmd_generated_pharmacy_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `cmd_generated_pharmacy_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `cmd_generated_user_admin_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `cmd_generated_user_admin_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `cmd_generated_user_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `cmd_generated_user_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `cms_apicustom` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`permalink` varchar(191),
	`tabel` varchar(191),
	`aksi` varchar(191),
	`kolom` varchar(191),
	`orderby` varchar(191),
	`sub_query_1` varchar(191),
	`sql_where` varchar(191),
	`nama` varchar(191),
	`keterangan` varchar(191),
	`parameter` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	`method_type` varchar(25),
	`parameters` longtext,
	`responses` longtext,
	CONSTRAINT `cms_apicustom_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_apikey` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`screetkey` varchar(191),
	`hit` int,
	`status` varchar(25) NOT NULL DEFAULT 'active',
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_apikey_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_dashboard` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`id_cms_privileges` int,
	`content` longtext,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_dashboard_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_email_queues` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`send_at` datetime,
	`email_recipient` varchar(191),
	`email_from_email` varchar(191),
	`email_from_name` varchar(191),
	`email_cc_email` varchar(191),
	`email_subject` varchar(191),
	`email_content` text,
	`email_attachments` text,
	`is_sent` tinyint,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_email_queues_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_email_templates` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`slug` varchar(191),
	`subject` varchar(191),
	`content` longtext,
	`description` varchar(191),
	`from_name` varchar(191),
	`from_email` varchar(191),
	`cc_email` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_email_templates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_logs` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`ipaddress` varchar(50),
	`useragent` varchar(191),
	`url` varchar(191),
	`description` varchar(191),
	`details` text,
	`id_cms_users` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_menus` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`type` varchar(191) NOT NULL DEFAULT 'url',
	`path` varchar(191),
	`color` varchar(191),
	`icon` varchar(191),
	`parent_id` int,
	`is_active` tinyint NOT NULL DEFAULT 1,
	`is_dashboard` tinyint NOT NULL DEFAULT 0,
	`id_cms_privileges` int,
	`sorting` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_menus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_menus_privileges` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`id_cms_menus` int,
	`id_cms_privileges` int,
	CONSTRAINT `cms_menus_privileges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_moduls` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`icon` varchar(191),
	`path` varchar(191),
	`table_name` varchar(191),
	`controller` varchar(191),
	`is_protected` tinyint NOT NULL DEFAULT 0,
	`is_active` tinyint NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `cms_moduls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_notifications` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`id_cms_users` int,
	`content` varchar(191),
	`url` varchar(191),
	`is_read` tinyint,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_privileges` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`is_superadmin` tinyint,
	`theme_color` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_privileges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_privileges_roles` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`is_visible` tinyint,
	`is_create` tinyint,
	`is_read` tinyint,
	`is_edit` tinyint,
	`is_delete` tinyint,
	`id_cms_privileges` int,
	`id_cms_moduls` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_privileges_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_settings` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`content` text,
	`content_input_type` varchar(191),
	`dataenum` varchar(191),
	`helper` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	`group_setting` varchar(191),
	`label` varchar(191),
	CONSTRAINT `cms_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_statistic_components` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`id_cms_statistics` int,
	`componentID` varchar(191),
	`component_name` varchar(191),
	`area_name` varchar(55),
	`sorting` int,
	`name` varchar(191),
	`config` longtext,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_statistic_components_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_statistics` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`slug` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `cms_statistics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cms_users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(191),
	`password` varchar(191),
	`id_cms_privileges` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	`status` tinyint DEFAULT 0,
	`company_id` int,
	`company_name` varchar(191),
	`filials_id` int,
	`last_name` varchar(191),
	`first_name` varchar(191),
	`mobile` varchar(191),
	`phone` varchar(191),
	`city` varchar(191),
	`other` text,
	`remember_token` varchar(100),
	`fonctions_id` int,
	`code` varchar(191),
	`verified` tinyint NOT NULL DEFAULT 0,
	`phone_2` varchar(191),
	`titre` varchar(191),
	`is_commercial` varchar(191),
	`device_id` varchar(191),
	`fairebase_token` text,
	`grossistes_id` int,
	`laboratories_id` int,
	`current_connexion` text,
	`codeparrainage` varchar(191),
	`codeparrain` varchar(191),
	`parent_id` varchar(191),
	`operator` varchar(191),
	`old_pharmacy` int,
	`deleted_at` timestamp,
	`email_verified` tinyint DEFAULT 0,
	`reset_password_token` varchar(191),
	`date_inscription_web` datetime,
	`has_app` tinyint DEFAULT 0,
	`qr_code` varchar(252),
	`cgu_version` varchar(255),
	`imported` tinyint,
	CONSTRAINT `cms_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commande_lignes` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`commandes_id` int NOT NULL,
	`packs_id` int NOT NULL,
	`products_id` int NOT NULL,
	`qty` int NOT NULL,
	`price` double NOT NULL,
	`remise_type` int,
	`remise_value` int,
	`remise_product` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	`final_price` double(8,2) NOT NULL,
	`remise_category` int NOT NULL,
	CONSTRAINT `commande_lignes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commande_status` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`position` int DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `commande_status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commande_unitaire_lignes` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`commandes_unitaire_id` int NOT NULL,
	`labo_id` char(36) NOT NULL,
	`grossiste_id` char(36) NOT NULL,
	`products_id` int NOT NULL,
	`qty` int NOT NULL,
	`price` double(8,2) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `commande_unitaire_lignes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commandes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`quantite` int NOT NULL,
	`montant_ht` decimal(10,2) NOT NULL,
	`montant_TTC` varchar(255) NOT NULL,
	`montant_PU` varchar(255) NOT NULL,
	`TVA` varchar(255) NOT NULL,
	`remise` varchar(255) NOT NULL,
	`etat` varchar(255) NOT NULL,
	`fournisseurs_id` char(36) NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36) NOT NULL DEFAULT '7',
	`modifier_par` char(36),
	`state` int DEFAULT 0,
	`reference` varchar(45),
	`pharmacy_id` char(36),
	`type_remise` int DEFAULT -1,
	CONSTRAINT `commandes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commandes_unitaire` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`company_id` int NOT NULL,
	`total_products` int NOT NULL DEFAULT 0,
	`reference` varchar(191) NOT NULL,
	`image_bl` varchar(191) NOT NULL,
	`commande_statuss_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `commandes_unitaire_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commissions` (
	`id` char(36) NOT NULL,
	`company_id` char(36) NOT NULL,
	`evant` varchar(255),
	`rate` decimal(10,2),
	`created_at` timestamp,
	`updated_at` timestamp,
	`created_by` char(36),
	`updated_by` char(36),
	CONSTRAINT `commissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` char(36) NOT NULL,
	`region_id` bigint unsigned,
	`city_id` char(36),
	`sector_id` bigint unsigned,
	`parent_id` char(36),
	`country_id` char(36),
	`pre_pharmacy_id` int,
	`pre_wholesaler_id` int,
	`pre_laboratory_id` int,
	`cmd_pharmacy_id` int,
	`cmd_wholesaler_id` int,
	`cmd_laboratory_id` int,
	`company_status` enum('activated','deleted','pending','demo') NOT NULL DEFAULT 'demo',
	`name` varchar(255),
	`address` text,
	`latitude` decimal(8,5),
	`longitude` decimal(8,5),
	`zip_code` varchar(255),
	`phone` varchar(255),
	`fax` varchar(255),
	`mobile` varchar(255),
	`email` varchar(255),
	`is_premium` tinyint NOT NULL DEFAULT 0,
	`is_demo` tinyint,
	`national_id` varchar(255),
	`company_type` enum('pharmacy','wholesaler','laboratory','partner','blink','other'),
	`header_html` varchar(255),
	`footer_html` varchar(255),
	`logo` varchar(255),
	`brand_name` varchar(255),
	`deleted` tinyint NOT NULL DEFAULT 0,
	`weight` int NOT NULL DEFAULT 0,
	`program_id` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`delivery_note_type_id` bigint unsigned,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `company_services` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`company_type` varchar(191) NOT NULL,
	`company_id` char(36) NOT NULL,
	`service_id` int NOT NULL,
	`stat` tinyint NOT NULL,
	`last_connection` datetime NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `company_services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `company_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `company_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `configs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`type` int,
	`value` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `configs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `confreres` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`firstname` varchar(255),
	`date_naissance` varchar(255),
	`titre` varchar(255),
	`tele` varchar(255),
	`fax` varchar(255),
	`site` varchar(255),
	`adresse` varchar(255),
	`code_postale` varchar(255),
	`ville` char(36),
	`pays` char(36),
	`region` varchar(255),
	`description` varchar(255),
	`email` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36),
	`fav` int DEFAULT 0,
	`image` varchar(222),
	`cin` varchar(123),
	`cnss` varchar(123),
	`credit` decimal(10,2) NOT NULL DEFAULT '0.00',
	`modifier_par` char(36),
	`pharmacy_id` char(36),
	CONSTRAINT `confreres_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contre_indications` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom` varchar(255) NOT NULL,
	`Valeur` varchar(255) NOT NULL,
	`Type` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `contre_indications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `converted_scan` (
	`id` char(36) NOT NULL,
	`scan_id` char(36) NOT NULL,
	`reference` text NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`wholesaler_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `converted_scan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `converted_scan_products` (
	`id` char(36) NOT NULL,
	`converted_scan_id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`name` text NOT NULL,
	`code` bigint NOT NULL,
	`quantity` int NOT NULL,
	`pharmacy_price` double(8,2) NOT NULL,
	`wholesaler_price` double(8,2) NOT NULL,
	`expiry_date` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`tax` double(8,2) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `converted_scan_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `converted_wholesaler` (
	`id` char(36) NOT NULL,
	`wholesaler_id` char(36),
	`name` text,
	`tax_code` text,
	`if` text,
	`rc` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `converted_wholesaler_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `converter_histories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`store_program_id` int NOT NULL,
	`laboratory_id` char(36) NOT NULL,
	`blink_store_program_id` int NOT NULL,
	`user_id` char(36) NOT NULL,
	`points` int NOT NULL DEFAULT 0,
	`converted_points` int NOT NULL DEFAULT 0,
	`blink_points` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `converter_histories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `countercase_consultations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`countercase_id` int NOT NULL,
	`rubric_id` int,
	`user_name` varchar(191),
	`role` varchar(191),
	`pharmacy_name` varchar(191),
	`date` datetime NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `countercase_consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `countercase_rubrics` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`countercase_id` int NOT NULL,
	`rubric_id` int NOT NULL,
	`description` text,
	`stat` varchar(191) NOT NULL DEFAULT '1',
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `countercase_rubrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `countercases` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`description_ar` text,
	`keywords` text,
	`is_current` tinyint NOT NULL DEFAULT 0,
	`stat` varchar(191) NOT NULL DEFAULT '1',
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `countercases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `countries` (
	`id` char(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`abbv` varchar(255) NOT NULL,
	`serviced` tinyint NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `countries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `datepremptionproduits` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`dateperemption` date NOT NULL,
	`produits_id` char(36) NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36),
	`pharmacy_id` char(36),
	CONSTRAINT `datepremptionproduits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dcis` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `dcis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deffaultactions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`cree_par` char(36),
	`id_action` bigint,
	`state` int DEFAULT 0,
	`type` varchar(20),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `deffaultactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `defileur` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`title` varchar(191),
	`content` text,
	`status` tinyint NOT NULL DEFAULT 1,
	`date_start` datetime,
	`date_end` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`logo` varchar(191),
	`show_auth` tinyint DEFAULT 0,
	`position` varchar(191),
	CONSTRAINT `defileur_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `defined_messages` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`ref` varchar(191) NOT NULL,
	`description` text,
	`content` text NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `defined_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `deliveries` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`reference` varchar(191) NOT NULL,
	`order_id` int NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`wholesaler_id` char(36),
	`date` datetime,
	`nb_products` int NOT NULL,
	`total_price_ht` decimal(18,5),
	`total_price_ttc` decimal(18,5),
	`w_total_price_ht` decimal(18,5),
	`w_total_price_ttc` decimal(18,5),
	`tva` decimal(18,5),
	`wallet_amount` decimal(18,5),
	`paid_price_ttc` decimal(18,5),
	`btn_magic` int NOT NULL DEFAULT 0,
	`delivery_file` text,
	`granted` int,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `deliveries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `delivery_datas` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`delivery_id` int NOT NULL,
	`store_program_id` int NOT NULL,
	`level_id` int,
	`promotion_id` int,
	`points` int,
	`level_points` int,
	`discount` decimal(18,5),
	`wallet` decimal(18,5),
	`total_price_ht` decimal(18,5),
	`total_price_ttc` decimal(18,5),
	`w_total_price_ht` decimal(18,5),
	`w_total_price_ttc` decimal(18,5),
	`op1` decimal(18,5),
	`op2` decimal(18,5),
	`accorded_amount` decimal(18,5),
	`rest` decimal(18,5),
	`w_com1` decimal(18,5),
	`w_com2` decimal(18,5),
	`blink_com1` decimal(18,5),
	`blink_com2` decimal(18,5),
	`paid` int,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `delivery_datas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `delivery_details` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`delivery_id` int NOT NULL,
	`product_id` char(36) NOT NULL,
	`store_program_id` int,
	`qty` int NOT NULL DEFAULT 0,
	`magic_qty` int NOT NULL DEFAULT 0,
	`ppv` double(8,2),
	`pph` double(8,2),
	`ppgro` double(8,2),
	`tva` double(8,2),
	`tva_amount` double(8,2) NOT NULL,
	`pph_ht` double(8,2),
	`ppgro_ht` double(8,2),
	`total_pph_ht` decimal(18,5),
	`total_ppgro_ht` decimal(18,5),
	`points` int,
	`level_points` int,
	`level` varchar(191),
	`discount` double(8,2),
	`discount_amount` decimal(18,5),
	`is_suggestion` int NOT NULL DEFAULT 0,
	`parent_id` int,
	`btn_magic` int NOT NULL DEFAULT 0,
	`order` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `delivery_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `delivery_gap` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`date` datetime,
	`quantity_received` int NOT NULL,
	`order_quantity` int NOT NULL,
	`source` varchar(255),
	`product_id` char(36),
	`city_id` char(36),
	`pharmacy_id` char(36),
	`supplier_id` char(36),
	`detail_order_id` bigint unsigned,
	`detail_blscan_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `delivery_gap_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `delivery_note_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `delivery_note_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destination_companies` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`destinations_id` int NOT NULL,
	`types_id` int NOT NULL,
	`companies_id` int,
	`cms_users_id` char(36),
	`cms_privileges_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `destination_companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destination_locations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`destinations_id` int NOT NULL,
	`regions_id` int NOT NULL,
	`cities_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`secteurs_id` int,
	CONSTRAINT `destination_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destinations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`type` int NOT NULL DEFAULT 1,
	CONSTRAINT `destinations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destinations_cities` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cities_id` int NOT NULL,
	`destinations_id` int NOT NULL,
	CONSTRAINT `destinations_cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destinations_cms_privileges` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_privileges_id` int NOT NULL,
	`destinations_id` int NOT NULL,
	CONSTRAINT `destinations_cms_privileges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `destinations_regions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`regions_id` int NOT NULL,
	`destinations_id` int NOT NULL,
	CONSTRAINT `destinations_regions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `details_avoir_emis` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`avoiremis_id` bigint unsigned,
	`produit_id` char(36),
	`qte` int,
	`prix` decimal(10,2),
	`tax_rate` int DEFAULT 0,
	`statu` int,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`raison` int,
	`etat_modife` int DEFAULT 0,
	`pharmacy_id` char(36),
	CONSTRAINT `details_avoir_emis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `details_avoir_recus` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`avoirrecu_id` bigint unsigned,
	`produit_id` char(36),
	`qte` int,
	`prix` decimal(10,2),
	`tax_rate` int DEFAULT 0,
	`statu` int,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`raison` int,
	`etat_modife` int DEFAULT 0,
	`pharmacy_id` char(36),
	CONSTRAINT `details_avoir_recus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devis` (
	`id` int AUTO_INCREMENT NOT NULL,
	`client_id` int,
	`status` varchar(22),
	`reference` varchar(222),
	`creer_par` char(36),
	`montant_PPV` decimal(10,2),
	`montant_PU` decimal(10,2),
	`qte_total` int NOT NULL DEFAULT 0,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `devis_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `devisproduits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`devis_id` varchar(222),
	`produit_id` char(36),
	`quantite` int,
	`prix_unitaire` varchar(222),
	`PPV_app` varchar(123) NOT NULL,
	`PPH_app` varchar(123) NOT NULL,
	`tax_rate` int DEFAULT 0,
	`deleted_at` datetime,
	`created_at` datetime,
	`updated_at` datetime,
	`type_remise` int,
	`pharmacy_id` char(36),
	CONSTRAINT `devisproduits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `diffusions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`offers_id` int NOT NULL,
	`grossistes_groups_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `diffusions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drug_interactions` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`name` text,
	`risks_mechanisms` text,
	`course_of_action` text,
	`niveau_gravite` text,
	`severity_level` text,
	`molecule_id` char(36),
	`country_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`product_id` char(36),
	`second_molecule_id` char(36),
	CONSTRAINT `drug_interactions_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `duplicate_products` (
	`id` char(36) NOT NULL,
	`produit_id` int,
	`name` varchar(255) NOT NULL,
	`image` varchar(255),
	`code_bare` varchar(255),
	`code_bare2` varchar(255),
	`laboratoire` char(36),
	`gamme` varchar(255),
	`types_id` bigint unsigned,
	`classes_id` bigint unsigned,
	`forms_id` bigint unsigned,
	`dcis_id` bigint unsigned,
	`sous_gamme` varchar(255),
	`produit_tableau` varchar(255),
	`prescription` varchar(255),
	`produit_marche` varchar(255),
	`PPH` decimal(9,2),
	`PPV` decimal(9,2) NOT NULL,
	`TVA` varchar(255),
	`TVA_vente` varchar(255),
	`remboursable` varchar(255),
	`présentation` varchar(255),
	`excipient` varchar(255),
	`posologie_adult` varchar(255),
	`posologie_enfant` varchar(255),
	`indications` varchar(255),
	`contre_indication_conduit` varchar(255),
	`contre_indication_monograph` varchar(255),
	`contre_indication_grossesse` varchar(255),
	`reference_labo_produit` varchar(255),
	`description` varchar(255),
	`conditionnement` varchar(255),
	`monograph` varchar(255),
	`deleted_at` timestamp,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`active` int NOT NULL DEFAULT 1,
	`PPV_prix` decimal(9,2) NOT NULL,
	`PPH_prix` decimal(9,2),
	`date_peremption` date,
	`quantite` int NOT NULL DEFAULT 0,
	`creer_par` char(36),
	`quantite_disponible` int,
	`zone` int NOT NULL DEFAULT 1,
	`inventaires_id` bigint unsigned NOT NULL,
	`modifier_par` char(36),
	`nomberAction` int NOT NULL DEFAULT 0,
	`stok_min` int,
	`stok_max` int,
	`nature_id` bigint unsigned,
	`atc_id` bigint unsigned,
	`mode_id` bigint unsigned,
	`pharmacy_id` char(36),
	CONSTRAINT `duplicate_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `dynamic_blocs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`title` varchar(191),
	`action_title` varchar(191),
	`number` int,
	`icone` text,
	`link` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `dynamic_blocs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `emails` (
	`name` varchar(510),
	`email` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `emploidetemps` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`jour` varchar(255) NOT NULL,
	`debut1` time,
	`debut2` time,
	`fin1` time,
	`fin2` time,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` datetime,
	CONSTRAINT `emploidetemps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`titre` varchar(191) NOT NULL,
	`description` text NOT NULL,
	`date_debut` date NOT NULL,
	`date_fin` date NOT NULL,
	`status` tinyint NOT NULL,
	`event_type_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	`image` varchar(191),
	`logo` varchar(191),
	CONSTRAINT `event_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event_lignes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`event_id` int,
	`date` date,
	`hour_start` varchar(191),
	`hour_end` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `event_lignes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event_type` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`titre` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `event_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`laboratory_id` char(36),
	`date_start` date,
	`date_end` date,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `failed_jobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`uuid` varchar(255) NOT NULL,
	`connection` text NOT NULL,
	`queue` text NOT NULL,
	`payload` longtext NOT NULL,
	`exception` longtext NOT NULL,
	`failed_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `failed_jobs_id` PRIMARY KEY(`id`),
	CONSTRAINT `failed_jobs_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `favoris` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36) NOT NULL,
	`nom` varchar(255),
	`url` varchar(255),
	`ref` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`state` int,
	`icon` varchar(45) DEFAULT 'bi bi-grid',
	`is_default` int DEFAULT 0,
	CONSTRAINT `favoris_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorite_wholesalers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`wholesaler_id` char(36) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `favorite_wholesalers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `field_matches` (
	`id` char(36) NOT NULL,
	`field_name` text,
	`matched` tinyint,
	`product_id` char(36),
	`alt_product_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `field_matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `filecsvimporters` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`file_name` varchar(255) NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`creer_par` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `filecsvimporters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `filials` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`company_id` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`city` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `filials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fonctions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`organisms_id` int NOT NULL,
	CONSTRAINT `fonctions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `forms` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36) NOT NULL,
	CONSTRAINT `forms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fournisseurs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`image` varchar(255),
	`email` varchar(255),
	`site` varchar(255),
	`fax` varchar(255),
	`tele` varchar(255),
	`ville` char(36),
	`adresse` varchar(255),
	`code_postale` varchar(255),
	`description` varchar(255),
	`pays` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36),
	`fav` int DEFAULT 0,
	`modifier_par` char(36),
	`credit` decimal(10,2) DEFAULT '0.00',
	`pharmacy_id` char(36),
	CONSTRAINT `fournisseurs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gammes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36),
	`nom` varchar(255),
	`adresse` varchar(255),
	`email` varchar(255),
	`tele` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `gammes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gardes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom` varchar(255) NOT NULL,
	`Date_debut` date,
	`Date_fin` date,
	`debut1` time,
	`debut2` time,
	`fin1` time,
	`fin2` time,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `gardes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `general_conditions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`version` varchar(191) NOT NULL,
	`name` varchar(191),
	`is_current` tinyint NOT NULL,
	`type` varchar(191),
	`content` text NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `general_conditions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`image` varchar(191),
	`percentage` int,
	`qr_code` varchar(191),
	`point_id` int,
	`gift_type_id` int,
	`qty` int,
	`rest` int,
	`animation` varchar(191),
	`date_debut` datetime,
	`date_fin` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `gift_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_attribute_values` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gift_id` int NOT NULL,
	`attribute_id` int NOT NULL,
	`attribute_option_group_id` int NOT NULL,
	`price` decimal(18,5),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_attribute_values_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_cart_attributes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gift_cart_id` int,
	`gift_attribute_value_id` int,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_cart_attributes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_carts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gift_id` int NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`gift_attribute_value_id` int,
	`date` timestamp NOT NULL DEFAULT (now()),
	`qty` int NOT NULL,
	`price` decimal(18,5),
	`total_shiping` decimal(18,5),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_order_details` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gift_order_id` int NOT NULL,
	`gift_id` int NOT NULL,
	`qty` int NOT NULL DEFAULT 0,
	`price` decimal(18,5),
	`tva` decimal(18,5),
	`price_ht` decimal(18,5),
	`total_price_ht` decimal(18,5),
	`order` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`tva_amount` decimal(18,5),
	CONSTRAINT `gift_order_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_order_status_histories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gift_order_id` int,
	`gift_order_status_id` int,
	`date` timestamp NOT NULL DEFAULT (now()),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_order_status_histories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_order_statuses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_order_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_order_wallets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`gift_order_id` int NOT NULL,
	`store_program_id` int NOT NULL,
	`amount` decimal(18,5),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_order_wallets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_orders` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`reference` varchar(191) NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`gift_order_status_id` int NOT NULL DEFAULT 1,
	`date` timestamp NOT NULL DEFAULT (now()),
	`nb_gifts` int NOT NULL,
	`total_price_ht` decimal(18,5),
	`total_price_ttc` decimal(18,5),
	`tva` decimal(18,5),
	`card_amount` decimal(18,5),
	`wallet_amount` decimal(18,5),
	`paid_price_ttc` decimal(18,5),
	`total_shiping` decimal(18,5),
	`cancel_reason` text,
	`canceled_at` timestamp,
	`opened_at` timestamp,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_reminders` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36),
	`program_id` int,
	`gift_id` int,
	`points` int,
	`gift_points` int,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_reminders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_stats` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `gift_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_type` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `gift_type_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gifts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`program_id` int NOT NULL,
	`role_id` int NOT NULL,
	`level_id` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`short_description` text,
	`description` text,
	`composition` text,
	`shipping` text,
	`price` double(8,2) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`status` int NOT NULL DEFAULT 0,
	CONSTRAINT `gifts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossiste_filiales` (
	`id` int unsigned NOT NULL DEFAULT 0,
	`company_id` int,
	`name` varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `grossiste_laboratories` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`grossistes_id` char(36) NOT NULL,
	`laboratories_id` char(36) NOT NULL,
	`diffusion` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `grossiste_laboratories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossiste_locations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`grossistes_id` char(36) NOT NULL,
	`regions_id` int NOT NULL,
	`cities_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`secteurs_id` int,
	CONSTRAINT `grossiste_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossiste_offers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`grossistes_id` char(36) NOT NULL,
	`offers_id` int NOT NULL,
	`diffusion` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `grossiste_offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossiste_types` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `grossiste_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossistes` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`logo` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`logo2` text,
	`grossiste_types_id` int NOT NULL,
	`grossistes_id` int,
	`weight` int NOT NULL DEFAULT 0,
	`btn_commande` tinyint NOT NULL DEFAULT 1,
	`code` varchar(191),
	`address` text,
	`web` varchar(191),
	`phone` varchar(191),
	`fax` varchar(191),
	`email` varchar(191),
	`cu_status` tinyint NOT NULL DEFAULT 0,
	`deleted_at` timestamp,
	CONSTRAINT `grossistes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossistes_groups` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`saved` tinyint NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `grossistes_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossistes_groups_grossistes` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`grossistes_groups` int NOT NULL,
	`company_id` int NOT NULL,
	`filials_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `grossistes_groups_grossistes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grossistes_weight` (
	`grossistes_id` int unsigned NOT NULL DEFAULT 0,
	`position` varchar(11),
	`ordre` decimal(14,4)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` char(36) NOT NULL,
	`name` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hint_steps` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` bigint unsigned NOT NULL,
	`hint_id` int NOT NULL,
	`title` varchar(191),
	`sub_title` varchar(191),
	`description` text,
	`image` text,
	`element` varchar(191),
	`position` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `hint_steps_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `hints` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` bigint unsigned NOT NULL,
	`name` varchar(191) NOT NULL,
	`url` text NOT NULL,
	`type` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `hints_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`path` text NOT NULL,
	`reference` varchar(191) NOT NULL,
	`imageable_id` int NOT NULL,
	`imageable_type` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `indications` (
	`id` char(36) NOT NULL,
	`molecule_id` char(36) NOT NULL,
	`pathology_id` char(36) NOT NULL,
	`text` text,
	`is_contra` tinyint DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`level_severity` text,
	`product_id` char(36),
	CONSTRAINT `indications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `information_cheques` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`vente_id` bigint,
	`numero_cheque` bigint,
	`date_echeance` datetime,
	`banque` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`nom_emetteur` varchar(255),
	`pharmacy_id` char(36),
	CONSTRAINT `information_cheques_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `insurance_classifications` (
	`id` char(36) NOT NULL,
	`type` int,
	`label` varchar(255),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `insurance_classifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `internal_links` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`route` varchar(191) NOT NULL,
	`route_2` varchar(250),
	`table` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `internal_links_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inventaires` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`nom` varchar(255) NOT NULL,
	`users_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`commentaire` varchar(222),
	`date_inventaire` timestamp,
	`deleted_at` timestamp,
	`creer_par` char(36) NOT NULL,
	`statut` int NOT NULL DEFAULT 0,
	`type_inventaire` int DEFAULT 0,
	`pharmacy_id` char(36),
	`zone_id` int,
	`archive` tinyint NOT NULL DEFAULT 0,
	`date_archivage` timestamp,
	CONSTRAINT `inventaires_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inventdetails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`invent_id` int NOT NULL,
	`produit_id` char(36) NOT NULL,
	`nom` mediumtext,
	`qte_sys` int DEFAULT 0,
	`qte_phys` int NOT NULL,
	`creer_par` char(36) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`ppv` double NOT NULL,
	`ecart` int NOT NULL,
	`commentaire` varchar(22),
	`PPH` varchar(222) NOT NULL,
	`statut` int DEFAULT 0,
	`pharmacy_id` char(36),
	`zone_id` int,
	CONSTRAINT `inventdetails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`queue` varchar(191) NOT NULL,
	`payload` longtext NOT NULL,
	`attempts` tinyint NOT NULL,
	`reserved_at` int unsigned,
	`available_at` int unsigned NOT NULL,
	`created_at` int unsigned NOT NULL,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_offer_conditions` (
	`id` char(36) NOT NULL,
	`type` enum('product','pack') NOT NULL DEFAULT 'product',
	`lab_pack_id` char(36),
	`lab_product_id` char(36),
	`measurement` enum('qty','value','max_qty') NOT NULL DEFAULT 'qty',
	`value` decimal(8,2),
	`reward_type` enum('discount','qty','value'),
	`reward` decimal(8,2),
	`reward_product_id` char(36),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `lab_offer_conditions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_offers` (
	`id` char(36) NOT NULL,
	`lab_id` char(36) NOT NULL,
	`name` text,
	`description` text,
	`start_date` datetime,
	`end_date` datetime,
	`active` tinyint NOT NULL DEFAULT 0,
	`direct` tinyint NOT NULL DEFAULT 0,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `lab_offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_order_details` (
	`id` char(36) NOT NULL,
	`lab_order_id` char(36) NOT NULL,
	`pack_product_id` char(36) NOT NULL,
	`price` decimal(8,2) NOT NULL DEFAULT '0.00',
	`old_price` double(10,2),
	`quantity` decimal(8,2) NOT NULL DEFAULT '0.00',
	`total` decimal(8,2) NOT NULL DEFAULT '0.00',
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`lab_pack_id` char(36),
	`total_before_discount` decimal(8,2) NOT NULL DEFAULT '0.00',
	`total_discount` decimal(8,2) NOT NULL DEFAULT '0.00',
	CONSTRAINT `lab_order_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_orders` (
	`id` char(36) NOT NULL,
	`offer_id` char(36) NOT NULL,
	`wholesaler_id` char(36),
	`company_id` char(36) NOT NULL,
	`status` enum('draft','cart','ordered','processed','canceled','delivered') NOT NULL DEFAULT 'draft',
	`order_id` bigint unsigned,
	`total_order` decimal(8,2) NOT NULL DEFAULT '0.00',
	`total_saved` decimal(8,2) NOT NULL DEFAULT '0.00',
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`state_json` text,
	`total_before_discount` decimal(8,2) NOT NULL DEFAULT '0.00',
	`total_discount` decimal(8,2) NOT NULL DEFAULT '0.00',
	`direct` tinyint NOT NULL DEFAULT 0,
	`bl_scan_id` char(36),
	CONSTRAINT `lab_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_pack_products` (
	`id` char(36) NOT NULL,
	`lab_pack_id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `lab_pack_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_pack_wholesalers` (
	`id` char(36) NOT NULL,
	`lab_pack_id` char(36) NOT NULL,
	`wholesaler_id` char(36) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `lab_pack_wholesalers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lab_packs` (
	`id` char(36) NOT NULL,
	`lab_offer_id` char(36) NOT NULL,
	`name` text,
	`description` text,
	`active` tinyint NOT NULL DEFAULT 0,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `lab_packs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laboratoires` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36),
	`nom` varchar(255),
	`adresse` varchar(255),
	`email` varchar(255),
	`tele` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `laboratoires_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laboratories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_type_id` int NOT NULL,
	`parent_id` int,
	`suggestion_id` int,
	`name` varchar(191) NOT NULL,
	`brand` varchar(191),
	`address` text,
	`email` varchar(191),
	`phone` varchar(191),
	`fax` varchar(191),
	`website` varchar(191),
	`user_id` char(36),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`program_id` tinyint,
	CONSTRAINT `laboratories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laboratories_weight` (
	`laboratories_id` char(36) NOT NULL,
	`position` varchar(11),
	`ordre` decimal(14,4)
);
--> statement-breakpoint
CREATE TABLE `laboratory_balance_details` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`balance_id` int NOT NULL,
	`amount` decimal(18,5) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `laboratory_balance_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laboratory_balances` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_id` char(36) NOT NULL,
	`balance` decimal(18,5) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `laboratory_balances_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laboratory_locations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`laboratories_id` char(36) NOT NULL,
	`regions_id` int NOT NULL,
	`cities_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`secteurs_id` int,
	CONSTRAINT `laboratory_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laboratory_suggestions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_type_id` int NOT NULL,
	`parent_id` int,
	`name` varchar(191) NOT NULL,
	`status` tinyint NOT NULL DEFAULT 0,
	`brand` varchar(191),
	`address` text,
	`email` varchar(191),
	`phone` varchar(191),
	`fax` varchar(191),
	`website` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `laboratory_suggestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `laboratory_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `laboratory_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `levels` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`color` varchar(191),
	`min_amount` int NOT NULL,
	`discount` double(8,2) NOT NULL,
	`points` int NOT NULL,
	`is_premium` tinyint NOT NULL,
	`duration` int NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `levels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `licences` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`pharmacy_token` varchar(191) NOT NULL,
	`ice` varchar(191) NOT NULL,
	`key` text NOT NULL,
	`duration` int NOT NULL,
	`date_start` datetime,
	`date_end` datetime,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `licences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `listepages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `listepages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `log_actualities` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`actuality_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `log_actualities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `log_carts` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` int NOT NULL,
	`offers_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `log_carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `log_commandes` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` int NOT NULL,
	`offers_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `log_commandes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `log_consultations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` int NOT NULL,
	`offers_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `log_consultations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `log_simulations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` int NOT NULL,
	`offers_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `log_simulations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_company_wallets` (
	`id` char(36) NOT NULL,
	`pharmacy_id` char(36),
	`program_id` char(36),
	`value` double(10,2),
	`expired_at` datetime,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `loyalty_company_wallets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_orders` (
	`id` char(36) NOT NULL,
	`pharmacy_id` char(36),
	`company_id` char(36),
	`product_id` char(36),
	`qty` bigint,
	`price` double(10,2),
	`total` double(10,2),
	`discounted_total` double(10,2),
	`cash_back` double(10,2),
	`is_paid` tinyint NOT NULL DEFAULT 0,
	`order_line_id` bigint unsigned,
	`delivery_line_id` bigint unsigned,
	`source_type` enum('delivery_notes','orders') NOT NULL DEFAULT 'orders',
	`program_id` char(36),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `loyalty_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_product_program` (
	`id` char(36) NOT NULL,
	`product_id` char(36),
	`program_id` char(36),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `loyalty_product_program_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_programs` (
	`id` char(36) NOT NULL,
	`name` varchar(255),
	`company_id` char(36) NOT NULL,
	`start_date` datetime,
	`end_date` datetime,
	`active` tinyint NOT NULL DEFAULT 0,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`general_condition_id` bigint unsigned,
	CONSTRAINT `loyalty_programs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loyalty_user_program` (
	`id` char(36) NOT NULL,
	`program_id` char(36),
	`pharmacy_id` char(36),
	`registration_status` tinyint NOT NULL DEFAULT 0,
	`registered_at` datetime,
	`unregistered_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
	`cgu_accepted` tinyint NOT NULL DEFAULT 0,
	`cgu_accepted_at` datetime,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`program_tier_id` char(36),
	CONSTRAINT `loyalty_user_program_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `manager_alerts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36),
	`pharmacy_id` char(36),
	`name` varchar(191),
	`phone` varchar(191),
	`email` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`status` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `manager_alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matched_lab_order_delivery_scan` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`lab_order_id` char(36) NOT NULL,
	`scan_id` char(36) NOT NULL,
	`scanned_product_id` char(36) NOT NULL,
	`matched_product` tinyint NOT NULL DEFAULT 0,
	`matched_quantity` tinyint NOT NULL DEFAULT 0,
	`matched_price` tinyint NOT NULL DEFAULT 0,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `matched_lab_order_delivery_scan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matched_products` (
	`id` char(36) NOT NULL,
	`code_bar` tinyint,
	`presentation` tinyint,
	`description` tinyint,
	`nfc_code` tinyint,
	`atc_code` tinyint,
	`is_generic` tinyint,
	`pph` tinyint,
	`ppgro` tinyint,
	`ppv` tinyint,
	`ph` tinyint,
	`tva` tinyint,
	`molecule` tinyint,
	`laboratory` tinyint,
	`dosage` tinyint,
	`unit` tinyint,
	`brand_name` tinyint,
	`product_id` char(36),
	`alt_product_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`ppvr` tinyint,
	`phr` tinyint,
	`type_med` tinyint,
	`classe_therapeutique` tinyint,
	`remboursement` tinyint,
	`table` tinyint,
	CONSTRAINT `matched_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `migrations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`migration` varchar(255) NOT NULL,
	`batch` int NOT NULL,
	CONSTRAINT `migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `modes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`permissions` text,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `molecule_atcs` (
	`id` char(36) NOT NULL,
	`molecule_id` char(36) NOT NULL,
	`act_code` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `molecule_atcs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `molecule_groups` (
	`id` char(36) NOT NULL,
	`molecule_id` char(36),
	`group_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `molecule_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `molecule_infos` (
	`id` char(36) NOT NULL,
	`title` varchar(191),
	`iupac` varchar(191),
	`synonyms` varchar(191),
	`defined_daily_dose_who` varchar(191),
	`molecule_id` char(36),
	`product_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `molecule_infos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `molecule_posologies` (
	`id` char(36) NOT NULL,
	`content` text,
	`molecule_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `molecule_posologies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `molecules` (
	`id` char(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`abbv` varchar(255),
	`type` enum('active','excipients') NOT NULL DEFAULT 'active',
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`link_vidal` text,
	`check` tinyint DEFAULT 0,
	`check_completed` tinyint DEFAULT 0,
	`rmm` text,
	`global_update` tinyint DEFAULT 0,
	`breastfeeding_risk` varchar(191),
	`med_index` tinyint DEFAULT 1,
	CONSTRAINT `molecules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `natures` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `natures_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_sendings` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`notification_id` int,
	`notification_type` varchar(191),
	`content` text,
	`link` text,
	`sending_date` timestamp,
	`sending_stat` int NOT NULL DEFAULT 0,
	`reading_date` timestamp,
	`reading_stat` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`errors` text,
	CONSTRAINT `notification_sendings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_stats` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `notification_stats_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_statuses` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `notification_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_system_details` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`system_notification_id` bigint unsigned NOT NULL,
	`element` text NOT NULL,
	`extra` text NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `notification_system_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notification_targets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`notification_id` int NOT NULL,
	`target_id` int NOT NULL,
	`nbr_users` int,
	`users` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `notification_targets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_id` char(36),
	`name` varchar(191),
	`content` text NOT NULL,
	`link` text,
	`sending_date` datetime NOT NULL,
	`notification_stat_id` int NOT NULL,
	`type_notification_id` int NOT NULL DEFAULT 1,
	`phone_numbers` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`lien_externe` text,
	`internal_links_id` int,
	`element` text,
	`users_id` char(36),
	`extra_params` text,
	`target_app` enum('blink','fidelis') NOT NULL DEFAULT 'fidelis',
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications_cms_users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` int NOT NULL,
	`notifications_id` int NOT NULL,
	`date_diffusion` datetime NOT NULL,
	`is_read` tinyint NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `notifications_cms_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications_destinations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`destinations_id` int NOT NULL,
	`notifications_id` int NOT NULL,
	CONSTRAINT `notifications_destinations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_access_tokens` (
	`id` varchar(100) NOT NULL,
	`user_id` char(36),
	`client_id` char(36) NOT NULL,
	`name` varchar(191),
	`scopes` text,
	`revoked` tinyint NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`expires_at` datetime,
	CONSTRAINT `oauth_access_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_auth_codes` (
	`id` varchar(100) NOT NULL,
	`user_id` char(36) NOT NULL,
	`client_id` char(36) NOT NULL,
	`scopes` text,
	`revoked` tinyint NOT NULL,
	`expires_at` datetime,
	CONSTRAINT `oauth_auth_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_clients` (
	`id` char(36) NOT NULL,
	`user_id` char(36),
	`name` varchar(191) NOT NULL,
	`secret` varchar(100),
	`provider` varchar(191),
	`redirect` text NOT NULL,
	`personal_access_client` tinyint NOT NULL,
	`password_client` tinyint NOT NULL,
	`revoked` tinyint NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `oauth_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_personal_access_clients` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`client_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `oauth_personal_access_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `oauth_refresh_tokens` (
	`id` varchar(100) NOT NULL,
	`access_token_id` varchar(100) NOT NULL,
	`revoked` tinyint NOT NULL,
	`expires_at` datetime,
	CONSTRAINT `oauth_refresh_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offer_locations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`offers_id` int NOT NULL,
	`regions_id` int NOT NULL,
	`cities_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	`secteurs_id` int,
	CONSTRAINT `offer_locations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offer_pack` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`offer_id` int NOT NULL,
	`pack_id` int NOT NULL,
	CONSTRAINT `offer_pack_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`label` varchar(191),
	`diffusion` int NOT NULL DEFAULT 1,
	`status` tinyint NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	`date_start` datetime NOT NULL,
	`date_end` datetime NOT NULL,
	`details` text,
	`deleted_at` timestamp,
	`image` varchar(191),
	`has_image` tinyint,
	`is_pricewt` tinyint,
	CONSTRAINT `offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers_cities` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cities_id` char(36) NOT NULL,
	`offers_id` int NOT NULL,
	CONSTRAINT `offers_cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers_cms_privileges` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_privileges_id` int NOT NULL,
	`offers_id` int NOT NULL,
	CONSTRAINT `offers_cms_privileges_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers_destinations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`destinations_id` int NOT NULL,
	`offers_id` int NOT NULL,
	CONSTRAINT `offers_destinations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers_regions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`regions_id` int NOT NULL,
	`offers_id` int NOT NULL,
	CONSTRAINT `offers_regions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `onboard_screens` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`title` varchar(191) NOT NULL,
	`description` text,
	`splash` text,
	`image` text,
	`link` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `onboard_screens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ongoing_offers` (
	`id` char(36) NOT NULL,
	`offer_id` char(36) NOT NULL,
	`company_id` char(36) NOT NULL,
	`start_date` date NOT NULL,
	`end_date` date NOT NULL,
	`active` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `ongoing_offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `operation_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `operation_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_datas` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`store_program_id` int NOT NULL,
	`level_id` int,
	`promotion_id` int,
	`points` int,
	`level_points` int,
	`discount` decimal(18,5),
	`wallet` decimal(18,5),
	`total_price_ht` decimal(18,5),
	`total_price_ttc` decimal(18,5),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `order_datas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_detail_suggestions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `order_detail_suggestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_details` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`product_id` char(36) NOT NULL,
	`store_program_id` int,
	`qty` int NOT NULL DEFAULT 0,
	`magic_qty` int NOT NULL DEFAULT 0,
	`ppv` double(8,2),
	`pph` double(8,2),
	`tva` double(8,2),
	`tva_amount` double(8,2) NOT NULL,
	`pph_ht` double(8,2),
	`total_pph_ht` decimal(18,5),
	`points` int,
	`level_points` int,
	`level` varchar(191),
	`discount` double(8,2),
	`discount_amount` decimal(18,5),
	`is_suggestion` int NOT NULL DEFAULT 0,
	`parent_id` int,
	`btn_magic` int NOT NULL DEFAULT 0,
	`order` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `order_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_status_histories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int,
	`order_status_id` int,
	`date` timestamp NOT NULL DEFAULT (now()),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`json_order` longtext NOT NULL,
	CONSTRAINT `order_status_histories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_statuses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`can_edit` tinyint NOT NULL DEFAULT 0,
	`can_delete` tinyint NOT NULL DEFAULT 0,
	`can_validate` tinyint NOT NULL DEFAULT 0,
	`can_convert` tinyint NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `order_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_wallets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`store_program_id` int NOT NULL,
	`amount` double(8,2),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `order_wallets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`reference` varchar(191) NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`wholesaler_id` char(36),
	`order_status_id` int NOT NULL DEFAULT 1,
	`date` datetime,
	`synced_at` datetime,
	`nb_products` int NOT NULL,
	`total_price_ht` decimal(18,5),
	`total_price_ttc` decimal(18,5),
	`tva` decimal(18,5),
	`wallet_amount` decimal(18,5),
	`paid_price_ttc` decimal(18,5),
	`btn_magic` int NOT NULL DEFAULT 0,
	`cancel_reason` text NOT NULL,
	`canceled_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
	`opened_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organismes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36) NOT NULL,
	`nom` varchar(255),
	`site` varchar(255),
	`adresse` varchar(255),
	`ville` char(36),
	`pays` char(36),
	`code_postal` varchar(255),
	`tele` varchar(255),
	`email` varchar(255),
	`description` varchar(255),
	`credit` int,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`image` varchar(222),
	CONSTRAINT `organismes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organisms` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `organisms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `p_categories` (
	`id` char(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`parent_id` char(36),
	`country_id` char(36) NOT NULL,
	`type` enum('lab','internal','integration') NOT NULL DEFAULT 'lab',
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `p_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pack_product` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`pack_id` int NOT NULL,
	`product_id` int NOT NULL,
	CONSTRAINT `pack_product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `packs` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`packs_id` int,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`date_start` datetime NOT NULL,
	`date_end` datetime NOT NULL,
	CONSTRAINT `packs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_category` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`status` tinyint NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `page_category_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`categorie_id` int NOT NULL,
	`title` varchar(191),
	`image` text,
	`icon` text,
	`position` int,
	`content` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paiementconfreres` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`confreres_id` int NOT NULL,
	`montant_paye` decimal(10,2),
	`mode_paiment` int,
	`client_id` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`date_effectuer` datetime NOT NULL,
	`creer_par` char(36) NOT NULL,
	`sortieconfreres_id` bigint,
	`pharmacy_id` char(36),
	CONSTRAINT `paiementconfreres_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paiementfournisseur` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`fourisseur_id` char(36) NOT NULL,
	`montant_paye` decimal(10,2),
	`mode_paiment` int,
	`client_id` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`bonlivraisons_id` bigint,
	`date_effectuer` datetime NOT NULL,
	`creer_par` char(36) NOT NULL,
	`pharmacy_id` char(36),
	`caisse_id` bigint unsigned,
	CONSTRAINT `paiementfournisseur_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parainage` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users` int,
	`added_by` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `parainage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paramètrescaisses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`montant_démarrage` double(10,2) NOT NULL,
	`modifié_par` int NOT NULL,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `paramètrescaisses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parrainage` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`date_debut` datetime,
	`date_fin` datetime,
	`winner_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	`description` text,
	`image` varchar(191),
	CONSTRAINT `parrainage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `parrainage_users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`parrainage_id` int,
	`parrain_id` int,
	`cms_users_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `parrainage_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `participations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`promotion_id` int NOT NULL,
	`questionnaire_id` int NOT NULL,
	`points_user` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`points_store` int NOT NULL DEFAULT 0,
	CONSTRAINT `participations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `password_resets` (
	`my_row_id` bigint unsigned NOT NULL,
	`email` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`created_at` timestamp,
	CONSTRAINT `password_resets_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `pathologies` (
	`id` char(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `pathologies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pays` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pays_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permission_phroles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`permission_id` bigint unsigned NOT NULL,
	`role_id` bigint unsigned NOT NULL,
	`created_by` int,
	`updated_by` int,
	`deleted_by` int,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `permission_phroles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permission_users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`permission_id` bigint unsigned NOT NULL,
	`user_id` char(36) NOT NULL,
	`created_by` int,
	`updated_by` int,
	`deleted_by` int,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `permission_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`reference` varchar(191) NOT NULL,
	`stat` tinyint NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `personal_access_tokens` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`tokenable_type` varchar(191) NOT NULL,
	`tokenable_id` varchar(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`token` varchar(64) NOT NULL,
	`abilities` text,
	`last_used_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`expires_at` timestamp,
	CONSTRAINT `personal_access_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `personal_access_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `ph_roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`display_name` varchar(255),
	`description` varchar(255),
	`created_by` int,
	`updated_by` int,
	`deleted_by` int,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `ph_roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `ph_roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `pharmacie_statuses` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pharmacie_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pharmacies` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`civility` varchar(191),
	`first_name` varchar(191),
	`last_name` varchar(191),
	`street` varchar(191),
	`cities_id` varchar(191),
	`regions_id` varchar(191),
	`zip_code` varchar(191),
	`phone` varchar(191),
	`fax` varchar(191),
	`mobile` varchar(191),
	`email` varchar(191),
	`pharmacy` varchar(191),
	`gender` varchar(191),
	`code` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacie_statuses_id` int NOT NULL DEFAULT 1,
	`city_2` varchar(191),
	`secteurs_id` int,
	`code_barre` varchar(255),
	`deleted_at` timestamp,
	`rc` varchar(191),
	`ice` varchar(191),
	`if_text` varchar(250),
	`imported` tinyint,
	CONSTRAINT `pharmacies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pharmacy_files` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`file` text NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `pharmacy_files_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pharmacy_fournisseurs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`fournisseur_id` char(36) NOT NULL,
	`credit` double(18,5) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pharmacy_fournisseurs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pharmacy_produits` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`quantity` int NOT NULL,
	`qte_compta` int,
	`quantity_min` int NOT NULL,
	`quantity_max` int NOT NULL,
	`zone_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pharmacy_produits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pharmacy_statuses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`tag` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `pharmacy_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pharmcy_reservation_comments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmcy_reservation_id` int NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`comment` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pharmcy_reservation_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pharmcy_reservations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`stat` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pharmcy_reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `phone_requests` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`phone` varchar(191) NOT NULL,
	`checked` tinyint NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `phone_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `phrole_users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`role_id` bigint unsigned NOT NULL,
	`user_id` char(36) NOT NULL,
	`created_by` int,
	`updated_by` int,
	`deleted_by` int,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `phrole_users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `point` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`points` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `point_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pointcontacts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`fournisseur_id` char(36),
	`name` varchar(255),
	`first_name` varchar(255),
	`email` varchar(255),
	`tele` varchar(12),
	`position` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `pointcontacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `position_reservations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`positions_id` int NOT NULL,
	`positions_types_id` int NOT NULL,
	`date_debut` date NOT NULL,
	`date_fin` date NOT NULL,
	`laboratories_id` char(36) NOT NULL,
	`grossistes_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`accroche` varchar(191),
	CONSTRAINT `position_reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `positions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`positions_types_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `positions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `positions_types` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `positions_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pre_generated_cities_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `pre_generated_cities_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `pre_generated_grossiste_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `pre_generated_grossiste_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `pre_generated_lab_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `pre_generated_lab_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `pre_generated_pharmacy_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `pre_generated_pharmacy_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `pre_generated_user_ids` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	CONSTRAINT `pre_generated_user_ids_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `pregnancy_risks` (
	`id` char(36) NOT NULL,
	`months` int,
	`value` varchar(191),
	`order` int,
	`synthese_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `pregnancy_risks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `premium_offers` (
	`id` char(36) NOT NULL,
	`name` text NOT NULL,
	`duration` int NOT NULL,
	`active` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `premium_offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `price_group` (
	`id` char(36) NOT NULL,
	`pharmacy_id` char(36),
	`product_id` char(36) NOT NULL,
	`pharmacy_price` decimal(8,2),
	`lab_price` decimal(8,2),
	`wholesaler_price` decimal(8,2),
	`active` tinyint NOT NULL DEFAULT 1,
	`tax_rate` int,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`price_pharmacy_id` char(36),
	`price_wholesaler_id` char(36),
	`price_lab_id` char(36),
	`source` text,
	CONSTRAINT `price_group_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `prixproduits` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`PPV` decimal(9,2) NOT NULL,
	`PPH` decimal(9,2) NOT NULL,
	`produits_id` char(36) NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`active` int NOT NULL DEFAULT 0,
	`creer_par` char(36),
	`pharmacy_id` char(36),
	CONSTRAINT `prixproduits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_adjustments` (
	`id` char(36) NOT NULL,
	`quantity` int,
	`old_qte` int,
	`ppv` decimal(10,2),
	`pph` decimal(10,2),
	`taxe_rate` int,
	`pharmacy_id` char(36),
	`stock_id` char(36),
	`product_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_adjustments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_classifications` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`name` varchar(255),
	`country_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_classifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_codes` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`country_id` char(36) NOT NULL,
	`code` varchar(255),
	`type` enum('barcode','qr','id') NOT NULL DEFAULT 'barcode',
	`referrer` varchar(255),
	`referrer_type` enum('direct partner','integration partner','lab','wholesaler','ANAM'),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_equivalents` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`laboratory_equivalent_id` char(36) NOT NULL,
	`equivalent_id` char(36) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_equivalents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_formes` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`forme_id` bigint unsigned NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_formes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_imgs` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`img_url` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_imgs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_insurance_statuses` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`reimbursable` tinyint NOT NULL DEFAULT 0,
	`rate` int,
	`country_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_insurance_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_labs` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`lab_id` char(36),
	`country_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_labs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_molecules` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`molecule_id` char(36) NOT NULL,
	`dosage` varchar(255),
	`unit` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_molecules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_monographs` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`monograph_url` varchar(255),
	`country_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `product_monographs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_partners` (
	`id` char(36) NOT NULL,
	`name` varchar(255),
	`bar_code` varchar(255),
	`form` varchar(255),
	`code_product` varchar(255),
	`tax_rate` int,
	`partner_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_pcategories` (
	`id` char(36) NOT NULL,
	`pcategory_id` char(36),
	`product_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_pcategories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_posologies` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`posology` tinyint NOT NULL DEFAULT 0,
	`unit` tinyint NOT NULL DEFAULT 0,
	`dependency` enum('age','weight','condition') NOT NULL DEFAULT 'age',
	`dependency_range` longtext,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `product_posologies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_prices` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`country_id` char(36) NOT NULL,
	`price` decimal(10,2),
	`type` enum('lab','wholesaler','pharmacy','hospital','ph_reimbursement','ppv_reimbursement') NOT NULL DEFAULT 'lab',
	`tax_rate` int,
	`company_id` char(36),
	`active` tinyint NOT NULL DEFAULT 1,
	`referrer` varchar(255),
	`referrer_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_prices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_program` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`program_id` char(36) NOT NULL,
	`active` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_program_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_status` (
	`id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`country_id` char(36) NOT NULL,
	`is_otc` tinyint,
	`is_available` tinyint,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `product_status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_suggestions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_id` char(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`status` tinyint NOT NULL DEFAULT 0,
	`description` text,
	`bar_code` text,
	`indications` text,
	`presentation` text,
	`ppha` double(8,2),
	`ppgro` double(8,2),
	`ppv` double(8,2),
	`ppc` double(8,2),
	`tva` double(8,2),
	`date_start` timestamp NOT NULL DEFAULT (now()),
	`date_end` timestamp NOT NULL DEFAULT (now()),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`atc` varchar(191),
	`nfc` varchar(191),
	`category` varchar(191),
	`molecule` varchar(191),
	`classe` varchar(191),
	`tableau` varchar(191),
	`nature` varchar(191),
	`type` varchar(191),
	`mode` varchar(191),
	`age` varchar(191),
	`poids` varchar(191),
	`poid_unite` varchar(191),
	`volume` varchar(191),
	`volume_unite` varchar(191),
	`prct` varchar(191),
	`concentration_1` varchar(191),
	`concentration_unite_1` varchar(191),
	`concentration_2` varchar(191),
	`concentration_unite_2` varchar(191),
	`qte` varchar(191),
	`qte_unite` varchar(191),
	`import` int,
	`external_id` varchar(191),
	`import_content` varchar(191),
	CONSTRAINT `product_suggestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` char(36) NOT NULL,
	`pharmacy_id` char(36),
	`name` varchar(255) NOT NULL,
	`main_img` varchar(255),
	`presentation` varchar(255),
	`description` varchar(255),
	`created_by` char(36),
	`modified_by` char(36),
	`nfc_code` varchar(255),
	`atc_code` varchar(255),
	`box_warnings_text` text,
	`box_warnings_url` varchar(255),
	`is_generic` tinyint,
	`active` tinyint,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`updated_by` char(36),
	`user_updated_by` char(36),
	`brand_name` text,
	`check` tinyint DEFAULT 0,
	`check_completed` tinyint DEFAULT 0,
	`source` text,
	`atc_code_5` varchar(255),
	`type` tinyint DEFAULT 0,
	`therapeutic_class` text,
	`med_index` tinyint DEFAULT 1,
	`mrr` varchar(255),
	`rcp` varchar(255),
	`patient_leaflet` varchar(255),
	`insurance_classification_id` char(36),
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `produitcommandes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`quantite` int NOT NULL,
	`produits_id` char(36) NOT NULL,
	`montant_PU` varchar(255) NOT NULL,
	`TVA` varchar(255) NOT NULL,
	`remise` double(10,2) NOT NULL,
	`PPV` varchar(255) NOT NULL,
	`PPH` varchar(255) NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`commande_id` varchar(21) NOT NULL,
	`date_promption` datetime,
	`pharmacy_id` char(36),
	`tax_rate` int DEFAULT 0,
	CONSTRAINT `produitcommandes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `produits` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`image` varchar(255),
	`code_bare` varchar(255),
	`code_bare2` varchar(255),
	`laboratoire` char(36),
	`gamme` varchar(255),
	`types_id` bigint unsigned,
	`classes_id` bigint unsigned,
	`forms_id` bigint unsigned,
	`dcis_id` bigint unsigned,
	`sous_gamme` varchar(255),
	`produit_tableau` varchar(255),
	`prescription` varchar(255),
	`produit_marche` varchar(255),
	`PPH` decimal(9,2),
	`PPV` decimal(9,2) NOT NULL,
	`TVA` varchar(255),
	`TVA_vente` varchar(255),
	`remboursable` varchar(255),
	`présentation` varchar(255),
	`excipient` varchar(255),
	`posologie_adult` varchar(255),
	`posologie_enfant` varchar(255),
	`indications` varchar(255),
	`contre_indication_conduit` varchar(255),
	`contre_indication_monograph` varchar(255),
	`contre_indication_grossesse` varchar(255),
	`reference_labo_produit` varchar(255),
	`description` varchar(255),
	`conditionnement` varchar(255),
	`monograph` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`active` int DEFAULT 1,
	`PPV_prix` decimal(9,2) NOT NULL,
	`PPH_prix` decimal(9,2),
	`date_peremption` date,
	`quantite` int DEFAULT 0,
	`creer_par` char(36),
	`quantite_disponible` int,
	`zone` int DEFAULT 1,
	`inventaires_id` int NOT NULL,
	`modifier_par` char(36),
	`nomberAction` int DEFAULT 0,
	`stok_min` int,
	`stok_max` int,
	`nature_id` int,
	`atc_id` int,
	`mode_id` int,
	`pharmacy_id` char(36),
	CONSTRAINT `produits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `produitsbonlivraisons` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`quantite` int NOT NULL,
	`produits_id` char(36) NOT NULL,
	`montant_PU` decimal(10,2) NOT NULL,
	`TVA` varchar(255),
	`tax_rate` int NOT NULL DEFAULT 0,
	`remise` double(10,2) NOT NULL,
	`PPV` decimal(10,2) DEFAULT '0.00',
	`PPH` decimal(10,2) DEFAULT '0.00',
	`ecart_qte` varchar(255) NOT NULL,
	`ecart_prix` varchar(255) NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`bonlivraison_id` varchar(12),
	`creer_par` char(36),
	`type_remise` int NOT NULL,
	`data_peromption` datetime,
	`qte_update` int DEFAULT 0,
	`pharmacy_id` char(36),
	CONSTRAINT `produitsbonlivraisons_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `produitssortieconfreres` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`sortie_confreres_id` varchar(255) NOT NULL,
	`qte` int,
	`prix_AU` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`produits_id` char(36),
	`type` int DEFAULT 0,
	`pph` decimal(10,2),
	`tax_rate` int DEFAULT 0,
	`remise` double(10,2) NOT NULL,
	`type_remise` int NOT NULL,
	`pharmacy_id` char(36),
	CONSTRAINT `produitssortieconfreres_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `program_levels` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`program_id` int NOT NULL,
	`level_id` int NOT NULL,
	`description` text,
	`min_amount` double(8,2),
	`points` int NOT NULL,
	`discount` double(8,2) NOT NULL,
	`is_premium` tinyint NOT NULL,
	`duration` int NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`name` varchar(191),
	CONSTRAINT `program_levels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `program_tiers` (
	`id` char(36) NOT NULL,
	`name` varchar(255),
	`program_id` char(36) NOT NULL,
	`order` int,
	`yearly_min` decimal(20,2),
	`quarterly_min` decimal(20,2),
	`discount_rate` double(10,2),
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	`is_default` tinyint DEFAULT 0,
	CONSTRAINT `program_tiers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `programme` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`description` text,
	`titre` varchar(250),
	`slug` varchar(250),
	`heure_debut` varchar(200),
	`heure_fin` varchar(200),
	`agenda_id` int,
	`media` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	`is_break` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `programme_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_id` char(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`conditions` text,
	`date_start` timestamp NOT NULL DEFAULT (now()),
	`date_end` timestamp NOT NULL DEFAULT (now()),
	`status` tinyint NOT NULL DEFAULT 0,
	`point_price` double(8,2) NOT NULL,
	`point_value` double(8,2) NOT NULL DEFAULT 0.1,
	`user_point_value` double(8,2) NOT NULL,
	`threshold` double(8,2) NOT NULL,
	`seller_prct` double(8,2) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `programs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `promotions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`program_id` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`date_start` timestamp NOT NULL DEFAULT (now()),
	`date_end` timestamp NOT NULL DEFAULT (now()),
	`status` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `promotions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pub_clients` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`company_name` varchar(191) NOT NULL,
	`contact` varchar(191),
	`phone` varchar(191),
	`mobile` varchar(191),
	`faxe` varchar(191),
	`address` text,
	`tp` varchar(191),
	`ice` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pub_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pub_pages` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `pub_pages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pub_zones` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`size` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`refresh_time` int NOT NULL DEFAULT 300,
	`position` varchar(191) NOT NULL,
	CONSTRAINT `pub_zones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pubs` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`pub_clients_id` int NOT NULL,
	`pub_zones_id` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`image` varchar(191) NOT NULL,
	`date_start` datetime NOT NULL,
	`date_end` datetime NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`lien_externe` text,
	`pub_pages_id` int NOT NULL,
	`position` int NOT NULL DEFAULT 1,
	`show_time` int NOT NULL DEFAULT 300,
	`internal_links_id` int,
	`element` varchar(191),
	`extra_params` text,
	`pubs_generator_id` int,
	`type` varchar(191),
	CONSTRAINT `pubs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pubs_destinations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`destinations_id` int NOT NULL,
	`pubs_id` int NOT NULL,
	CONSTRAINT `pubs_destinations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pubs_generator` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`image` varchar(191) NOT NULL,
	`date_start` datetime NOT NULL,
	`date_end` datetime NOT NULL,
	`lien_externe` text,
	`position` int NOT NULL DEFAULT 1,
	`show_time` int NOT NULL DEFAULT 300,
	`internal_links_id` int,
	`pub_clients_id` int,
	`element` varchar(191),
	`extra_params` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`type` varchar(191),
	CONSTRAINT `pubs_generator_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `qr_code` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`image` varchar(191),
	`animation_id` varchar(191),
	`qty` int,
	`rest` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `qr_code_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `qr_code_groups` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`prefix` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`from` varchar(191),
	`to` varchar(191),
	`is_generated` tinyint NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `qr_code_groups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `qr_code_tokens` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`qrcode` text NOT NULL,
	`token` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `qr_code_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `qr_codes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`qr_code_group_id` int NOT NULL,
	`scan_product_id` int,
	`code` varchar(191),
	`reference` varchar(191),
	`is_scanned` int NOT NULL DEFAULT 0,
	`user_id` char(36),
	`date_scan` timestamp NOT NULL DEFAULT (now()),
	`claim` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `qr_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `qualifications` (
	`id` char(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `qualifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`question_type` varchar(191) NOT NULL,
	`media` varchar(191),
	`is_obligatory` tinyint,
	`questionnaire_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `question_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question_anwser` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`parent_id` int,
	`question_response_id` int,
	`option_id` int,
	`sub_option_id` int,
	`question_id` int,
	`value` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `question_anwser_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question_options` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` varchar(191),
	`is_the_right_answer` tinyint,
	`position` int,
	`parent_id` int,
	`question_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `question_options_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question_response` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`questionnaire` int,
	`user_id` char(36),
	`has_succeeded` tinyint NOT NULL,
	`resultat` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `question_response_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `question_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `question_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questionnaire` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`type` varchar(191) NOT NULL,
	`nbr_reponse_juste` int,
	`description` text NOT NULL,
	`description_fermeture` text NOT NULL,
	`user_role` int,
	`has_image` tinyint,
	`media` varchar(191),
	`user_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`date_publication` datetime NOT NULL,
	CONSTRAINT `questionnaire_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questionnaire_destinations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`destinations_id` int NOT NULL,
	`questionnaire_id` int NOT NULL,
	CONSTRAINT `questionnaire_destinations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questionnaire_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `questionnaire_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questionnaires` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_id` char(36) NOT NULL,
	`questionnaire_type_id` int NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`title_success` varchar(191),
	`description_success` text,
	`title_failure` varchar(191),
	`description_failure` text,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`min_points` int NOT NULL DEFAULT 0,
	CONSTRAINT `questionnaires_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`questionnaire_id` int NOT NULL,
	`question_type_id` int NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rating_schedule` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`comment` text,
	`rate` varchar(191),
	`cms_user_id` char(36),
	`programme_id` int,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `rating_schedule_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reclamation_statuses` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `reclamation_statuses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reclamations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`wholesaler_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`order_id` int NOT NULL,
	`store_program_id` int NOT NULL,
	`reclamation_status_id` int NOT NULL,
	`amount` decimal(18,5),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `reclamations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reduction_types` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `reduction_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reductions` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`offers_id` int NOT NULL,
	`cms_users_id` char(36) NOT NULL,
	`date_start` datetime NOT NULL,
	`date_end` datetime NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `reductions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `regions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `regions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `regularisationsoldeconfreres` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`confreres_id` int NOT NULL,
	`montant_credit` int,
	`montant_paye` int,
	`mode_paiment` int,
	`commentaire` int,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `regularisationsoldeconfreres_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `regularisationsoldes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`clients_id` int NOT NULL,
	`montant_credit` decimal(10,2),
	`montant_paye` decimal(10,2),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`commentaire` varchar(222),
	`mode_paiement` int NOT NULL,
	`date_effectuer` datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`methode` varchar(200) NOT NULL DEFAULT 'montant',
	`vente_id` int,
	`creer_par` char(36),
	`paiement_crédit` tinyint NOT NULL,
	`pharmacy_id` char(36),
	`caisse_id` bigint unsigned,
	CONSTRAINT `regularisationsoldes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `remise_client` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`type_id` bigint unsigned NOT NULL,
	`client_id` bigint unsigned NOT NULL,
	`type_remise` tinyint NOT NULL,
	`value_remise` float NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `remise_client_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `remises` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom_Remise` varchar(255) NOT NULL,
	`Valeur` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `remises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reproductive_healths` (
	`id` char(36) NOT NULL,
	`months` int,
	`value` varchar(191),
	`order` int,
	`molecule_id` char(36),
	`product_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `reproductive_healths_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `request_apikeys` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`company_id` char(36),
	`ip` varchar(255),
	`route` varchar(255),
	`requested_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `request_apikeys_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `retoursurventeproduits` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`retoursurventes_id` varchar(255),
	`produits_id` char(36),
	`remboursement` varchar(255),
	`taux_remboursement` varchar(255),
	`type_remise` varchar(255),
	`remise` double(10,2),
	`qte` int,
	`prix_AU` varchar(255),
	`tax_rate` int DEFAULT 0,
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `retoursurventeproduits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `retoursurventes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`quantite` int,
	`client_id` varchar(255),
	`creer_par` char(36),
	`mode_payment` varchar(255),
	`montant_restitue` varchar(255),
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`vente_id` bigint,
	`reference` varchar(45),
	`pharmacy_id` char(36),
	`caisse_id` bigint unsigned,
	`type_remise` int DEFAULT -1,
	`remise` double(8,2),
	CONSTRAINT `retoursurventes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`role_id` int NOT NULL,
	`permission_id` int NOT NULL,
	`is_default` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `role_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36) NOT NULL,
	`produitA` int,
	`produitM` int,
	`produitS` int,
	`venteA` int,
	`venteM` int,
	`venteS` int,
	`achatA` int,
	`achatM` int,
	`achatS` int,
	`parametreA` int,
	`parametreM` int,
	`parametreS` int,
	`confrereA` int,
	`confrereM` int,
	`confrereS` int,
	`fournisseurA` int,
	`fournisseurM` int,
	`fournisseurS` int,
	`importationA` int,
	`importationM` int,
	`importationS` int,
	`caisseA` int,
	`caisseM` int,
	`caisseS` int,
	`stockA` int,
	`stockM` int,
	`stockS` int,
	`organismeA` int,
	`organismeM` int,
	`organismeS` int,
	`sconfrereA` int,
	`sconfrereM` int,
	`sconfrereS` int,
	`econfrereA` int,
	`econfrereM` int,
	`econfrereS` int,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`nom` varchar(222),
	`clientA` int,
	`clientM` int,
	`clientS` int,
	`clientR` int,
	`arret_caisse` int,
	`rapport_journee` int,
	`journal_produit` int,
	`rapport_caisse` int,
	`exporte_stoxk` int,
	`exporte_achat` int,
	`exporte_vente` int,
	`exporte_client` int,
	`chiffre_tva` int,
	`chiffre_cat` int,
	`rapport_stock` int,
	`rapport_sur_tva` int,
	`rapport_sur_cat` int,
	`rapport_sur_lab` int,
	`rapport_sur_cat_tva` int,
	`rapport_sur_dci` int,
	`rapport_sur_calsse` int,
	`rapport_sur_forme` int,
	`rapport_sur_zero` int,
	`rapport_sur_vente` int,
	`rapport_sur_ventejour` int,
	`rapport_sur_vente_cat` int,
	`rapport_sur_vente_lab` int,
	`created_by` char(36),
	`updated_by` char(36),
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rolesactions` (
	`ID` int AUTO_INCREMENT NOT NULL,
	`Action` varchar(255) NOT NULL,
	`Description` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`id_pages` int,
	`column_oreder` int NOT NULL DEFAULT 1,
	CONSTRAINT `rolesactions_ID` PRIMARY KEY(`ID`)
);
--> statement-breakpoint
CREATE TABLE `rubric_child_products` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`treatment_id` int NOT NULL,
	`product_id` char(36) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `rubric_child_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rubric_children` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`countercase_rubric_id` int NOT NULL,
	`name` text NOT NULL,
	`icone` text,
	`image` text,
	`description` text,
	`stat` varchar(191) NOT NULL DEFAULT '1',
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `rubric_children_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rubrics` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`is_treatment` tinyint NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `rubrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scan_products` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`promotion_id` int NOT NULL,
	`product_id` char(36) NOT NULL,
	`quantity` int NOT NULL DEFAULT 0,
	`points_user` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`points_store` int NOT NULL DEFAULT 0,
	CONSTRAINT `scan_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scanned_products` (
	`id` char(36) NOT NULL,
	`scan_id` char(36) NOT NULL,
	`product_id` char(36) NOT NULL,
	`name` text NOT NULL,
	`code` bigint,
	`quantity` int NOT NULL,
	`pharmacy_price` double(8,2) NOT NULL,
	`wholesaler_price` double(8,2) NOT NULL,
	`expiry_date` timestamp,
	`tax` double,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`order` int,
	`exist_in_sobrus` tinyint,
	CONSTRAINT `scanned_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scanned_wholesaler` (
	`id` char(36) NOT NULL,
	`wholesaler_id` char(36),
	`name` text,
	`tax_code` text,
	`if` text,
	`rc` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`source` enum('user','sentence_similarity') DEFAULT 'user',
	CONSTRAINT `scanned_wholesaler_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `secteurs` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`regions_id` int NOT NULL,
	`cities_id` char(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `secteurs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sectors` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`city_id` char(36) NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sectors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sell_products` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`promotion_id` int NOT NULL,
	`product_id` char(36) NOT NULL,
	`points_user` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`points_store` int NOT NULL DEFAULT 0,
	CONSTRAINT `sell_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sequence` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Facteur_de_vente` varchar(255) NOT NULL,
	`Retour_sur_vente` varchar(255) NOT NULL,
	`Bon_de_livraison` varchar(255) NOT NULL,
	`Fournisseur_recu` varchar(255) NOT NULL,
	`Inventaire_stock` varchar(255) NOT NULL,
	`Facture_gobal` varchar(255) NOT NULL,
	`sequence_devis` varchar(255) NOT NULL,
	`Bon_de_commande` varchar(255) NOT NULL,
	`Fournisseur_emis` varchar(255) NOT NULL,
	`Adjustement_de_stock` varchar(255) NOT NULL,
	`N_order` varchar(255) NOT NULL,
	`preparation` varchar(255) NOT NULL,
	`Cree_par` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `sequence_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sequences` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Facteur_de_vente` varchar(255) NOT NULL,
	`Retour_sur_vente` varchar(255) NOT NULL,
	`Bon_de_livraison` varchar(255) NOT NULL,
	`Fournisseur_recu` varchar(255) NOT NULL,
	`Inventaire_stock` varchar(255) NOT NULL,
	`Facture_gobal` varchar(255) NOT NULL,
	`sequence_devis` varchar(255) NOT NULL,
	`Bon_de_commande` varchar(255) NOT NULL,
	`Fournisseur_emis` varchar(255) NOT NULL,
	`Adjustement_de_stock` varchar(255) NOT NULL,
	`N_order` varchar(255) NOT NULL,
	`preparation` varchar(255) NOT NULL,
	`creer_par` char(36),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `sequences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` char(36),
	`ip_address` varchar(45),
	`user_agent` text,
	`payload` text NOT NULL,
	`last_activity` int NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `setting` (
	`id` char(36) NOT NULL,
	`name` varchar(255),
	`description` text,
	`reference` varchar(255),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `setting_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `setting_pharmacies` (
	`id` char(36) NOT NULL,
	`setting_id` char(36),
	`pharmacy_id` char(36),
	`user_id` char(36),
	`status` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `setting_pharmacies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `shortcuts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`description` text,
	`image` text,
	`link` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `shortcuts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `slides` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`title` varchar(191),
	`sub_title` varchar(191),
	`description` text,
	`image` text,
	`link` text,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `slides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sms` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`phone` varchar(191) NOT NULL,
	`code` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sms_sendings` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`phone_number` varchar(191) NOT NULL,
	`notification_id` int,
	`notification_type` varchar(191),
	`content` text,
	`link` text,
	`errors` text,
	`sending_date` timestamp,
	`sending_stat` int NOT NULL DEFAULT 0,
	`reading_date` timestamp,
	`reading_stat` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sms_sendings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sortieconfreres` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`confreres_id` varchar(255) NOT NULL,
	`methode_echange` varchar(255),
	`total` varchar(255),
	`mode_paiment` int NOT NULL DEFAULT 1,
	`status` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36),
	`type` varchar(222),
	`etat` varchar(12),
	`credit` double(10,2),
	`montant_payé` double(10,2) NOT NULL,
	`etat_paiement` int NOT NULL,
	`state` int DEFAULT 1,
	`reference` varchar(300),
	`archive` tinyint NOT NULL DEFAULT 0,
	`date_archivage` timestamp,
	`pharmacy_id` char(36),
	`effective_date` timestamp DEFAULT (now()),
	CONSTRAINT `sortieconfreres_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sousgammes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`creer_par` char(36),
	`nom` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `sousgammes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock_adjustments` (
	`id` char(36) NOT NULL,
	`name` varchar(255),
	`state` enum('draft','completed','cancel') NOT NULL DEFAULT 'completed',
	`date` datetime,
	`user_id` char(36),
	`pharmacy_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `stock_adjustments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock_details` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`source` varchar(255) NOT NULL,
	`quantite` int NOT NULL,
	`quantite_update` int NOT NULL,
	`produits_id` char(36) NOT NULL,
	`PPV` varchar(255) NOT NULL,
	`PPH` varchar(255) NOT NULL,
	`type` int NOT NULL,
	`date_promption` timestamp,
	`regler_stock` int NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`id_operation` bigint,
	`pharmacy_id` char(36),
	CONSTRAINT `stock_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock_pharmacies` (
	`id` char(36) NOT NULL,
	`quantity` int,
	`date` datetime,
	`product_id` char(36),
	`pharmacy_id` char(36),
	`user_id` char(36),
	`price_pharmacy` char(36),
	`price_wholesaler` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `stock_pharmacies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `store_action_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191),
	`reference` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `store_action_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `store_points` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`store_program_id` int NOT NULL,
	`user_id` char(36) NOT NULL,
	`delivery_id` int NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`date_expiration` timestamp NOT NULL DEFAULT (now()),
	`points` double(8,2),
	`rest` double(8,2),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `store_points_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `store_program_history` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`store_program_id` int NOT NULL,
	`level_id` int NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`store_action_type_id` varchar(191),
	`points` int,
	`level_points` int,
	`wallet` double(8,2) NOT NULL,
	`entity_id` int,
	`level_after_id` int,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `store_program_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `store_program_operations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`program_id` int NOT NULL,
	`operation_type_id` int NOT NULL,
	`description` text,
	`points` int NOT NULL DEFAULT 0,
	`level_points` int NOT NULL DEFAULT 0,
	`wallet` double(8,2) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `store_program_operations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `store_programs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`program_id` int NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`level_id` int NOT NULL,
	`date_registration` timestamp NOT NULL DEFAULT (now()),
	`points` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`level_start` timestamp,
	`level_end` timestamp,
	`level_points` int NOT NULL DEFAULT 0,
	`wallet` decimal(18,5),
	CONSTRAINT `store_programs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `store_wallets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`store_program_id` int NOT NULL,
	`user_id` char(36) NOT NULL,
	`delivery_id` int NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`date_expiration` timestamp NOT NULL DEFAULT (now()),
	`amount` double(8,2),
	`rest` double(8,2),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `store_wallets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sub_qualifications` (
	`id` char(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`qualifications_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `sub_qualifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supplier_credits` (
	`id` char(36) NOT NULL,
	`supplier_id` char(36) NOT NULL,
	`company_id` char(36) NOT NULL,
	`credit` decimal(10,2) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `supplier_credits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` char(36) NOT NULL,
	`company_id` char(36),
	`created_by` char(36),
	`city_id` char(36),
	`country_id` char(36),
	`pharmacy_id` char(36),
	`wholesaler_id` int,
	`name` varchar(255) NOT NULL,
	`image` varchar(255),
	`email` varchar(255),
	`fax` varchar(255),
	`phone` varchar(255),
	`address` varchar(255),
	`code_postale` varchar(255),
	`description` varchar(255),
	`fav` int NOT NULL DEFAULT 0,
	`modifier_par` char(36),
	`credit` decimal(10,2) NOT NULL DEFAULT '0.00',
	`deleted_at` timestamp,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `suppliers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `support` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`tele` bigint NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `support_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `syncronizations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`type` varchar(255) NOT NULL,
	`total_synced` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `syncronizations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `syntheses` (
	`id` char(36) NOT NULL,
	`product_name` varchar(191),
	`last_modification_date` date,
	`atc_code` varchar(191),
	`breastfeeding_risk` varchar(191),
	`doping_allowed` tinyint,
	`vigilance_level` varchar(191),
	`molecule_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `syntheses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_adverse_effects` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`name` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `system_adverse_effects_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `system_notifications` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`reference` varchar(191) NOT NULL,
	`content` text NOT NULL,
	`link` text,
	`description` text,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `system_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `table_produits` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `table_produits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `targets` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`laboratory_id` char(36),
	`name` varchar(191) NOT NULL,
	`service_id` int,
	`region_id` int,
	`city_id` char(36),
	`sector_id` int,
	`company_type_id` int,
	`role_id` int,
	`company_id` char(36),
	`user_id` char(36),
	`nbr_users` int,
	`users` text,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `targets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `termes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom_Terme` varchar(255) NOT NULL,
	`Value` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `termes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `trace_lab_searches` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` char(36) NOT NULL,
	`name` text,
	`searches` json,
	`user_id` char(36),
	`board_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `trace_lab_searches_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`date` datetime NOT NULL,
	`type` varchar(255) NOT NULL,
	`entiry_type` int NOT NULL,
	`entities` int NOT NULL,
	`reference` varchar(255),
	`payment_status` varchar(255) NOT NULL,
	`modes_of_payment` varchar(255) NOT NULL,
	`amount` double(8,2) NOT NULL,
	`type_remise` varchar(255),
	`remise` decimal(10,2),
	`given_amount` double(8,2),
	`rest_amount` double(8,2),
	`user_id` char(36) NOT NULL,
	`account_id` int NOT NULL,
	`account_type` int NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `treatment_categories` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `treatment_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `treatment_children` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`treatment_id` int NOT NULL,
	`name` text NOT NULL,
	`image` text,
	`description` text,
	`stat` varchar(191) NOT NULL DEFAULT '1',
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `treatment_children_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `treatment_products` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`treatment_id` int NOT NULL,
	`product_id` char(36) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `treatment_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `treatments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`countercase_id` int NOT NULL,
	`countercase_rubric_id` int NOT NULL,
	`age_id` int NOT NULL,
	`treatment_category_id` int NOT NULL,
	`name` text NOT NULL,
	`molecule` text,
	`stat` varchar(191) NOT NULL DEFAULT '1',
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `treatments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tutorial_permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`tutorial_id` int NOT NULL,
	`permission_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `tutorial_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tutorial_roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`tutorial_id` int NOT NULL,
	`role_id` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `tutorial_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tutorial_steps` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` bigint unsigned NOT NULL,
	`tutorial_id` int NOT NULL,
	`orderColumn` int NOT NULL,
	`url` varchar(191),
	`title` varchar(191) NOT NULL,
	`sub_title` varchar(191),
	`description` text NOT NULL,
	`image` text,
	`element` varchar(191),
	`position` varchar(191),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `tutorial_steps_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `tutorials` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` bigint unsigned NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text NOT NULL,
	`type` int NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `tutorials_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `tvas` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom_Tva` varchar(255) NOT NULL,
	`Valeur` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`Type` varchar(50),
	CONSTRAINT `tvas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `type_clients` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`pharmacy_id` char(36),
	CONSTRAINT `type_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `type_notifications` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `type_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `type_utilisateurs` (
	`my_row_id` bigint unsigned NOT NULL,
	`id` int NOT NULL,
	`role_type` varchar(255),
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `type_utilisateurs_my_row_id` PRIMARY KEY(`my_row_id`)
);
--> statement-breakpoint
CREATE TABLE `typepayments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nom` varchar(222) NOT NULL,
	`id_payement` int NOT NULL,
	CONSTRAINT `typepayments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`deleted_at` datetime,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `units` (
	`id` char(36) NOT NULL,
	`name` text NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `units_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`favorite_id` int NOT NULL,
	`state` int DEFAULT 0,
	`created_at` datetime,
	`updated_at` datetime,
	`deleted_at` datetime,
	CONSTRAINT `user_favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_functions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_functions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_gifts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36),
	`gift_id` int,
	`gift_stat_id` int,
	`date_reclamation` timestamp,
	`date_stat` timestamp,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_gifts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_notifications` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`id_cms_privileges` int NOT NULL,
	`laboratories_id` int,
	`grossistes_id` int,
	`module` varchar(191) NOT NULL,
	`allowed` tinyint NOT NULL DEFAULT 0,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `user_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_participations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`participation_id` int NOT NULL,
	`date` timestamp NOT NULL DEFAULT (now()),
	`points` int NOT NULL DEFAULT 0,
	`store_points` int NOT NULL DEFAULT 0,
	`is_success` tinyint NOT NULL DEFAULT 0,
	`answer` longtext,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_participations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`company_type` varchar(191) NOT NULL,
	`company_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`service_id` int NOT NULL,
	`permission_id` int NOT NULL,
	`stat` tinyint NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_program_operations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`program_id` int NOT NULL,
	`operation_type_id` int NOT NULL,
	`description` text,
	`points` int NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_program_operations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_programs` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`program_id` bigint unsigned NOT NULL,
	`date_registration` timestamp NOT NULL DEFAULT (now()),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`points` int NOT NULL DEFAULT 0,
	CONSTRAINT `user_programs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_qualifications` (
	`id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`qualification_id` char(36) NOT NULL,
	`sub_qualification_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`role` varchar(255),
	`practice_type` varchar(255)
);
--> statement-breakpoint
CREATE TABLE `user_questionnaires` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_participation_id` bigint unsigned NOT NULL,
	`questionnaire_id` bigint unsigned,
	`participation_id` int,
	`question_id` int,
	`is_success` tinyint NOT NULL DEFAULT 0,
	`answer` longtext,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_questionnaires_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_reclamations` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36),
	`user_scan_id` int,
	`program_id` int,
	`promotion_id` int,
	`reference` varchar(191),
	`source` int,
	`company_name` varchar(191),
	`date` timestamp NOT NULL DEFAULT (now()),
	`points` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_reclamations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_report` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`cms_users_id` char(36),
	`message` text,
	`status` tinyint,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `user_report_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_scans` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36) NOT NULL,
	`qr_code_id` bigint unsigned NOT NULL,
	`date_scan` timestamp NOT NULL DEFAULT (now()),
	`is_success` tinyint NOT NULL DEFAULT 0,
	`points` int NOT NULL DEFAULT 0,
	`store_points` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_scans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_transactions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`pharmacy_id` char(36) NOT NULL,
	`user_id` char(36) NOT NULL,
	`program_id` int,
	`promotion_id` int,
	`operation_id` int,
	`operation_type` varchar(191),
	`date` timestamp NOT NULL DEFAULT (now()),
	`points` int NOT NULL DEFAULT 0,
	`store_points` int NOT NULL DEFAULT 0,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `user_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userfavorie` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`user_id` char(36),
	`id_favorie` bigint,
	`state` int DEFAULT 0,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `userfavorie_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` char(36) NOT NULL,
	`company_id` char(36),
	`company_type` varchar(255),
	`service_id` bigint unsigned,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255),
	`email` varchar(255),
	`has_api_access` tinyint DEFAULT 0,
	`username` varchar(255),
	`avatar` varchar(255),
	`phone` varchar(255),
	`device_id` varchar(255),
	`email_verified_at` timestamp,
	`password` varchar(255) NOT NULL,
	`role_id` enum('pha_holder','pha_substite','pha_technician','laboratory_admin','laboratory_operator','wholesaler_admin','wholesaler_operator','admin','operator','commercial','technician','product_manager','other'),
	`stat` tinyint NOT NULL DEFAULT 0,
	`remember_token` varchar(100),
	`code` varchar(255),
	`firebase_token` varchar(255),
	`operator` varchar(255),
	`stat_scan` tinyint NOT NULL DEFAULT 0,
	`import` tinyint NOT NULL DEFAULT 1,
	`import_content` text,
	`country_id` char(36),
	`address` varchar(255),
	`title` varchar(255),
	`deleted` tinyint NOT NULL DEFAULT 0,
	`last_seen` timestamp,
	`profile_img` varchar(255),
	`gender` varchar(255),
	`pre_id` bigint,
	`cmd_id` bigint,
	`pre_company_id` bigint,
	`cmd_company_id` bigint,
	`created_by` char(36),
	`updated_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	`cgu_version` text NOT NULL,
	`password_compta` varchar(255) NOT NULL DEFAULT '$2y$10$Zrar4XI3R6Q55gUSQVlmQO3lT4H/63ELdXa1WgA4h9Yrwf9V1bcyy',
	`last_login_compta` timestamp,
	`civility` enum('Monsieur','Madame','Mademoiselle','Docteur','Professeur') NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `venteproduits` (
	`ventes_id` varchar(222),
	`produits_id` char(36),
	`quantite` int,
	`deleted_at` datetime,
	`created_at` datetime,
	`updated_at` datetime,
	`id` int AUTO_INCREMENT NOT NULL,
	`remboursement` varchar(222),
	`remise` double(10,2),
	`taux_remboursement` varchar(222),
	`prix_unitaire` varchar(222),
	`type_remise` varchar(222),
	`PPV_app` varchar(123) NOT NULL,
	`PPH_app` varchar(123) NOT NULL,
	`tax_rate` int DEFAULT 0,
	`pharmacy_id` char(36),
	CONSTRAINT `venteproduits_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ventes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`date_effectuer` datetime,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`client_id` int,
	`status` varchar(22),
	`original_status` int,
	`livree` varchar(222),
	`ordonnance` int DEFAULT 1,
	`mode_payment` varchar(222),
	`reference` varchar(222),
	`creer_par` char(36),
	`montant_credit` decimal(10,2),
	`montant_rendre` decimal(10,2),
	`montant_PPV` decimal(10,2),
	`montant_PU` decimal(10,2),
	`montant_recu` varchar(222),
	`archive` tinyint NOT NULL DEFAULT 0,
	`date_archivage` timestamp,
	`organisme` int,
	`qte_total` int NOT NULL DEFAULT 0,
	`total_rectifier` decimal(10,2),
	`etat_retour` int DEFAULT 0,
	`pharmacy_id` char(36),
	`caisse_id` bigint unsigned,
	`type_remise` int DEFAULT -1,
	`remise` double(8,2),
	CONSTRAINT `ventes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `villes` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom` varchar(255) NOT NULL,
	`pays_id` char(36) NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `villes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `warning_items` (
	`id` char(36) NOT NULL,
	`item` text NOT NULL,
	`order` int,
	`warnings_for_use_id` char(36),
	`molecule_id` char(36),
	`product_id` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `warning_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `warnings_for_uses` (
	`id` char(36) NOT NULL,
	`title` varchar(191) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `warnings_for_uses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wholesaler_suggestions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`wholesaler_type_id` int NOT NULL,
	`parent_id` int,
	`name` varchar(191) NOT NULL,
	`status` tinyint NOT NULL DEFAULT 0,
	`brand` varchar(191),
	`address` text,
	`postal_code` varchar(191),
	`city` varchar(191),
	`email` varchar(191),
	`phone` varchar(191),
	`fax` varchar(191),
	`website` varchar(191),
	`import` int,
	`external_id` varchar(191),
	`import_content` varchar(191),
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `wholesaler_suggestions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wholesaler_types` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `wholesaler_types_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wholesalers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`wholesaler_type_id` int NOT NULL,
	`parent_id` int,
	`suggestion_id` int,
	`name` varchar(191) NOT NULL,
	`brand` varchar(191),
	`address` text,
	`email` varchar(191),
	`phone` varchar(191),
	`fax` varchar(191),
	`website` varchar(191),
	`coef1` decimal(18,5),
	`coef2` decimal(18,5),
	`type_pro` int NOT NULL DEFAULT 1,
	`is_demo` int NOT NULL DEFAULT 0,
	`api` varchar(191),
	`api_code` varchar(191),
	`stat` tinyint NOT NULL DEFAULT 1,
	`created_by` char(36),
	`updated_by` char(36),
	`deleted_by` char(36),
	`user_created_by` char(36),
	`user_updated_by` char(36),
	`user_deleted_by` char(36),
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `wholesalers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `zone_products` (
	`id` char(36) NOT NULL,
	`zone_id` bigint unsigned NOT NULL,
	`product_id` char(36) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `zone_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `zones` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`Nom_zone` varchar(255) NOT NULL,
	`Ref_zone` varchar(255) NOT NULL,
	`deleted_at` datetime,
	`created_at` timestamp,
	`updated_at` timestamp,
	`creer_par` char(36) NOT NULL,
	`pharmacy_id` char(36),
	CONSTRAINT `zones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `adverse_effects` ADD CONSTRAINT `adverse_effects_pathology_id_pathologies_id_fk` FOREIGN KEY (`pathology_id`) REFERENCES `pathologies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `adverse_effects` ADD CONSTRAINT `adverse_effects_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `adverse_effects` ADD CONSTRAINT `adverse_effects_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alt_ids_company` ADD CONSTRAINT `alt_ids_company_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alt_name_suppliers` ADD CONSTRAINT `alt_name_suppliers_supplier_id_suppliers_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alt_name_wholesalers` ADD CONSTRAINT `alt_name_wholesalers_wholesaler_id_companies_id_fk` FOREIGN KEY (`wholesaler_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alt_names` ADD CONSTRAINT `alt_names_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alt_names` ADD CONSTRAINT `alt_names_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alt_names` ADD CONSTRAINT `alt_names_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alt_products` ADD CONSTRAINT `alt_products_wholesaler_id_companies_id_fk` FOREIGN KEY (`wholesaler_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cgu_histories` ADD CONSTRAINT `cgu_histories_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cgu_histories` ADD CONSTRAINT `cgu_histories_cgu_id_general_conditions_id_fk` FOREIGN KEY (`cgu_id`) REFERENCES `general_conditions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `check_products` ADD CONSTRAINT `check_products_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `commissions` ADD CONSTRAINT `commissions_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `companies` ADD CONSTRAINT `companies_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `companies` ADD CONSTRAINT `companies_delivery_note_type_id_delivery_note_types_id_fk` FOREIGN KEY (`delivery_note_type_id`) REFERENCES `delivery_note_types`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_gap` ADD CONSTRAINT `delivery_gap_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_gap` ADD CONSTRAINT `delivery_gap_city_id_cities_id_fk` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_gap` ADD CONSTRAINT `delivery_gap_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_gap` ADD CONSTRAINT `delivery_gap_supplier_id_suppliers_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_gap` ADD CONSTRAINT `delivery_gap_detail_order_id_produitcommandes_id_fk` FOREIGN KEY (`detail_order_id`) REFERENCES `produitcommandes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `drug_interactions` ADD CONSTRAINT `drug_interactions_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `drug_interactions` ADD CONSTRAINT `drug_interactions_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `drug_interactions` ADD CONSTRAINT `drug_interactions_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `drug_interactions` ADD CONSTRAINT `drug_interactions_second_molecule_id_molecules_id_fk` FOREIGN KEY (`second_molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorite_wholesalers` ADD CONSTRAINT `favorite_wholesalers_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `favorite_wholesalers` ADD CONSTRAINT `favorite_wholesalers_wholesaler_id_companies_id_fk` FOREIGN KEY (`wholesaler_id`) REFERENCES `companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `field_matches` ADD CONSTRAINT `field_matches_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `field_matches` ADD CONSTRAINT `field_matches_alt_product_id_alt_products_id_fk` FOREIGN KEY (`alt_product_id`) REFERENCES `alt_products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `indications` ADD CONSTRAINT `indications_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_offer_conditions` ADD CONSTRAINT `lab_offer_conditions_lab_pack_id_lab_packs_id_fk` FOREIGN KEY (`lab_pack_id`) REFERENCES `lab_packs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_offer_conditions` ADD CONSTRAINT `lab_offer_conditions_lab_product_id_lab_pack_products_id_fk` FOREIGN KEY (`lab_product_id`) REFERENCES `lab_pack_products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_offer_conditions` ADD CONSTRAINT `lab_offer_conditions_reward_product_id_products_id_fk` FOREIGN KEY (`reward_product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_offers` ADD CONSTRAINT `lab_offers_lab_id_companies_id_fk` FOREIGN KEY (`lab_id`) REFERENCES `companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_order_details` ADD CONSTRAINT `lab_order_details_lab_pack_id_lab_packs_id_fk` FOREIGN KEY (`lab_pack_id`) REFERENCES `lab_packs`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_orders` ADD CONSTRAINT `lab_orders_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_pack_products` ADD CONSTRAINT `lab_pack_products_lab_pack_id_lab_packs_id_fk` FOREIGN KEY (`lab_pack_id`) REFERENCES `lab_packs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_pack_products` ADD CONSTRAINT `lab_pack_products_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_pack_wholesalers` ADD CONSTRAINT `lab_pack_wholesalers_lab_pack_id_lab_packs_id_fk` FOREIGN KEY (`lab_pack_id`) REFERENCES `lab_packs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_pack_wholesalers` ADD CONSTRAINT `lab_pack_wholesalers_wholesaler_id_companies_id_fk` FOREIGN KEY (`wholesaler_id`) REFERENCES `companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_packs` ADD CONSTRAINT `lab_packs_lab_offer_id_lab_offers_id_fk` FOREIGN KEY (`lab_offer_id`) REFERENCES `lab_offers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_company_wallets` ADD CONSTRAINT `loyalty_company_wallets_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_company_wallets` ADD CONSTRAINT `loyalty_company_wallets_program_id_loyalty_programs_id_fk` FOREIGN KEY (`program_id`) REFERENCES `loyalty_programs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_orders` ADD CONSTRAINT `loyalty_orders_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_orders` ADD CONSTRAINT `loyalty_orders_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_orders` ADD CONSTRAINT `loyalty_orders_product_id_loyalty_product_program_id_fk` FOREIGN KEY (`product_id`) REFERENCES `loyalty_product_program`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_orders` ADD CONSTRAINT `loyalty_orders_order_line_id_order_details_id_fk` FOREIGN KEY (`order_line_id`) REFERENCES `order_details`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_programs` ADD CONSTRAINT `loyalty_programs_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_programs` ADD CONSTRAINT `loyalty_programs_general_condition_id_general_conditions_id_fk` FOREIGN KEY (`general_condition_id`) REFERENCES `general_conditions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_user_program` ADD CONSTRAINT `loyalty_user_program_program_id_loyalty_programs_id_fk` FOREIGN KEY (`program_id`) REFERENCES `loyalty_programs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_user_program` ADD CONSTRAINT `loyalty_user_program_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `loyalty_user_program` ADD CONSTRAINT `loyalty_user_program_program_tier_id_program_tiers_id_fk` FOREIGN KEY (`program_tier_id`) REFERENCES `program_tiers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `matched_lab_order_delivery_scan` ADD CONSTRAINT `matched_lab_order_delivery_scan_lab_order_id_lab_orders_id_fk` FOREIGN KEY (`lab_order_id`) REFERENCES `lab_orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `matched_lab_order_delivery_scan` ADD CONSTRAINT `matched_lab_order_delivery_scan_scan_id_bl_scan_id_fk` FOREIGN KEY (`scan_id`) REFERENCES `bl_scan`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `matched_lab_order_delivery_scan` ADD CONSTRAINT `matched_lab_order_delivery_scan_scanned_product_id_scanned_products_id_fk` FOREIGN KEY (`scanned_product_id`) REFERENCES `scanned_products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `matched_products` ADD CONSTRAINT `matched_products_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `matched_products` ADD CONSTRAINT `matched_products_alt_product_id_alt_products_id_fk` FOREIGN KEY (`alt_product_id`) REFERENCES `alt_products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `molecule_groups` ADD CONSTRAINT `molecule_groups_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `molecule_infos` ADD CONSTRAINT `molecule_infos_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `molecule_infos` ADD CONSTRAINT `molecule_infos_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `molecule_posologies` ADD CONSTRAINT `molecule_posologies_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notification_system_details` ADD CONSTRAINT `notification_system_details_system_notification_id_notification_sendings_id_fk` FOREIGN KEY (`system_notification_id`) REFERENCES `notification_sendings`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ongoing_offers` ADD CONSTRAINT `ongoing_offers_offer_id_premium_offers_id_fk` FOREIGN KEY (`offer_id`) REFERENCES `premium_offers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ongoing_offers` ADD CONSTRAINT `ongoing_offers_company_id_companies_id_fk` FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `p_categories` ADD CONSTRAINT `p_categories_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `paiementfournisseur` ADD CONSTRAINT `paiementfournisseur_caisse_id_caisses_id_fk` FOREIGN KEY (`caisse_id`) REFERENCES `caisses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pregnancy_risks` ADD CONSTRAINT `pregnancy_risks_synthese_id_syntheses_id_fk` FOREIGN KEY (`synthese_id`) REFERENCES `syntheses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_group` ADD CONSTRAINT `price_group_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_group` ADD CONSTRAINT `price_group_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_group` ADD CONSTRAINT `price_group_price_pharmacy_id_product_prices_id_fk` FOREIGN KEY (`price_pharmacy_id`) REFERENCES `product_prices`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_group` ADD CONSTRAINT `price_group_price_wholesaler_id_product_prices_id_fk` FOREIGN KEY (`price_wholesaler_id`) REFERENCES `product_prices`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_group` ADD CONSTRAINT `price_group_price_lab_id_product_prices_id_fk` FOREIGN KEY (`price_lab_id`) REFERENCES `product_prices`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_adjustments` ADD CONSTRAINT `product_adjustments_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_adjustments` ADD CONSTRAINT `product_adjustments_stock_id_stock_adjustments_id_fk` FOREIGN KEY (`stock_id`) REFERENCES `stock_adjustments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_adjustments` ADD CONSTRAINT `product_adjustments_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_classifications` ADD CONSTRAINT `product_classifications_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_classifications` ADD CONSTRAINT `product_classifications_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_codes` ADD CONSTRAINT `product_codes_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_codes` ADD CONSTRAINT `product_codes_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_formes` ADD CONSTRAINT `product_formes_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_formes` ADD CONSTRAINT `product_formes_forme_id_forms_id_fk` FOREIGN KEY (`forme_id`) REFERENCES `forms`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_imgs` ADD CONSTRAINT `product_imgs_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_insurance_statuses` ADD CONSTRAINT `product_insurance_statuses_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_insurance_statuses` ADD CONSTRAINT `product_insurance_statuses_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_labs` ADD CONSTRAINT `product_labs_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_labs` ADD CONSTRAINT `product_labs_lab_id_companies_id_fk` FOREIGN KEY (`lab_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_labs` ADD CONSTRAINT `product_labs_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_monographs` ADD CONSTRAINT `product_monographs_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_monographs` ADD CONSTRAINT `product_monographs_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_partners` ADD CONSTRAINT `product_partners_partner_id_companies_id_fk` FOREIGN KEY (`partner_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_pcategories` ADD CONSTRAINT `product_pcategories_pcategory_id_p_categories_id_fk` FOREIGN KEY (`pcategory_id`) REFERENCES `p_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_pcategories` ADD CONSTRAINT `product_pcategories_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_posologies` ADD CONSTRAINT `product_posologies_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_prices` ADD CONSTRAINT `product_prices_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_prices` ADD CONSTRAINT `product_prices_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_status` ADD CONSTRAINT `product_status_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_status` ADD CONSTRAINT `product_status_country_id_countries_id_fk` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_insurance_classification_id_insurance_classifications_id_fk` FOREIGN KEY (`insurance_classification_id`) REFERENCES `insurance_classifications`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `program_tiers` ADD CONSTRAINT `program_tiers_program_id_loyalty_programs_id_fk` FOREIGN KEY (`program_id`) REFERENCES `loyalty_programs`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reproductive_healths` ADD CONSTRAINT `reproductive_healths_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reproductive_healths` ADD CONSTRAINT `reproductive_healths_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `setting_pharmacies` ADD CONSTRAINT `setting_pharmacies_setting_id_setting_id_fk` FOREIGN KEY (`setting_id`) REFERENCES `setting`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `setting_pharmacies` ADD CONSTRAINT `setting_pharmacies_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `setting_pharmacies` ADD CONSTRAINT `setting_pharmacies_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_adjustments` ADD CONSTRAINT `stock_adjustments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_adjustments` ADD CONSTRAINT `stock_adjustments_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_pharmacies` ADD CONSTRAINT `stock_pharmacies_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_pharmacies` ADD CONSTRAINT `stock_pharmacies_pharmacy_id_companies_id_fk` FOREIGN KEY (`pharmacy_id`) REFERENCES `companies`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_pharmacies` ADD CONSTRAINT `stock_pharmacies_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_pharmacies` ADD CONSTRAINT `stock_pharmacies_price_pharmacy_product_prices_id_fk` FOREIGN KEY (`price_pharmacy`) REFERENCES `product_prices`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_pharmacies` ADD CONSTRAINT `stock_pharmacies_price_wholesaler_product_prices_id_fk` FOREIGN KEY (`price_wholesaler`) REFERENCES `product_prices`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sub_qualifications` ADD CONSTRAINT `sub_qualifications_qualifications_id_qualifications_id_fk` FOREIGN KEY (`qualifications_id`) REFERENCES `qualifications`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `syntheses` ADD CONSTRAINT `syntheses_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_qualifications` ADD CONSTRAINT `user_qualifications_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_qualifications` ADD CONSTRAINT `user_qualifications_qualification_id_qualifications_id_fk` FOREIGN KEY (`qualification_id`) REFERENCES `qualifications`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_qualifications` ADD CONSTRAINT `user_qualifications_sub_qualification_id_sub_qualifications_id_fk` FOREIGN KEY (`sub_qualification_id`) REFERENCES `sub_qualifications`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `warning_items` ADD CONSTRAINT `warning_items_warnings_for_use_id_warnings_for_uses_id_fk` FOREIGN KEY (`warnings_for_use_id`) REFERENCES `warnings_for_uses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `warning_items` ADD CONSTRAINT `warning_items_molecule_id_molecules_id_fk` FOREIGN KEY (`molecule_id`) REFERENCES `molecules`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `warning_items` ADD CONSTRAINT `warning_items_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `admin_operation_log` (`user_id`);--> statement-breakpoint
CREATE INDEX `role_id_menu_id_idx` ON `admin_role_menu` (`role_id`,`menu_id`);--> statement-breakpoint
CREATE INDEX `role_id_permission_id_idx` ON `admin_role_permissions` (`role_id`,`permission_id`);--> statement-breakpoint
CREATE INDEX `role_id_user_id_idx` ON `admin_role_users` (`role_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `user_id_permission_id_idx` ON `admin_user_permissions` (`user_id`,`permission_id`);--> statement-breakpoint
CREATE INDEX `datepremptionproduits_produits_id_foreign` ON `datepremptionproduits` (`produits_id`);--> statement-breakpoint
CREATE INDEX `filecsvimporters_creer_par_foreign` ON `filecsvimporters` (`creer_par`);--> statement-breakpoint
CREATE INDEX `inventaires_users_id_foreign` ON `inventaires` (`users_id`);--> statement-breakpoint
CREATE INDEX `queue_idx` ON `jobs` (`queue`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `oauth_access_tokens` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `oauth_auth_codes` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `oauth_clients` (`user_id`);--> statement-breakpoint
CREATE INDEX `access_token_id_idx` ON `oauth_refresh_tokens` (`access_token_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `password_resets` (`email`);--> statement-breakpoint
CREATE INDEX `permission_phroles_permission_id_foreign` ON `permission_phroles` (`permission_id`);--> statement-breakpoint
CREATE INDEX `permission_phroles_role_id_foreign` ON `permission_phroles` (`role_id`);--> statement-breakpoint
CREATE INDEX `permission_users_permission_id_foreign` ON `permission_users` (`permission_id`);--> statement-breakpoint
CREATE INDEX `tokenable_type_tokenable_id_idx` ON `personal_access_tokens` (`tokenable_type`,`tokenable_id`);--> statement-breakpoint
CREATE INDEX `pharmacy_id` ON `pharmacy_produits` (`pharmacy_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `pharmacy_produits` (`product_id`);--> statement-breakpoint
CREATE INDEX `phrole_users_role_id_foreign` ON `phrole_users` (`role_id`);--> statement-breakpoint
CREATE INDEX `prixproduits_produits_id_foreign` ON `prixproduits` (`produits_id`);--> statement-breakpoint
CREATE INDEX `produits_types_id_foreign` ON `produits` (`types_id`);--> statement-breakpoint
CREATE INDEX `produits_classes_id_foreign` ON `produits` (`classes_id`);--> statement-breakpoint
CREATE INDEX `produits_forms_id_foreign` ON `produits` (`forms_id`);--> statement-breakpoint
CREATE INDEX `produits_dcis_id_foreign` ON `produits` (`dcis_id`);--> statement-breakpoint
CREATE INDEX `name` ON `produits` (`name`);--> statement-breakpoint
CREATE INDEX `code_bare` ON `produits` (`code_bare`);--> statement-breakpoint
CREATE INDEX `regularisationsoldes_caisse_id_foreign` ON `regularisationsoldes` (`caisse_id`);--> statement-breakpoint
CREATE INDEX `FK_remise_type` ON `remise_client` (`type_id`);--> statement-breakpoint
CREATE INDEX `FK_remise_client` ON `remise_client` (`client_id`);--> statement-breakpoint
CREATE INDEX `retoursurventes_caisse_id_foreign` ON `retoursurventes` (`caisse_id`);--> statement-breakpoint
CREATE INDEX `FK_listeroleslistepages` ON `rolesactions` (`id_pages`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `last_activity_idx` ON `sessions` (`last_activity`);--> statement-breakpoint
CREATE INDEX `user_questionnaires_questionnaire_id_foreign` ON `user_questionnaires` (`questionnaire_id`);--> statement-breakpoint
CREATE INDEX `ventes_caisse_id_foreign` ON `ventes` (`caisse_id`);--> statement-breakpoint
CREATE INDEX `villes_pays_id_foreign` ON `villes` (`pays_id`);