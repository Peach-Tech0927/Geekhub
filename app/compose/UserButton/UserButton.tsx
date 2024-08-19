//  Geekhub/app/compose/UserButton/UserButton.tsx
import React from "react";

import { auth } from "@/auth";

import SigninButton from "../SigninButton/SigninButton";
import layout from "./userButton.module.scss";

export default async function UserButton() {
  const session = await auth();

  let imgPath =
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/Microsoft_Account_Logo.svg";

  //sesstionが無ければsigninを表示
  if (!session?.user)
    return (
      <div>
        <SigninButton />
        <img className={layout.userAccountImg} src={imgPath} />
      </div>
    );

  imgPath = session.user.image as string;
  return (
    <div>
      <img className={layout.userAccountImg} src={imgPath} />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <br />
    </div>
  );
}
