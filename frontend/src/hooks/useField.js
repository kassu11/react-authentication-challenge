import { useState, useEffect } from "react";

export function useField(type) {
	const [value, setValue] = useState("");

	return {
		type,
		value,
		onChange: (e) => setValue(e.target.value),
	};
}
