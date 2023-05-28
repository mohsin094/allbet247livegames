# متد های سرور
---

### توضیحات مهم

تمامی فرمت های اطلاعات بازگشتی از سمت سرور همانند نمونه میباشند.

```json
{
result: boolean,
data: Mixed,
errors: Mixed
}

```

مقدار result همواره وجود خواهد داشت و نشانگر موفقیت آمیر بودن عملیات درخواستی میباشد.
مقادیر data و errors ممکن است همیشه وجود نداشته باشند و در شرایط مختلف بسته به آدرسی که درخواست به آن ارسال میکنید ممکن است وجود داشته باشند و یا محتوای مختلفی را دارا باشند.

فراخوانی یک سرویس تنها با ارسال شناسه ی سشن امکان پذیر است که در هدر X-SESS-ID باستی ارسال شود.
متد های user/login و user/is-login برای فراخوانی به شناسه سشن نیازی ندارند.


* [user/login](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#8dd60f02-c595-4f9a-af2a-05293989cbeb)
لاگین توسط سرور
* [user/is-login](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#b1d0eaeb-b852-482a-84ef-c5de5449a090)
بررسی اینکه آیا لاگین هستید
* [room/create](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#694fc5e5-6b2e-4690-ab1c-6a11e4997705)
ایجاد یک اتاق چت
* [room/get](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#b1896360-8ae0-4a44-bc3d-87fbc31ab284)
دریافت اطلاعات یک اتاق تعریف شده
* [room/update](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#6cc60894-c329-441f-8906-7e7cc3af0ee6)
بروزرسانی یک اتاق تعریف شده
* [room/delete](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#41424077-695d-4c85-b14e-2bc15551c90b)
حذف یک اتاق تعریف شده
* [room/end](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#27723b3c-8dd3-4396-afcb-7993a7d1cdba)
پایان یک اتاق تعریف شده
* [room/fetch-archive](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#e41e8b52-7e7e-4371-97c7-b49d99c382db)
دریافت کلیه ی اطلاعات ارشیو یک اتاق پس از پایان آن
* [room/user-add-list](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#268fbda8-ee8f-40e7-993e-236f8ceed77b)
افزودن لیست کاربری به اتاق
* [room/user-update](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#10454a53-ae8e-42a9-9ef3-0272502cf201)
بروزرسانی کاربران اضافه شده به اتاق
* [room/user-delete](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#41424077-695d-4c85-b14e-2bc15551c90b)
حذف یک کاربر از اتاق