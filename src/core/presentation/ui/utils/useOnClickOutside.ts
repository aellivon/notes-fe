import { useEffect, useState, useCallback } from "react";

export const useOnClickOutside = (setter: (bool: boolean) => void): [(node: any) => void] => {
    const [ele, setEle] = useState<HTMLDivElement | null>(null)
    const eleCallback = useCallback((node: HTMLDivElement) => { 
    setEle(node) }, [])

    useEffect(() => {
        if (ele === null) return;

        const handleClick = (e: any) => {
            if (ele.contains(e.target)) return;
            setter(false)
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ele]);

 return [eleCallback]
};

export default useOnClickOutside;
