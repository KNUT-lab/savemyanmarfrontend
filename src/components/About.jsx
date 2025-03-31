import { Header } from "./Header";
export function About() {
  return (
    <div>
      <Header />
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">
          Myan Safe အကြောင်း
        </h2>
        <p class="text-gray-600 mb-4">
          Myan Safe သည် မြန်မာနိုင်ငံတွင် အရေးပေါ်အခြေအနေများ ဖြစ်ပွားသည့်အခါ
          လူများအား ကူညီရန် တည်ထောင်ထားသော အရေးပေါ်တုံ့ပြန်မှုပလက်ဖောင်းဖြစ်သည်။
          ကျွန်ုပ်တို့၏မစ်ရှင်မှာ လိုအပ်သူများကို ရရှိနိုင်သော
          အရင်းအမြစ်များနှင့် အရေးပေါ်ဝန်ဆောင်မှုများနှင့် ချိတ်ဆက်ပေးခြင်း
          ဖြစ်သည်။
        </p>
      </div>
    </div>
  );
}
