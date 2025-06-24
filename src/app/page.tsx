import Dishes from "@/components/Dishes/Dishes";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams?.category;
  return (
    <main>
      <Dishes
        category={category}
      />
    </main>
  );
}
