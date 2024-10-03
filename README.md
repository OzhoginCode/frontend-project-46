### Hexlet tests and linter status:
[![Actions Status](https://github.com/OzhoginCode/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/OzhoginCode/frontend-project-46/actions)
[![.github/workflows/lint-and-test.yml](https://github.com/OzhoginCode/frontend-project-46/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/OzhoginCode/frontend-project-46/actions/workflows/lint-and-test.yml)
### CodeClimate:
[![Maintainability](https://api.codeclimate.com/v1/badges/7ffb352f86caf81d4290/maintainability)](https://codeclimate.com/github/OzhoginCode/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7ffb352f86caf81d4290/test_coverage)](https://codeclimate.com/github/OzhoginCode/frontend-project-46/test_coverage)


# gendiff - утилита для сравнения JSON и YAML файлов
gendiff - это консольная утилита, с помощью которой можно сравнивать JSON и/или YAML файлы. Она поддерживает как плоские, так и вложенные структуры данных. Получить результат сравнения можно в трёх разных форматах: Stylish (стандартный стиль), Plain (плоский текст) и JSON.

Также gendiff можно использовать как библиотеку.

## Установка

Требования: Node.JS 18 и выше, Make

1. Склонируйте репозиторий с GitHub и перейдите в директорию проекта:
```bash
git clone https://github.com/OzhoginCode/frontend-project-46
cd frontend-project-46
```
2. Установите зависимости: 

```bash
make install
```

## Использование
`gendiff -f <формат вывода (по дефолту "stylish")> <filepath1> <filepath2>`

## Примеры использования

Сравнение json файлов:
https://asciinema.org/a/50U3BDpT3uRwyBM4ekh9Orez6

Сравнение yaml файлов:
https://asciinema.org/a/xazHIPBUXd1S7MRRjnkxj9W1G

Сравнение вложенных структур:
https://asciinema.org/a/sLQTOZE6nJaCh6Z7we8eOb4Ub

Формат вывода plain:
https://asciinema.org/a/Kr8RsJthNljZjh7d7MBjYcUel

Формат вывода json:
https://asciinema.org/a/x8zv0sucEClzRsWGzrBGz60HH
