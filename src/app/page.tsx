import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
      window.location.href = "/main.html";
    }, []);
  
    return <div>Redirecting...</div>;
}
