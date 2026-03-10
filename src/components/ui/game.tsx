import { useState } from "react";
export default function Game() {
	const [turn, setTurn] = useState<"X" | "O">("O");
	const [picks, setPicks] = useState<number[]>([]);

	const handlePick = (index: number) => {
		//check if already picked
		const isPicked = picks.includes(index);
		if (isPicked) return;
		picks.push(index);
		setTurn(turn === "X" ? "O" : "X");
	};

	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<div className="grid grid-cols-3 w-full max-w-lg mx-auto gap-4">
				{Array.from({ length: 9 }, (_, i) => (
					<button
						type="button"
						disabled={picks.includes(i)}
						key={i}
						onClick={() => handlePick(i)}
						className={`w-full aspect-square border border-4 rounded-4xl button cursor-pointer ${picks.includes(i) ? "pointer-events-none" : ""}`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
}
