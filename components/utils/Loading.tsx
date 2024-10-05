export default function Loading({ stroke }: { stroke: string }) {
	return (
		<div className="flex justify-center items-center animate-spin">
			<svg
				width={40}
				height={40}
				viewBox='0 0 40 40'
			>
				<circle
					cx="20"
					cy="20"
					r="17.5"
					fill="none"
					strokeWidth="5"
					stroke={stroke}
					strokeLinecap="round"
					strokeDasharray={50}
				></circle>
			</svg>
		</div>
	)
}