import Dishes from "@/components/Dishes/Dishes";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await Promise.resolve(searchParams);
  const category = params?.category;


  return (
    <main>
      <Dishes category={category} />
    </main>
  );
}

