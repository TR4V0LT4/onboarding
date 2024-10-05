import PrimaryButton from "../utils/primarybutton";
import SecondaryButton from "../utils/secondarybutton";

export default function NavigationButtons() {
	return (
		<div
			className="flex justify-end gap-[8px] h-[40px]"
		>
			<SecondaryButton
				content="Afficher les bons de commande annulés"
			/>
			<PrimaryButton
				content="Nouvelle commande (n)"
			/>
		</div>
	)
}