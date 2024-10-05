"usw clinet";

import { CardContent, CardHeader } from "../ui/card";
import MiddleSection from "./midddlesection";
import SelectWant from "./selectwant";

export default function LeftSection() {
	return (
		<div
			className="flex justify-between pr-5 flex-grow flex-col header:flex-row p-5 gap-3"
		>
			<CardHeader className="p-0">
				<SelectWant />
			</CardHeader>
			<CardContent
				className="p-0"
			>
				<MiddleSection />
			</CardContent>
		</div>
  );
}
