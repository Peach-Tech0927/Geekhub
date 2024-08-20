import React from "react";

import { auth } from "@/auth";

import SigninButton from "../SigninButton/SigninButton";

export default async function UserButton() {
  const session = await auth();

  let imgPath =
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/Microsoft_Account_Logo.svg";

  //sesstionが無ければsigninを表示
  if (!session?.user)
    return (
      <div>
        <SigninButton />
      </div>
    );

  imgPath = session.user.image as string;
  return (
    <div>
      <p>認証に成功</p>
    </div>
  );
}
