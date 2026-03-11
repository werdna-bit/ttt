import type { SetStateAction } from "react";
import type { StateType } from "../../App";
import Logo from "../icons/Logo";

interface Props {
	setState: React.Dispatch<SetStateAction<StateType>>;
}
export default function HomePage({ setState }: Props) {
	return (
		<div className="h-full w-full flex flex-col gap-6 md:gap-12 items-center justify-center">
			<Logo />
			<button
				type="button"
				onClick={() => setState("playing")}
				className="font-[600] px-4 p-2 text-2xl w-full max-w-[230px] rounded-lg button2 border border-3 shadow-[0px_4px] cursor-pointer"
			>
				Play
			</button>
		</div>
	);
}
