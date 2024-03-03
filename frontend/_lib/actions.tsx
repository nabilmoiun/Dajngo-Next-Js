"use server";

import {redirect, permanentRedirect} from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

export async function redirectToPath(currentPath: String, newPath: String, permament: Boolean) {
  if(!permament) {
    revalidatePath(`${currentPath}`);
    redirect(`${newPath}`);
  }
  else {
    revalidateTag(`${currentPath}`);
    permanentRedirect(`${newPath}`);
  }

}
