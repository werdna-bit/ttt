import { useEffect, useRef, useState } from "react";
import O from "../icons/O";
import X from "../icons/X";

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
	const ref0 = useRef<HTMLButtonElement>(null);
	const ref1 = useRef<HTMLButtonElement>(null);
	const ref2 = useRef<HTMLButtonElement>(null);
	const ref3 = useRef<HTMLButtonElement>(null);
	const ref4 = useRef<HTMLButtonElement>(null);
	const ref5 = useRef<HTMLButtonElement>(null);
	const ref6 = useRef<HTMLButtonElement>(null);
	const ref7 = useRef<HTMLButtonElement>(null);
	const ref8 = useRef<HTMLButtonElement>(null);
	const buttonRefs = [ref0, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8];

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

	const getCenter = (ref: React.RefObject<HTMLButtonElement | null>) => {
		if (!ref.current) return null;
		const rect = ref.current.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		};
	};
	const start = getCenter(buttonRefs[winningScenario?.[0] ?? 0]);
	const end = getCenter(buttonRefs[winningScenario?.[2] ?? 0]);

	const handleReset = () => {
		setPicks([]);
		setWinner(null);
		setWinningScenario([]);
	};

	useEffect(() => {
		if (!winner || !winningScenario) return;
		setTimeout(() => {
			//game won animation
		}, 1000);
	}, [winner, winningScenario]);

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
				{Array.from({ length: 9 }).map((_, i) => (
					<button
						key={i}
						ref={buttonRefs[i]}
						type="button"
						tabIndex={i}
						onClick={() => handlePick(i)}
						disabled={picks.includes(i)}
						className={`w-full aspect-square p-8 ${picks.includes(i) ? (picks.indexOf(i) % 2 === 0 ? "bg-[#CCC9FF]" : "bg-[#F7E7AF]") : "button"} overflow-auto border border-4 rounded-4xl relative  cursor-pointer ${winner || picks.includes(i) ? "pointer-events-none" : ""}`}
					>
						<div
							className={` transition-all font-bold text-6xl duration-300 ease-in-out ${picks.includes(i) ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
						>
							{picks.indexOf(i) % 2 === 0 ? <X /> : <O />}
						</div>
					</button>
				))}
			</div>

			<div
				style={{
					position: "absolute",
					left: start?.x,
					top: start?.y,
					width: Math.hypot(
						(end?.x ?? 0) - (start?.x ?? 0),
						(end?.y ?? 0) - (start?.y ?? 0),
					),
					boxShadow: "0 0 0 10px #FF540A, 0 0 0 20px #ff540a40",
					height: 16,
					transition: "width 600ms ease-in-out",
					transform: `rotate(${(Math.atan2((end?.y ?? 0) - (start?.y ?? 0), (end?.x ?? 0) - (start?.x ?? 0)) * 180) / Math.PI}deg)`,
					transformOrigin: "0 50%",
				}}
				className={`bg-[#FFDE66] rounded-full ${winner ? "opacity-100" : "opacity-0"}`}
			/>

			<button
				onClick={handleReset}
				type="button"
				className="font-[600] px-4 p-2 text-2xl mt-4 w-full max-w-[230px] rounded-lg button2 border border-3 shadow-[0px_4px] cursor-pointer"
			>
				Restart
			</button>
		</div>
	);
}
