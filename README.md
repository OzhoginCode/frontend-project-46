### Hexlet tests and linter status:
[![Actions Status](https://github.com/OzhoginCode/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/OzhoginCode/frontend-project-46/actions)
[![.github/workflows/lint-and-test.yml](https://github.com/OzhoginCode/frontend-project-46/actions/workflows/lint-and-test.yml/badge.svg)](https://github.com/OzhoginCode/frontend-project-46/actions/workflows/lint-and-test.yml)
### CodeClimate:
[![Maintainability](https://api.codeclimate.com/v1/badges/7ffb352f86caf81d4290/maintainability)](https://codeclimate.com/github/OzhoginCode/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7ffb352f86caf81d4290/test_coverage)](https://codeclimate.com/github/OzhoginCode/frontend-project-46/test_coverage)


# gendiff - утилита для сравнения JSON и YAML файлов
gendiff - это удобная консольная утилита, которая позволяет сравнивать JSON и/или YAML файлы. Она поддерживает как плоские, так и вложенные структуры данных. Вы можете легко узнать, в чем отличия между двумя файлами, а также получить результаты в трех разных форматах: Stylish (стандартный стиль), Plain (плоский текст) и JSON.

Кроме того, gendiff может быть использована в качестве JavaScript библиотеки для сравнения объектов прямо в вашем коде. Это удобное решение для разработчиков, которые хотят внедрить функционал сравнения JSON/YAML прямо в свои проекты.

## Установка

Чтобы начать использовать утилиту gendiff, убедитесь, что на вашем компьютере установлен Node.js версии не ниже 18, а затем выполните следующие шаги:

Склонируйте репозиторий с GitHub:
`git clone https://github.com/OzhoginCode/frontend-project-46`
Установите зависимости, выполнив следующую команду в корневой директории проекта:
`make install`


## Синтаксис
`gendiff [options] <filepath1> <filepath2>`

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command

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