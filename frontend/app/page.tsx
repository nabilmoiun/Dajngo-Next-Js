"use server";

import Modal from "./_components/Modal";
import Folder from "@/app/_components/Folder";
import { getFolders } from "./_api/storage/route";
import Heading from "./_components/Heading";
import Button from "./_components/Button";
import Link from "next/link";
import React from "react";

export default async function Home() {

  const data = await getFolders();

  const handleSubmit = (event: React.ChangeEvent) => {
    console.log("clicked button");
  }

  return (
  
      <div className="content">
        <div className="content__top flex flex-row justify-between">
          <Heading title="My Folders" />
          {/* <Button text="Create new folder" /> */}
          <Link className="btn btn-primary mt-4 mb-8" href="/folders/create" >Create new folder</Link>
        </div>
        {
          data?
          <Folder folders={data}/>
          :
          <Link className="btn btn-primary" href="/" >Create new folder</Link>
        }
      </div>
      
  );
}
