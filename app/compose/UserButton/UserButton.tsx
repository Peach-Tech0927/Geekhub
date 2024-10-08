import React from "react";
import { auth } from "@/auth";
import SigninButton from "../SigninButton/SigninButton";

export default async function UserButton() {
  const session = await auth();
  const defaultImgPath =
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/Microsoft_Account_Logo.svg";
  const imgPath = session?.user?.image || defaultImgPath;

  return !session?.user ? (
    <div>
      <SigninButton />
      <img src={defaultImgPath} />
    </div>
  ) : (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <img src={imgPath} />
    </div>
  );
}
