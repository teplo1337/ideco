# ideco http://ideco.kekcheburek.ru/
### react 
routing: '/', '/adm/'


### node '/api/'
RESTful API: 
```
 create => POST:   /api/
 read   => GET:    /api/?city=Moscow&status=0
 update => PUT:    /api/
 delete => DELETE: /api/:id
```
### mongoDB
 document:
 ```
{
    "_id": {
        "$oid": "5aa0125c302c7505e9cd0f01"
    },
    "name": "SU-0088",
    "takeoff": {
        "time": "2018-03-12T10:21",
        "fact_time": "2018-03-12T10:22",
        "city": "Yekaterinburg",
        "airport": "KOLCOVO - 1"
    },
    "landing": {
        "time": "2018-03-12T22:21",
        "fact_time": "2018-03-12T22:22",
        "city": "Lima",
        "airport": "Peru-2"
    },
    "status": "4",
    "type": "SJ100"
}
 ```
### test task:
```
Спроектировать API для табло рейсов в аэропорту

У рейса есть номер, город вылета/прилета, тип самолета, время, фактическое время,
статус (вылетел, приземлился, идет посадка, задержан до и т.п.).
Возможность получать, добавлять, редактировать, удалять рейсы.
Возможность сделать выборку по городу, статусу.

Сделать простой веб-интерфейс для доступа к API из пункта 1

Single Page Application
Должно быть табло прилета, вылета и интерфейс администратора для управления (никакой авторизации не нужно).
Должен быть счетчик рейсов
Должна быть фильтрация по городу
Желательно с использованием технологий указанных в ваканси
Интерфейс должен быть готов к тому чтобы вывесить его на внешнем домене (т.е. полностью готов)

Оформить все в git-репозитории (включая документацию по API)
```
