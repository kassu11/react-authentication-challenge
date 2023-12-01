import { useState, useEffect } from "react";

export function useBox(type) {
	const [checked, setChecked] = useState("");

	return {
		type,
		checked,
		onChange: (e) => setChecked(e.target.checked),
	};
}
