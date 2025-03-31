import { Header } from "./Header";
export function Home() {
  return (
    <div class="text-center">
      <Header />
      <div class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-blue-800 mb-4">
          Myan Safe မှ ကြိုဆိုပါတယ်။
        </h2>
        <p class="text-gray-600 mb-6">
          Myan Safe သည် မြန်မာနိုင်ငံအတွက် အရေးပေါ်တုံ့ပြန်မှုပလက်ဖောင်းဖြစ်သည်။
          အရေးပေါ်အခြေအနေများတွင် အကူအညီလိုအပ် နေသူများကို
          အရေးပေါ်ဝန်ဆောင်မှုများနှင့် လိုအပ်သော အရင်းအမြစ်များဖြင့်
          ချိတ်ဆက်ပေးနိုင်ရန် ပြုလုပ်ထားခြင်းဖြစ်ပါသည််။
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-blue-700 mb-2">
              အကူအညီလိုပါသလား?
            </h3>
            <p class="mb-4">
              အရေးပေါ်အကူအညီနှင့် လိုအပ်သော အရင်းအမြစ်များကို တောင်းခံပါ
            </p>
            <a
              href="/get-help"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              အခုပဲ အကူအညီရယူပါ
            </a>
          </div>
          <div class="bg-blue-50 p-6 rounded-lg shadow-sm">
            <h3 class="text-xl font-semibold text-blue-700 mb-2">
              အကူအညီတောင်းခံမှုများကို ကြည့်ရှုရန်
            </h3>
            <p class="mb-4">
              သင့်ဧရိယာရှိ လက်ရှိအရေးပေါ်တောင်းခံမှုများကို ကြည့်ရှုပါ။
            </p>
            <a
              href="/help-list"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            >
              အကူအညီစာရင်းကို ကြည့်ရှုရန်
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
