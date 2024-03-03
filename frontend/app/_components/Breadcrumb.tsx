import Link from "next/link";

import { FaLongArrowAltRight } from "react-icons/fa";


interface Props {
    items: {
        title: String,
        link: String,
        active: Boolean
    }[]
}

export default function Breadcumb({items}: Props) {
    return (
        <>
        {
            items?
            <div className="breadcumb p-4 mb-6 bg-gray-100">
            <ul className="breadcumb__list flex flex-row flex-nowrap align-middle">
                {
                    items.map(item => (
                        <li key={`${item.title}`} className="breadcumb__item me-4 text-primary font-semibold">
                            <Link className="text-primary" href={`${item.link}`} >
                                {item.title}
                                <FaLongArrowAltRight className="ms-4 inline" />
                            </Link>
                        </li>
                    ))
                }
                
            </ul>
        </div>
        :
        ""
        }
        </>
    )
}