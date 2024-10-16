export const Trash = ({ marker, addRejectedId }: any) => {
	return (
      	<svg 
      		viewBox="0 0 20 20" 
      		width="20" 
      		style={{position: "absolute", zIndex: "10", right: "-20", top: "-10", cursor: "pointer"}}
      		onClick={(e: any) => addRejectedId(e, marker)}
      	>
      		<circle
      			cx={10}
      			cy={10}
      			r={9}
      		/>
      		<line
				x1={5}
				x2={15}
				y1={5}
				y2={15}
				stroke="rgba(255, 255, 255, 1)"
				strokeWidth="2"
			/>
			<line
				x1={15}
				x2={5}
				y1={5}
				y2={15}
				stroke="rgba(255, 255, 255, 1)"
				strokeWidth="2"
			/>
			<rect
				x={0}
				y={0}
				width={20}
				height={20}
				fill="transparent"
			/>
		</svg>
	)
}