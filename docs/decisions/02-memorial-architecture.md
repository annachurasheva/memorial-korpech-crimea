# ADR-02: Архитектура Второго Слоя (Мемориал)

- **Статус:** Утверждено
- **Дата:** 2026-09-15
- **Автор:** Anna-Ch (владелец), Дельта (архитектор)

## Контекст

Проект Memorial Korpech Crimea — это не "база данных павших", а **акт восстановления исторической справедливости** и инструмент для **переиздания братского войскового захоронения** на Крымском перешейке (Корпечь).

### Миссия

- 226 000 павших за 5 месяцев на Крымском перешейке
- 3 100 в Корпечь (сейчас "неизвестные", но по документам — известны)
- Ориентир: Ржевский мемориал (65 000 имен, открытие с Президентом)
- Каждый павший — **Герой по умолчанию** (не сбежал, отдал жизнь за Родину-Мать)
- **Братское войсковое** ≠ массовое (братья за одну Мать)

### Целевая аудитория

- Родственники 60+ (получили интернет через внуков 12+, ОК/ВК)
- Патриотические кружки, школьные музеи ВОВ (юниоры-волонтёры)
- Сельские библиотеки (поселковые доски памяти "Они погибли чтобы мы жили")
- Соотечественники, проживающие за рубежом — участники памятных инициатив

### Технологические ограничения

- Giscus для комментариев — применим (тестирован, GitHub через Google-почту)
- EdgeONE для деплоя — карточки видны во всех локациях
- Дзен-RSS для транзита в ОК (500 карточек за раз, без API ОК)
- Временная вилка: 01.12.1941–19.05.1942 (граница на уровне сканирования, не фильтр UI)

## Решение

### Архитектура коллекций

**Первый Слой (смысл, статьи, законы):**

- Нативные роуты Retypeset: `/`, `/about`, `/posts/[slug]`
- Коллекция `posts` в `src/content/posts/`
- RSS для Дзена: `/atom.xml`

**Второй Слой (мемориал):**

- Отдельная коллекция `fallen` в `src/content/fallen/`
- Точка входа: `/memorial` (через футер)
- RSS для Дзена: `/memorial/rss.xml` (транзит в ОК → сельские библиотеки)

**Справочник мемориалов:**

- Коллекция `memorials` в `src/content/memorials/`
- Путь: `/memorials/`
- Три поля вносит Anna-Ch вручную

### Структура карточки (frontmatter)

```yaml
id: '551267195' # document_id из ЦАМО (вечный)
slug: petrov-v-v-551267195 # транслитерация ФИО + document_id (для URL)
# Канонический URL: /memorial/card/petrov-v-v-551267195/
# Правило: ФИО может уточняться, но slug никогда не меняется (иначе сломаются внешние ссылки)
status: processed # inbox | processed | rejected
admin_word: '' # зарезервированное первое слово Anna-Ch

description: 'Герой {Фамилия} {И.О.}. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно.'

person:
  last_name: Петров
  first_name: Василий
  middle_name: Васильевич
  birth_year: 1921
  birth_location: Сталинская обл.
  death_date: 1942-03-19
  cause: убит # факт документа, не для фильтра

service:
  rank_raw: политрук
  rank_norm: Политрук
  unit_raw: скф 398 сд 826 сп
  unit_norm: СКФ 398 сд 826 сп
  unit_id: unit-398-sd-826-sp

burial:
  primary_norm: крымская-асср-ленинский-р-н-с-корпечь
  current_norm: мемориал-корпечь
  current_status: уточняется # пусто в CSV → статус + задача в clarify.queue

relatives: # данные похоронки (поиск ручной, юниоры)
  - name: Петрова Мария Ивановна
    address: 'Сталинская обл., г. Краматорск'
    relationship: null

identification:
  status: named # named | unnamed
  source: ЦАМО

memorialization:
  status: pending # pending | in-progress | completed | not-applicable
  type: null # korpech-grave | korpech-plate | other-memorial | kerch-tribute

  # Детали по типу:
  # type: korpech-grave (600+ чётко захоронены в Корпечь)
  #   location: "Мемориал Корпечь, сектор А, ряд 3"
  #   plate_number: "A-3-15"

  # type: korpech-plate (59 чётко присутствуют на существующих плитах)
  #   plate_number: "Стела №2, строка 15"
  #   verified: true

  # type: other-memorial (перезахоронены в другом месте)
  #   memorial_name: "Мемориал Ак-Монай"
  #   memorial_id: null (связь со справочником /memorials/)

  # type: kerch-tribute (плиты "Они воевали за Керчь" — не на могилах)
  #   tribute_location: "Мемориал Керчь, аллея героев"
  #   plate_number: "Стела памяти, сектор 5"

  engraved: false # гравировка выполнена (да/нет/в процессе)
  engraved_date: null
  notes: '' # примечания (например, "ожидает переиздания мемориала")

awards: [] # появляется только если что-то внесено

photo: # не отрывается от карточки
  - /photos/KRP-0001/photo1.jpg

sources: # только указатель для зрителя
  - org: ОБД Мемориал
    url: https://obd-memorial.ru/html/info.htm?id=551267195

supplements: [] # поисковые отряды, родня за рубежом
```

### Структура карточки-new (frontmatter)

---
id: "551267195"
slug: "badalov-g-i-551267195"
status: processed
admin_word: ""

description: "Герой Бадалов Г.И. Мемориал павших — восстановим справедливость, высечем его ИМЯ на камне на вечно."

person:
  last_name: Бадалов
  first_name: Григорий
  middle_name: Иванович
  birth_year: null
  birth_location: "Азербайджанская ССР, г. Кадабек"
  death_date: "1942-03-19"
  cause: убит

service:
  rank_raw: политрук
  rank_norm: Политрук
  unit_raw: скф 398 сд 826 сп
  unit_norm: СКФ 398 сд 826 сп
  unit_id: unit-398-sd-826-sp

burial:
  primary_norm: крымская-асср-ленинский-р-н-с-корпечь
  current_norm: мемориал-корпечь
  current_status: "уточняется"

relatives: []

identification:
  status: named
  source: ЦАМО

memorialization:
  status: pending
  type: korpech-grave
  location: "Мемориал Корпечь, сектор Б, ряд 2"
  plate_number: "Б-2-47"
  engraved: false
  engraved_date: null
  notes: "Ожидает переиздания мемориала"

awards: []

photo:
  - "/photos/551267195/photo1.jpg"

sources:
  - org: ОБД Мемориал
    url: https://obd-memorial.ru/html/info.htm?id=551267195

supplements: []
---
