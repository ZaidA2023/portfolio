import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
      window.location.href = "/index.html";
    }, []);
  
    return <div>Redirecting...</div>;
}
