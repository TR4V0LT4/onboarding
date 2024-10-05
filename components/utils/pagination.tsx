import Vector20 from "@/public/Vector20.svg";
import PaginationButton from "./paginationbutton";
import { redirect } from "next/navigation";

export default function Pagination({ page, url, pageNumber, search }: { page: number, url: string, pageNumber: number, search?: string }) {
	if (!Number.isInteger(pageNumber))
		pageNumber = Math.floor(pageNumber) + 1;
	if (page > pageNumber)
		redirect(url + `?page=1`);
	const	visibleButtons = Array<number | string>(7);
	let		length = 5;

	visibleButtons[0] = 1;
	if (pageNumber > 1)
		visibleButtons[6] = pageNumber;
	if (page - 1 >= 4 && pageNumber > 7) {
		visibleButtons[1] = "...";
		length--;
	}
	if (pageNumber - page >= 4 && pageNumber > 7) {
		visibleButtons[5] = "...";
		length--;
	}
	if (pageNumber <= 7)
		length = pageNumber - 2;
	for (let i = 0; i < length; i++) {
		if (visibleButtons[1] == "..." && visibleButtons[5] == "...") {
			visibleButtons[i + 2] = page - 1 + i;
		}
		else if (visibleButtons[5] == "...") {
			visibleButtons[i + 1] = i + 2;
		}
		else if (visibleButtons[1] == "...") {
			visibleButtons[i + 2] = pageNumber - 4 + i;
		}
		else {
			visibleButtons[i + 1] = i + 2;
		}
	}

	return (
		<div
			className="flex gap-[22px] justify-center p-[20px]"
		>
			<PaginationButton
				content={
					<Vector20
						stroke={ page < 2 ? "#CED2DA" : "#344051" }
					/>
				}
				url={url}
				page={page - 1}
				disabled={page < 2}
				search={search}
			/>
			{
				visibleButtons.map((a, i) => {
					return (
						<PaginationButton
							content={ a }
							url={url}
							page={ typeof a == "string" ? 0 : a }
							key={i}
							current={page}
							search={search}
						/>
					)
				})
			}
			<PaginationButton
				content={
					<div
						className="rotate-180"
					>
						<Vector20
							stroke={ page > pageNumber - 1 ? "#CED2DA" : "#344051" }
						/>
					</div>
				}
				url={url}
				page={page + 1}
				disabled={page > pageNumber - 1}
				search={search}
			/>
		</div>
	);
}
