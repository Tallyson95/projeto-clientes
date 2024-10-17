import LoadAnimation from "../assets/loadRoxo.json";
import { Player } from "@lottiefiles/react-lottie-player";

export function Load() {
	return (
		<>
			<Player
				autoplay
				loop
				style={{ width: "150px", height: "150px" }}
				src={LoadAnimation}
			/>
		</>
	);
}
