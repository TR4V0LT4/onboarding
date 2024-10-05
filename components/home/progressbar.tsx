export default function ProgressBar () {
	const	offset1 = 30 * Math.PI * 2;
	const	offset2 = 16.57 * Math.PI * 2;
	const	offset3 = 4.92 * Math.PI * 2;

	return (
		<svg
			width={65}
			height={65}
			viewBox='0 0 65 65'
			className="rotate-[-90deg]"
		>
			<circle
				cx={32.5}
				cy={32.5}
				r={30}
				fill='none'
				stroke='#F2F3F9'
				strokeWidth={5}
			/>
			<circle
				cx={32.5}
				cy={32.5}
				r={30}
				fill='none'
				stroke='#4524F8'
				strokeWidth={5}
				strokeDasharray={offset1}
				strokeDashoffset={offset1 - (73 / 100) * offset1}
				strokeLinecap='round'
			/>
			<circle
				cx={32.5}
				cy={32.5}
				r={16.57}
				fill='none'
				stroke='#F2F3F9'
				strokeWidth={5}
			/>
			<circle
				cx={32.5}
				cy={32.5}
				r={16.57}
				fill='none'
				stroke='#FF7049'
				strokeWidth={5}
				strokeDasharray={offset2}
				strokeDashoffset={offset2 - (33 / 100) * offset2}
				strokeLinecap='round'
			/>
			<circle
				cx={32.5}
				cy={32.5}
				r={4.92}
				fill='none'
				stroke='#F2F3F9'
				strokeWidth={5}
			/>
			<circle
				cx={32.5}
				cy={32.5}
				r={4.92}
				fill='none'
				stroke='#20C997'
				strokeWidth={5}
				strokeDasharray={offset3}
				strokeDashoffset={offset3 - (13 / 100) * offset3}
				strokeLinecap='round'
			/>
		</svg>
	);	
};
