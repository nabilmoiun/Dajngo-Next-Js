import {Inter} from "next/font/google";


const inter = Inter({subsets: ["latin"]})

export default function Heading({title}: {title: String}) {
    return (
        <h3 className={` ${inter.className} block text-dark heading`}>{title}</h3>
    )
}