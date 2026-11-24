# HUQUQCHIUZ imtihon platformasi

## Deploy: faqat GitHub + Vercel (natijalarni saqlash uchun GitHub repo ishlatiladi)

1. ZIP'ni oching va barcha fayllarni GitHub repository'ga yuklang.
2. GitHub'da imkon qadar **private repository** yarating.
3. Vercel'da Add New → Project → GitHub repository'ni tanlab Deploy qiling.
4. GitHub → Settings → Developer settings → Personal access tokens → Fine-grained token yarating. Faqat shu repository uchun `Contents: Read and write` ruxsatini bering.
5. Vercel → Project → Settings → Environment Variables ichiga kiriting:
   - `GH_TOKEN` = yuqorida yaratilgan GitHub token
   - `GH_REPO` = `github_username/repository_name` (masalan `huquqchiuz/imtihon`)
   - `ADMIN_PASSWORD` = o'zingiz belgilagan kuchli admin paroli
   - `OPENAI_API_KEY` = ixtiyoriy; AI yozma javobni semantik tekshirishi uchun kerak. Bu bo'lmasa yozma javoblar qabul qilinadigan javoblar ro'yxati bo'yicha tekshiriladi.
6. Redeploy qiling.

## Havolalar
- O'quvchi: `https://your-project.vercel.app`
- Admin: `https://your-project.vercel.app/admin.html`

Admin sahifasida `ADMIN_PASSWORD` qiymatini parol sifatida kiriting. Natijalar GitHub repo ichidagi `data/results.json` faylida saqlanadi va admin paneldan ko'rinadi.

## Eslatma
- Natijalarni saqlash uchun Vercel serverless API GitHub Contents API'dan foydalanadi. GitHub token faqat server environment'da qoladi, brauzerga berilmaydi.
- AI semantik baholash uchun OpenAI API key va API billing talab qilinadi. Faqat GitHub + Vercel'ning o'zida AI modeli mavjud emas. AI kaliti kiritilmasa aniq javoblar ro'yxati va normalizatsiya ishlaydi.
- Ko'p sonli bir vaqtdagi topshiruvlarda bitta JSON faylga yozish GitHub API konfliktiga olib kelishi mumkin; kichik imtihonlar uchun mos.
- Test javob kaliti yuklangan hujjatdan olindi; e'lon qilishdan oldin huquqiy manba bilan tekshiring.
