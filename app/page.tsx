import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from("documents").select();
  const content = data?.map((doc) => doc.content);

  return <pre>{JSON.stringify(content, null, 2)}</pre>;
}
