#!/bin/bash


cd "/home/duck/Pulpit/programowanie_szukanie_mieszkania (1. kopia)"

if git diff-index --quiet HEAD --; then
    echo "Brak zmian do wypchnięcia"
else
    echo "Zmiany znalezione, wykonuję push"
    git add .
    git commit -m "Automatyczne aktualizowanie repozytorium"
    git push origin main
fi

