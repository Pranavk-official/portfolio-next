"use client"
import Lanyard from "@/components/Lanyard";

export default function Page() {
    return (
        <>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
        </>
    );
}