# فایل های تنظیمات و توضیحات مربوط به آنها

---

سیستم دارای ۲ فایل تنظیمات میباشد:

* .env
* configs folder


### .env

```text

#ENV can be dev, prod, test
ENV=dev
DEBUG=true
SINGLE_DB=true
SOCKET_USE_ADAPTER=false

```

ENV: همان محیط اجرایی است که میتواند پارامتر های test, production, dev را طبق دستور عمل نوشته شده بالا داشته باشد.

DEBUG: در حالت دیباگ ممکن است اطلاعاتی در پاسخ به درخواست های وب سرویس و همچنین کنسول ارسال شود.

SINGLE_DB: آیا برنامه با یک دیتابیس ردیس کار کند؟

SOCKET_USE_ADAPTER: آیا برای هماهنگ سازی نود ها از ردیس اداپتر در سوکت استفاده شود؟ (در زمانی که از یک وب سرور استفاده میکنید فالس باشد.)

### config folders

مطابق با محیط اجرای برنامه فایل های کانفیگ در برنامه استفاده میشوند.
که شامل ۳ مدل فایل میباشد.

PROD: configs.json

TEST: configs.test.json

DEV: configs.local.json

همچنین فایل هایی با پسوند .example تنها نمونه ای از هر کدام از این فایل ها میباشند که میتوانید محتوای هر کدام را کپی کرده و در فایلی همنام بدون پسوند .example بگذارید
و برنامه را اجرا کنید.

توضیح برخی پارامتر ها:

```json

{
  "params": {
  // حداکثر سایز یک پکت http
    "httpRequestSizeLimit": "10mb",
    // پیشوند کوکی ها
    "cookiePrefix": "httpCookie_",
    // هدر سشن ها برای استفاده در وب سرویس وب
    "sessionHttpHeader": "X-SESS-ID",

    // هاستی که برنامه روی آن اجرا میشود
    "host": "*",

    // توکن ادمین جهت احراز هویت کاربر ادمین در ای پی ای سرور
    "adminWebServiceToken": "0fb52d40-7277-41d6-9c74-ff3a160b6297"
  },
  "session": {

  // مدت زمان اعتبار سشن
    "ttl": 86400,
    "autoStart": true
  },
  "server": {
    "http": {
    // پورت اجرا شدن وب سرور
      "port": 3002
    },
    "socket": {
    // پورت اجرا شدن سوکت سرور
      "port": 3001,
      "path": "/chat"
    }
  },
  "db": {
    "redis": {

    // اطلاعات سرور ردیس
      "host": "localhost",
      "username": "",
      "password": "",
      "port": 6379,

      // اطلاعات سرورهای سنتینل
      "sentinels": [
        {
          "host": "localhost",
          "username": "",
          "password": "",
          "port": 26380
        },
        {
          "host": "localhost",
          "username": "",
          "password": "",
          "port": 26379
        }
      ]
    },
    // غیرفعال و استفاده نشده است
    "mongodb": {
      "host": "localhost",
      "user": "root",
      "password": "",
      "port": 6379
    }
  },
  "fs": {

  }
}

```