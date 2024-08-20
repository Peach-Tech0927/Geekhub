import { handleSignin } from "../../serverActions/serverAction";

export default async function SigninButton() {
  return (
    <form action={handleSignin}>
      <button type="submit">Signin</button>
    </form>
  );
}
