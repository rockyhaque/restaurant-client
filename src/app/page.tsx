import Dishes from "@/components/Dishes/Dishes";

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <main>
      <Dishes
        category={searchParams.category}
        searchQuery={searchParams.search}
      />
    </main>
  );
}
