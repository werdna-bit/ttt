import { useState } from "react";

const winscenarios = [
	[0, 1, 2],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[3, 4, 5],
	[6, 7, 8],
	[2, 4, 6],
	[0, 4, 8],
];
type WinType = (typeof winscenarios)[number];

export default function Game() {
	const [picks, setPicks] = useState<number[]>([]);
	const [winner, setWinner] = useState<"x" | "o" | null>(null);
	const [winningScenario, setWinningScenario] = useState<WinType>();

	const handlePick = (index: number) => {
		if (winner) return;
		//check if already picked
		const isPicked = picks.includes(index);
		if (isPicked) return;
		const newPicks = [...picks, index];
		setPicks(newPicks);

		//check if any win states reached
		const xPicks = newPicks.filter((_, i) => i % 2 === 0);
		const oPicks = newPicks.filter((_, i) => i % 2 !== 0);

		const xWinScenario = winscenarios.find((scenario) =>
			scenario.every((i) => xPicks.includes(i)),
		);
		const oWinScenario = winscenarios.find((scenario) =>
			scenario.every((i) => oPicks.includes(i)),
		);

		if (xWinScenario) {
			setWinner("x");
			setWinningScenario(xWinScenario);
		} else if (oWinScenario) {
			setWinner("o");
			setWinningScenario(oWinScenario);
		}
	};

	return (
		<div className="h-full w-full flex flex-col items-center justify-center max-w-4xl mx-auto flex flex-col gap-4">
			<div className="grid grid-cols-3 col-span-3 w-full max-w-lg mx-auto gap-4 mb-10">
				<div
					className={`w-full ${picks.length % 2 !== 0 && "border-[#ff540a]"} transition-all duration-300 ease-in-out bg-[#ccc9ff] p-2 border border-4 rounded-2xl flex items-center gap-2 justify-center text-3xl font-[500] pointer-events-none`}
				>
					<span>X</span>
					<span>2</span>
				</div>

				<div
					className={`w-full p-2 border border-4 bg-white rounded-2xl flex items-center gap-2 justify-center text-3xl font-[500] pointer-events-none`}
				>
					<span>T</span>
					<span>2</span>
				</div>

				<div
					className={`w-full p-2 ${picks.length % 2 === 0 && "border-[#ff540a]"} transition-all duration-300 ease-in-out border bg-[#f7e7af] border-4 rounded-2xl flex items-center gap-2 justify-center text-3xl font-[500] pointer-events-none`}
				>
					<span>0</span>
					<span>2</span>
				</div>
			</div>
			<div className="grid grid-cols-3 w-full max-w-lg relative mx-auto gap-4">
				{Array.from({ length: 9 }, (_, i) => (
					<button
						type="button"
						disabled={picks.includes(i)}
						key={i}
						onClick={() => handlePick(i)}
						className={`w-full aspect-square overflow-auto border border-4 rounded-4xl relative button relative cursor-pointer ${picks.includes(i) ? "pointer-events-none" : ""}`}
					>
						{picks.includes(i)
							? picks.indexOf(i) % 2 === 0
								? "X"
								: "O"
							: null}
						<span
							className={`absolute w-[300px] ${i === winningScenario[0] ? "bg-red-400" : ""} h-6 rounded-full  w-6 left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2`}
						></span>
					</button>
				))}
			</div>
		</div>
	);
}
