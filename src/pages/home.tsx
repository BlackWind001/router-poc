import Link from "../router/Link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>
        Here is the link to <Link href="/about">about section</Link>
      </p>
    </>
  );
}
