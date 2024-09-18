
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export async function Button1() {
    const router = useRouter();
    const handleClick = () => {
        router.push('/dashboard');   
     // Navigate to the "/about" page
      };
  return (
    <div className="z-10 flex min-h-[4rem] items-center ">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
       <button onClick={handleClick} className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Order now
        </button>
      </div>
    </div>
  );
}
