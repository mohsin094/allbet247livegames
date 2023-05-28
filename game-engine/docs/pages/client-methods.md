# متد های کلاینت
---

### توضیحات مهم

تمامی فرمت های اطلاعات بازگشتی از سمت سرور همانند نمونه میباشند.

```json
{
result: boolean,
data: Mixed,
errors: Mixed,
socketStatus: Integer, (HTTP STATUS)
}

```

مقدار result و socketStatus همواره وجود خواهد داشت و نشانگر موفقیت آمیر بودن عملیات درخواستی و دیگری کد شبیه سازی شده ی http میباشد.
مقادیر data و errors ممکن است همیشه وجود نداشته باشند و در شرایط مختلف بسته به آدرسی که درخواست به آن ارسال میکنید ممکن است وجود داشته باشند و یا محتوای مختلفی را دارا باشند.

ارتباط سوکت با ساخت یک کلاینت شکل میگیرد که بصورت زیر میتوانید ارتباط کلاینت سوکت خود را در آدرس /chat بسازید.

```javascript

new io(`${params.baseUrl}/room/:roomId`, {
    path: '/chat',
    auth: {
        'X-SESS-ID': 'myToken',
        userId: 'user_id'
    }
});

```
در این مثال یک ارتباط سوکت در روم :roomId که در بخش سرور و از قبل در ایجاد سرور این سشناسه تعریف شده است ایجاد میگردد.
مقدار X-SESS-ID همان توکن کاربری است که در بخش سرور توسط room/user-add-list به سرور چت ارسال گردیدیده است.
userId نیز شناسه ی کاربری میباشد که در بخش سرور به سرور چت ارسال گردیده.

پس از ایجاد یک سوکت جدید شما میتوانید از event های زیر جهت دریافت دیتا و از emit ها جهت ارسال دیتا استفاده کنید.
نکته ی بسیار مهم در ارتباط و ایجاد یک ارتباط سوکت و مطابقت آن با رفرنس ها (مستندات) این است که در فانکشن io ما با مسیر /chat و room/:roomId
ارتباط خود را ایجاد میکنیم و نیاز نیست در تمامی امیت ها و ایونت ها این ۲ بخش در آدرس و اسم ایونت تکرار شوند.
در صورتی که در داکیومنت نوشته شده باشد:
{{base_url}}/chat/:room-id/message-get

ابتدا یک کانکشن ایجاد میکنیم:

```javascript

const client = new io(`${params.baseUrl}/room/:roomId`, {
    path: '/chat',
    auth: {
        'X-SESS-ID': 'myToken',
        userId: 'user_id'
    }
});

```

و سپس امیت میکنیم:

```javascript

client.emit('/message-get', {page: 1}, (data) => {
     //data comes here
});

```


در پروتکل socket.io امیت ها میتوانند یک کالبک داشته باشند که در صورتی که در پاسخ به امیت از سمت سرور اطلاعاتی به کاربر ارسال شود در کال بک مقدار دهی میشود, لازم به ذکر است که
کال بک در اینگونه ارتباط به مانند پکت ریسپانس های ACK در ساختار TCP میباشد و به نحوی جهت تایید دریافت اطلاعات استفاده میگردند، اما نه الزاما.
در پیاده ی سوکت چت تمامی متد ها امیت ها دارای کال بک نیستند و تنها آنهایی که در داکیومنت ذکر شده است دارای اطلاعات کال بک میباشند.
ساختار کال بک در ابتدای همین صفحه توضیح داده شده است.



#### Emits


* [message-send](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#68038a7f-d374-4010-9712-2c0e9dd8d136)
* [message-get](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#cc057e98-6003-46c4-8c79-bd2b5534803f)
* [message-pin](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#b42f4a3b-3229-41be-a249-9b0c2f44623a)
* [message-unpin](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#b4016d29-8858-49bd-88e4-ad5695cfb902)
* [message-verify](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#d3b3d50e-1873-4f1e-8e63-53524409d74b)
* [message-reply](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#fda64ad4-ec3e-4297-9f89-1afb2efad30c)
* [message-delete](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#747cd742-1b1c-409d-a6d3-a44a8f465ad8)
* [test-create](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#96430b46-9e51-4ce9-b19a-e3da1db16b1a)
* [test-start](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#c894ae1c-41bb-4db0-bf9a-5d0c1822e2b6)
* [test-end](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#fbe51088-fad6-49d8-b634-a207edc6cfe6)
* [test-answer](https://documenter.getpostman.com/view/24148128/2s8ZDSdRaj#2134e342-22b2-446e-92af-e7daa0cd3e43)


#### Events

* message

نمونه دیتای دریافتی
```javascript

    {
      id: 'd62f5f25-7df6-40cf-a3e1-e30a03441439',
      message: 'quis dolor nihil ea delectus cum optio nam voluptas dicta qui beatae error in facere autem consequatur aliquid repudiandae possimus',
      type: 1,
      date: 1673797069762,
      status: 1,
      pinned: false,
      sender: { id: 'admin-id' }
    }


```


* message_to_verify

نمونه دیتای دریافتی
```javascript
{
      id: '66799cc8-d77a-4a03-ac09-8e990d7cc662',
      message: 'placeat reprehenderit laborum ab at quis modi quia eligendi aperiam rem sequi mollitia nisi unde rerum voluptates veniam impedit ipsam',
      type: 1,
      date: 1673797153175,
      status: 0,
      pinned: false,
      sender: { id: 'user-id', nickname: 'Mr' }
    }
```

* message-to-delete

نمونه دیتای دریافتی
```javascript
  { message_id: '496f647b-b947-4ed0-8e8c-2fe711a0755e' }
```

* message-to-pin

نمونه دیتای دریافتی
```javascript
{ message_id: '63367715-c1f7-400d-8db3-48b085879138' }
```

* message-to-unpin

نمونه دیتای دریافتی
```javascript
{ message_id: '63367715-c1f7-400d-8db3-48b085879138' }
```

* test

نمونه دیتای دریافتی
```javascript
{
      id: '3490d861-4c61-44b6-ba92-288a035cee2b',
      type: 2,
      date: 1673797383227,
      status: 0,
      pinned: false,
      sender: { id: 'admin-id', nickname: 'Mr' },
      test_options: [ 'options 1', 'option 2' ]
    }
```

* test-start

نمونه دیتای دریافتی
```javascript
{
      id: 'a612b084-1113-49aa-b7df-a278059557dd',
      type: 2,
      date: 1673797452754,
      status: 1,
      pinned: false,
      sender: { id: 'admin-id' },
      test_options: [ 'options 1', 'option 2' ]
    }
```

* test-end

نمونه دیتای دریافتی
```javascript
{ message_id: 'eb6fb249-e082-47d5-9173-99d4aad6d6bf' }
```


### پارامتر ها و مقادیر

ابجکت message دقیقا همان ساختاری است که بعنوان یک پیام شناخته میشود و هر پیام دارای پارامتر های آن است.

وضعیت های یک message

```json
{
    VERIFIED: 1,
    NOT_VERIFIED: 0,
    DELETED: 2,
    TEST_END: 3
}
```

نوع های یک message

```json

{
    MESSAGE: 1,
    TEST: 2
}

```

ساختار یک ابجکت message

```json
{

    id: String(255),
    message: String(20480Byte),
    sender: String(255) - user_id,
    type: Int(11),
    reply_to: String(255) - message_id,
    date: UnixTimestamp,
    status: Int(11),
    pinned: Boolean,
    test_options: Array
}

```



