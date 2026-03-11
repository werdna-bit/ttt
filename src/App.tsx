import { useState } from "react";
import Game from "./components/ui/game";
import HomePage from "./components/ui/homepage";

export type StateType = "homepage" | "playing";

export default function App() {
	const [state, setState] = useState<StateType>("playing");

	return (
		<div className="w-full h-full bg-[#f0ede9]">
			{state === "homepage" ? <HomePage setState={setState} /> : <Game />}
		</div>
	);
}
